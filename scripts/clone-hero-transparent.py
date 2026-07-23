from PIL import Image
import numpy as np
from rembg import remove

src = r"c:\Users\Admin\Desktop\Business_AI_Persona\public\ai-workforce-hero.png"
out = r"c:\Users\Admin\Desktop\Business_AI_Persona\public\ai-workforce-hero-transparent.png"

img = Image.open(src).convert("RGBA")

cut = remove(
    img,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=10,
    alpha_matting_erode_size=6,
).convert("RGBA")

arr = np.array(cut)
rgb = arr[:, :, :3].astype(np.float32)
alpha = arr[:, :, 3].astype(np.float32)
luma = 0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]
chroma = rgb.max(axis=2) - rgb.min(axis=2)

# Remove leftover near-white paper fringe (keep soft blue glows)
fringe = (alpha > 0) & (alpha < 220) & (luma > 238) & (chroma < 12)
paper = (alpha > 180) & (luma > 248) & (chroma < 8)
alpha[fringe] = 0
alpha[paper] = 0
arr[:, :, 3] = alpha

# Crop to content
result = Image.fromarray(arr.astype(np.uint8), "RGBA")
bbox = result.getbbox()
if bbox:
    pad = 12
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(result.width, x1 + pad)
    y1 = min(result.height, y1 + pad)
    result = result.crop((x0, y0, x1, y1))

result.save(out, "PNG")
a = np.array(result)[:, :, 3]
print(
    "saved",
    out,
    result.size,
    "transparent%",
    round(float((a < 8).mean() * 100), 1),
)
