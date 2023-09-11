# scary_dungeon_js

## Developing

You need two process to develop locally. The first process needs to serve files. 

```bash
python3 -m http.server
```

The second process needs to transpile typescript to javascript and bundle the results.

```bash
bun run watch
```

I'm a bit lazy and just use two terminals. Lastly, I recommend using `./push.sh` for commits because it forces `bun run prod` before making a push.

## General todo:
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
- Support for button and mouse input
- Better walls based on nearby tiles

## Known Bugs
- If you kill an enemy when they are on top of a scroll, the rendering is bugged.
- UI dies on resize until there is an update
- Input fails if the user has caps-lock on
