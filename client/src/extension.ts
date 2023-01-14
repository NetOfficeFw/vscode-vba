// Licensed under the MIT License. See LICENSE in the project root for license information.

import * as path from 'path';
import { workspace, ExtensionContext, languages } from 'vscode';

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node';

import { VbaHoverProvider } from './hover';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  // The server is implemented in node
  const serverModule = context.asAbsolutePath(
    path.join('server', 'out', 'server.js')
  );

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
    }
  };

  const vbaLang = { scheme: 'file', language: 'vba' };
  // register server for Visual Basic for Application language
  const clientOptions: LanguageClientOptions = {
    documentSelector: [ vbaLang ],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
    }
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    'vba-lsp',
    'VBA language server',
    serverOptions,
    clientOptions
  );

  context.subscriptions.push(
    languages.registerHoverProvider(vbaLang, new VbaHoverProvider())
  )

  // start the clientand launch the server
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
