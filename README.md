# scary_dungeon_js

## General todo:
- gargoyle above altar and changes color when the fountain is filled.
- A door is in the level
    - Update clingo
    - Update game to render the door
    - Remove fountain functionality
    - Add functionality to the door to change sprite and allow the player to step through
- Treasure chests interact on bump
- Door unlocks when the fountain is filled
- More scroll types:
    - Distraction
    - AOE fire ball
- Scrolls need selection built in
- Better inventory UI
- Scrolls aren't added via &, but as a third part of the map generation process which adds scrolls to leaves, this way you get a reward for going to the edge
- Fill in room right before the player gets to it

## Known Bugs
- If you kill an enemy when they are on top of a scroll, the rendering is bugged.
- UI dies on resize until there is an update
