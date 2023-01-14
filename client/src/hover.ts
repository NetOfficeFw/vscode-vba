import { CancellationToken, Hover, HoverProvider, MarkdownString, Position, ProviderResult, TextDocument } from 'vscode';

export class VbaHoverProvider implements HoverProvider {
  public provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
    
    const range = document.getWordRangeAtPosition(position);
    const word = document.getText(range);

    if (word === "MsgBox") {

        const info = new MarkdownString("Displays a message in a dialog box, waits for the user to click a button, and returns an Integer indicating which button the user clicked.", true);
        info.appendCodeblock("MsgBox (prompt, [ buttons, ] [ title, ] [ helpfile, context ])");

        return new Hover(info);
    }
  }
}