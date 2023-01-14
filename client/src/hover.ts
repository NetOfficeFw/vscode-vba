import { CancellationToken, Hover, HoverProvider, MarkdownString, Position, ProviderResult, TextDocument } from 'vscode';

const data: Map<string, string> = new Map();


export class VbaHoverProvider implements HoverProvider {
  constructor() {
    data.set('msgbox', 'Displays a message in a dialog box, waits for the user to click a button, and returns an Integer indicating which button the user clicked.');
    data.set('array', 'Returns a Variant containing an array.');
    data.set('isnull', 'Returns a Boolean value that indicates whether an expression contains no valid data (Null).');
  }

  public provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
    
    const range = document.getWordRangeAtPosition(position);
    const word = document.getText(range).toLowerCase();

    if (data.has(word)) {
      const message = data.get(word);
      const info = new MarkdownString(message);
      info.appendCodeblock("MsgBox (prompt, [ buttons, ] [ title, ] [ helpfile, context ])", "vba");

      return new Hover(info);
    }
  }
}