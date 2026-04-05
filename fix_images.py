import json
import re
from difflib import SequenceMatcher

def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()

# Load data.js
with open('data.js', 'r', encoding='utf-8') as f:
    data_text = f.read()
    match = re.search(r'const buildingData = (\[[\s\S]*?\]);', data_text)
    buildings = json.loads(match.group(1))

# Load script.js
with open('script.js', 'r', encoding='utf-8') as f:
    script_text = f.read()

# Extract old rankImageMap
map_match = re.search(r'const rankImageMap = (\{[\s\S]*?\});', script_text)
old_map = {}
if map_match:
    lines = map_match.group(1).split('\n')
    for line in lines:
        if ':' in line:
            parts = line.split(':')
            key = parts[0].strip()
            # To handle urls or paths with colons properly (unlikely in paths but just in case)
            val = ':'.join(parts[1:]).strip().strip(",").strip("'").strip('"')
            if key.isdigit():
                old_map[int(key)] = val

new_rank_image_map = {}
used_ranks = set()

# Process each old image path
img_to_bld = []
for old_rank, img_path in old_map.items():
    filename = img_path.split('/')[-1].split('.')[0]
    filename_clean = filename.replace('_', ' ').lower()
    
    best_match = None
    best_score = -1
    for b in buildings:
        b_name_clean = b['name'].lower()
        score = similar(filename_clean, b_name_clean)
        if b['city'].lower() in filename_clean:
            score += 0.2
            
        if score > best_score:
            best_score = score
            best_match = b['rank']
            
    if best_match and best_score > 0.4:
        img_to_bld.append((best_score, best_match, img_path))

# Sort by best fit first to prevent overwriting with worse matches
img_to_bld.sort(reverse=True, key=lambda x: x[0])

for score, b_rank, img_path in img_to_bld:
    if b_rank not in used_ranks:
        new_rank_image_map[b_rank] = img_path
        used_ranks.add(b_rank)

# Generate fallback paths for the rest
for b in buildings:
    if b['rank'] not in used_ranks:
        clean_name = b['name'].lower().replace(' ', '_').replace('.', '').replace('(', '').replace(')', '').replace("'", '')
        new_rank_image_map[b['rank']] = f"assets/{clean_name}.png"

# Reconstruct script.js
new_map_str = "const rankImageMap = {\n"
for i in range(1, 201):
    if i in new_rank_image_map:
        new_map_str += f"        {i}: '{new_rank_image_map[i]}',\n"
new_map_str += "    };"

new_script_text = script_text[:map_match.start()] + new_map_str + script_text[map_match.end():]

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(new_script_text)

print("success")
