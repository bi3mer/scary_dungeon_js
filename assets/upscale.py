from PIL import Image

original_file_name = 'tilemap-kenney_tiny-dungeon_16_16.png'
new_file_name = 'tilemap-kenney_tiny-dungeon_32_32.png'

with Image.open(original_file_name) as old:
    old = old.convert('RGBA')
    W = old.width
    H = old.height

    new = old.copy().resize((2*W, 2*H))

    for y in range(H):
        for x in range(W):
            pixel = old.getpixel((x,y))

            new.putpixel((x*2,y*2), pixel)
            new.putpixel((x*2,y*2+1), pixel)
            new.putpixel((x*2,y*2), pixel)
            new.putpixel((x*2+1,y*2), pixel)
            new.putpixel((x*2+1,y*2+1), pixel)

    new.save(new_file_name)