"""Remove checkerboard (false-transparency) backgrounds from AI employee PNGs."""
from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(r"c:\Users\Admin\Desktop\Business_AI_Persona\public\ai-employees")


def is_checker_like(rgb: np.ndarray) -> bool:
    """Light gray / white with very low chroma — typical checkerboard tiles."""
    r, g, b = int(rgb[0]), int(rgb[1]), int(rgb[2])
    if abs(r - g) > 18 or abs(g - b) > 18 or abs(r - b) > 18:
        return False
    # keep mid/dark grays (hair, shadows) — only light tiles
    return min(r, g, b) >= 155 and max(r, g, b) <= 255


def remove_checkerboard(img: Image.Image) -> Image.Image:
    arr = np.array(img.convert("RGBA"))
    h, w = arr.shape[:2]
    visited = np.zeros((h, w), dtype=bool)
    mask = np.zeros((h, w), dtype=bool)

    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        q.append((0, x))
        q.append((h - 1, x))
    for y in range(h):
        q.append((y, 0))
        q.append((y, w - 1))

    while q:
        y, x = q.popleft()
        if visited[y, x]:
            continue
        visited[y, x] = True
        rgb = arr[y, x, :3]
        if not is_checker_like(rgb):
            continue
        mask[y, x] = True
        for dy, dx in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                q.append((ny, nx))

    # also clear any disconnected light checker islands near edges (2nd pass color key on borders band)
    band = max(8, min(h, w) // 40)
    for y in range(h):
        for x in range(w):
            if mask[y, x]:
                continue
            if y > band and y < h - band and x > band and x < w - band:
                continue
            if is_checker_like(arr[y, x, :3]):
                # only if connected-ish to already masked neighbor
                for dy, dx in ((0, 1), (0, -1), (1, 0), (-1, 0)):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx]:
                        mask[y, x] = True
                        break

    arr[mask, 3] = 0
    return Image.fromarray(arr)


def main() -> None:
    files = sorted(ROOT.glob("*.png"))
    if not files:
        print("No PNGs found")
        return
    for path in files:
        img = Image.open(path)
        cleaned = remove_checkerboard(img)
        cleaned.save(path, optimize=True)
        print(f"cleaned {path.name}")


if __name__ == "__main__":
    main()
