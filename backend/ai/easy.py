
def zombie_move(player_x, player_y, zombie_x, zombie_y):
    zombie_x += (player_x - zombie_x) * 0.02
    zombie_y += (player_y - zombie_y) * 0.02
    return zombie_x, zombie_y


