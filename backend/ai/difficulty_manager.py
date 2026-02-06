from easy import zombie_move as easy_move
from medium import zombie_move as medium_move
from hard import zombie_move as hard_move

def get_move(level, px, py, zx, zy):
    if level == "easy":
        return easy_move(px, py, zx, zy)
    elif level == "medium":
        return medium_move(px, py, zx, zy)
    else:
        return hard_move(px, py, zx, zy)

