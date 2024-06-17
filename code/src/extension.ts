// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import 'reflect-metadata';
import { FileExplorer } from './core/usecase/fileExplorer';
import { AnalysisCommand } from './adapt/model/command/AnalysisCommand';
import Container from 'typedi';
import { DoAnalysis } from './core/usecase/DoAnalysis';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const fileExplorer = new FileExplorer(context);
	fileExplorer.createTreeView();

	context.subscriptions.push(vscode.commands.registerCommand('fileExplorer.openFile', (resource) => {
		fileExplorer.openResource(resource);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('fileExplorer.openFloder', (resource) => {
		fileExplorer.openFloder(resource.uri);
	}));

	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration('conf.replace.workSpacePath')) {
			fileExplorer.createTreeView();
		}
	}));
	// 添加文件
	// 打开文件选择框
	vscode.commands.registerCommand('config.addFile', (value) => {
		vscode.window.showInputBox(
			{ // 这个对象中所有参数都是可选参数
				password: false, // 输入内容是否是密码
				ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
				placeHolder: '', // 在输入框内的提示信息
				prompt: '', // 在输入框下方的提示信息
				validateInput: function (text) { return text; } // 对输入内容进行验证并返回
			}).then((filePath) => {
				// fs.open()
			});
	});

	// 打开文件选择框
	vscode.commands.registerCommand('config.setWorkSpacePath', (value) => {
		vscode.window.showInformationMessage('Hello World!').then(() => {
			vscode.window.showOpenDialog({
				canSelectFiles: false, // 是否可选文件
				canSelectFolders: true, // 是否可选文件夹
				canSelectMany: false, // 是否可以选择多个
			}).then((folderUris) => {
				if (!folderUris) {
					return null;
				}
				vscode.workspace.getConfiguration().get
				vscode.workspace.getConfiguration().update('conf.replace.workSpacePath', folderUris[0].path, vscode.ConfigurationTarget.Global);
			}).then((value) => {
				//   vscode.extensions.
			})
		})
	});

	let disposable = vscode.commands.registerCommand('fileExplorer.replace', async (node: any) => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) { return null; }
		const document = editor.document;

		const documentName = document.fileName;
		if (!documentName.match(/Untitled-[\d]+/g)) {
			vscode.window.showInformationMessage("不能在这个文件下执行替换。。。🤗️");
			// let doc = await vscode.workspace.openTextDocument({ language: 'plaintext', content: testdoc });
			// editor = await vscode.window.showTextDocument(doc);
			return null;
		}

		const selection = editor.selection;
		const word = document.getText();

		let firstLine = editor.document.lineAt(0);
		let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
		let textRange =
			new vscode.Range(
				0,
				firstLine.range.start.character,
				editor.document.lineCount - 1,
				lastLine.range.end.character);

		// const testdoc = replaceTarStr(word, node);
		console.log(node)
		let opt: any = {
			encoding: 'utf-8',
		};
		var input = fs.readFileSync(node.uri.fsPath, opt).toString();
		const testdoc2 = new AnalysisCommand(Container.get(DoAnalysis));
		let testdoc: string = ""
		//todo 循环先写到这里
		
		testdoc = testdoc2.execute(input, word)
		// const testdoc = ""
		editor.edit(editBuilder => {
			editBuilder.replace(textRange, testdoc);
		});
	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
