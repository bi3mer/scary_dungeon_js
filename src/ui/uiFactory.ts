import colors from "../utility/colors";
import { Button } from "./button";
import { Menu } from "./menu";
import { Text } from "./text";

export function helpMenu(width: number, height: number) : Menu {
  const x = width/4;
  const y = height/4;
  let m = new Menu(x, y, width/2, height/2, "Help", true, "#fff", true);

  m.addButton(new Button(
    width/2-4, 
    height - height/4 - 4, 
    8, 
    3, 
    "Ok", 
    colors.lightGray, 
    colors.white, 
    colors.lightGray, 
    colors.white,
    () => {
      m.shouldExit = true;
    }
  ));

  m.addText(new Text(x+3, y+3, "WASD or arrow keys to move.", colors.white, colors.black));
  m.addText(new Text(x+3, y+4, "I to inspect.", colors.white, colors.black));

  return m;
}