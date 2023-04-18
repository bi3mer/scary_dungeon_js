import { Color } from "rot-js/lib/color";

class Message {
  private text: string
  private fg: Color
  private bg: Color
  private count: number

  constructor(text: string, fg: Color, bg: Color) {
    this.text = text;
    this.fg = fg;
    this.bg = bg;
    this.count = 1;
  }

  incrementCount() {
    this.count += 1;
  }

  sameText(text: string): boolean {
    return this.text === text;
  }

  getText(): string {
    if (this.count > 1) {
      return `${this.text} x(${this.count})`;
    }

    return this.text;
  }
}

export class MessageLog {
  private static messages: Message[] = [];

  static addMessage(text: string, fg: Color, bg: Color, stack: boolean) {
    const len = MessageLog.messages.length;
    
    if (stack && len > 0 && MessageLog.messages[len - 1].sameText(text)) {
      MessageLog.messages[len-1].incrementCount();
    } else {
      MessageLog.messages.push(new Message(text, fg, bg));
    }
  }

  static addErrorMessage(text: string, stack: boolean) {
    MessageLog.addMessage(text, [255, 40, 40], [0,0,0], stack);
  }
}