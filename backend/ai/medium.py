def zombie_move(px, py, zx, zy):
    zx += (px - zx) * 0.04
    zy += (py - zy) * 0.04
    return zx, zy

