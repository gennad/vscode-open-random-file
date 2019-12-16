// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

async function openRandomFile() {
    const files = await vscode.workspace.findFiles('**/*');

    const filterFile = (element: vscode.Uri) => {
        // return !element.path.startsWith('node_modules');
        return !element.path.includes('node_modules');
    };

    const passedFiles = files.filter(filterFile);

    if (passedFiles.length > 0) {
        const randomFile =
            passedFiles[Math.floor(Math.random() * passedFiles.length)];
        const document = await vscode.workspace.openTextDocument(randomFile);
        await vscode.window.showTextDocument(document);
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(
        'Congratulations, your extension "open-random-file" is now active!'
    );

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        'extension.openRandomFile',
        () => {
            // The code you place here will be executed every time your command is executed
            openRandomFile();

            // Display a message box to the user
            // vscode.window.showInformationMessage('Hello World!');
        }
    );

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
