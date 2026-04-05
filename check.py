import re, os
import json

with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()
    m = re.search(r'const buildingData = (\[[\s\S]*?\]);', text)
    buildings = json.loads(m.group(1))
    
    b_dict = {b['rank']: (b['name_zh'], b['name']) for b in buildings}

with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()
    m = re.search(r'const rankImageMap = (\{[\s\S]*?\});', text)
    lines = m.group(1).split('\n')
    missing = []
    
    for l in lines:
        if ':' in l:
            parts = l.split(':')
            rank = int(parts[0].strip())
            path = ':'.join(parts[1:]).strip().strip("',\"")
            
            if rank <= 150:
                if not os.path.exists(path):
                    zh_name, en_name = b_dict.get(rank, ("Unknown", "Unknown"))
                    missing.append((rank, zh_name, en_name, path))

for m in missing:
    print(f"Rank {m[0]}: {m[1]} ({m[2]}) -> {m[3]}")
