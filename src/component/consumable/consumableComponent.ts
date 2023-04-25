import { BaseComponent } from "../baseComponent";

export abstract class ConsumableComponent implements BaseComponent {
  abstract function getAction();
}