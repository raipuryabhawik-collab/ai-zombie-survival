from PIL import Image, ImageDraw

# PLAYER
img = Image.new("RGBA", (64,64), (0,0,0,0))
d = ImageDraw.Draw(img)
d.ellipse((10,10,54,54), fill=(0,255,150))
img.save("player.png")

# ZOMBIE
img = Image.new("RGBA", (64,64), (0,0,0,0))
d = ImageDraw.Draw(img)
d.rectangle((12,12,52,52), fill=(255,50,50))
img.save("zombie.png")

# BULLET
img = Image.new("RGBA", (16,16), (0,0,0,0))
d = ImageDraw.Draw(img)
d.ellipse((4,4,12,12), fill=(255,255,0))
img.save("bullet.png")

# BACKGROUND
img = Image.new("RGB", (900,500), (10,10,10))
d = ImageDraw.Draw(img)
for i in range(0,900,40):
    d.line((i,0,i,500), fill=(20,20,20))
for i in range(0,500,40):
    d.line((0,i,900,i), fill=(20,20,20))
img.save("background.jpg")
