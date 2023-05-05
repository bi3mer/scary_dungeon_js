import { Action } from "../../action/action";
import { BaseComponent } from "../baseComponent";

export abstract class ConsumableComponent extends BaseComponent {
  abstract getAction(): Action;
  abstract activate(): void;
  
  consume(): void {
  }
}