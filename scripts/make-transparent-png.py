"""Make flat white paper transparent. Keep robot, cards, glows, text."""
from PIL import Image
import numpy as np
from rembg import remove

src = r"c:\Users\Admin\Desktop\Business_AI_Persona\public\cards-premium.png"
out = r"c:\Users\Admin\Desktop\Business_AI_Persona\public\cards-premium-transparent.png"

img = Image.open(src).convert("RGBA")

# AI cutout — removes paper white, keeps subject (robot + cards + glow + caption)
cut = remove(
    img,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=10,
    alpha_matting_erode_size=8,
).convert("RGBA")

cut.save(out, "PNG")
arr = np.array(cut)
alpha = arr[:, :, 3]
print(
    "saved",
    out,
    cut.size,
    "transparent%",
    round(float((alpha < 8).mean() * 100), 1),
    "opaque%",
    round(float((alpha > 240).mean() * 100), 1),
)
