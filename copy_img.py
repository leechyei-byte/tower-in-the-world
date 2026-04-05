import glob
import os
import shutil

brain_dir = r"C:\Users\user\.gemini\antigravity\brain\77f54190-e222-4f3a-af93-95eee2e023c4"
assets_dir = r"c:\Projects\Tower in the world\assets"

files = [
    "first_canadian_place",
    "honglong_century_plaza",
    "shanghai_wheelock_square",
    "four_world_trade_center",
    "eureka_tower",
    "comcast_center",
    "emirates_crown",
    "yokohama_landmark_tower"
]

for base in files:
    matches = glob.glob(os.path.join(brain_dir, f"{base}_*.png"))
    if matches:
        src = max(matches, key=os.path.getmtime) # get latest if multiple
        dest = os.path.join(assets_dir, f"{base}.png")
        shutil.copy2(src, dest)
        print(f"Copied {base}")
    else:
        print(f"Missing {base}")
