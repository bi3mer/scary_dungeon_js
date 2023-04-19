import colors from "./colors";

class Message {
  private text: string
  private color: string
  private count: number

  constructor(text: string, color: string) {
    this.text = text;
    this.color = color;
    this.count = 1;
  }

  incrementCount() {
    this.count += 1;
  }

  sameText(text: string): boolean {
    return this.text === text;
  }

  getText(): string {
    let t: string = this.count > 1 ? `${this.text} x(${this.count})` : this.text;
    return `<tag style="color: ${this.color};">${t}</tag>`;
  }
}

export class MessageLog {
  private static messages: Message[] = [];

  static addMessage(text: string, color: string, stack: boolean): void {
    const len = MessageLog.messages.length;
    
    if (stack && len > 0 && MessageLog.messages[len - 1].sameText(text)) {
      MessageLog.messages[len-1].incrementCount();
    } else {
      MessageLog.messages.push(new Message(text, color));
    }

    MessageLog.print();
  }

  static addErrorMessage(text: string, stack: boolean): void {
    MessageLog.addMessage(text, colors.error, stack);
  }

  private static print(): void {
    const maxLines = 5;
    const len = MessageLog.messages.length;

    let messages = document.querySelector("#messages")!;
    let lines: string[] = [];

    for(var i = 0; i < len; ++i) {
      const message = MessageLog.messages[len - 1 - i];
      lines.push(message.getText());

      if (lines.length > maxLines) {
        break;
      }
    }

    messages.innerHTML = lines.join("\n");
  }
}