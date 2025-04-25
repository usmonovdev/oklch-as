import * as vscode from 'vscode';
import { DocumentColorProvider } from './color';
import { DocumentLinkProvider } from './link';

function getLanguages(): string[] {
	const languages = vscode.workspace.getConfiguration("oklch-as").get("languages");
	if (Array.isArray(languages)) {
		return languages;
	} else {
		vscode.window.showErrorMessage("oklch-as: languages should be an array");
	}
	return ['css', 'scss', "less", "tailwindcss", "postcss"];
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const languages = getLanguages();
	const colorprovider = new DocumentColorProvider();
	const linkprovider = new DocumentLinkProvider();

	languages.forEach(language => {
		context.subscriptions.push(vscode.languages.registerColorProvider({
			language: language
		}, colorprovider));

		context.subscriptions.push(vscode.languages.registerDocumentLinkProvider({
			language: language
		}, linkprovider));
	});
}

// This method is called when your extension is deactivated
export function deactivate() { }