def zombie_move(px, py, zx, zy):
    zx += (px - zx) * 0.08
    zy += (py - zy) * 0.08
    return zx, zy

