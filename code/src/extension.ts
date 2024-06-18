// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import 'reflect-metadata';
import { FileExplorer } from './core/usecase/fileExplorer';
import { AnalysisCommand } from './adapt/model/command/AnalysisCommand';
import Container from 'typedi';
import { DoAnalysis } from './core/usecase/DoAnalysis';
import * as fs from 'fs';
import path = require('path');
import * as os from 'os';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let config = vscode.workspace.getConfiguration("template-replace");
	let workSpacePath = config.get('conf.replace.workSpacePath', vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : '');
	if (!workSpacePath) {
		workSpacePath = createFolderInUserDataDir("replaceWorkspace")
		vscode.workspace.getConfiguration().update('conf.replace.workSpacePath', workSpacePath, vscode.ConfigurationTarget.Global);
	}

	const fileExplorer = new FileExplorer(context);
	// fileExplorer.createTreeView();

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
		vscode.window.showInputBox({
			password: false, // 输入内容是否是密码  
			ignoreFocusOut: true, // 鼠标点击别的地方输入框不会消失  
			placeHolder: '请输入文件名', // 在输入框内的提示信息  
			prompt: '请输入文件名', // 在输入框下方的提示信息  
			validateInput: function (text) {
				// 对输入内容进行验证  
				if (text === '') {
					return '文件名不能为空！'; // 如果输入为空，返回错误信息  
				}
				// 可以在这里添加更多验证逻辑  
				return null; // 如果输入有效，返回null  
			}
		}).then((fileName) => {
			if (!fileName) {
				// 用户取消了操作或验证失败  
				return;
			}

			let config = vscode.workspace.getConfiguration("conf");
			let workSpacePath = config.get('replace.workSpacePath', vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : '');

			let fullPath = path.join(workSpacePath, fileName); // 结合目录和文件名  

			try {
				fs.writeFileSync(fullPath, '', 'utf8'); // 创建一个空文件  
				vscode.window.showInformationMessage(`文件 '${fullPath}' 已成功创建。`);
			} catch (error) {
				vscode.window.showErrorMessage(`创建文件 '${fullPath}' 时发生错误`);
			}
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
function createFolderInUserDataDir(folderName: string): string {
	// 获取用户的主目录  
	const homeDir = os.homedir();

	// 根据操作系统构建用户数据目录的路径  
	let userDataDir;
	switch (process.platform) {
		case 'win32':
			userDataDir = path.join(homeDir, 'AppData', 'Roaming', 'Code', 'User');
			break;
		case 'darwin':
			userDataDir = path.join(homeDir, 'Library', 'Application Support', 'Code', 'User');
			break;
		default: // 假设是 Linux 或其他 Unix-like 系统  
			userDataDir = path.join(homeDir, '.config', 'Code', 'User');
			break;
	}

	// 完整的文件夹路径  
	const folderPath = path.join(userDataDir, folderName);

	// 检查文件夹是否已存在  
	if (!fs.existsSync(folderPath)) {
		// 如果不存在，则创建文件夹  
		fs.mkdirSync(folderPath, { recursive: true }); // 使用 { recursive: true } 可以确保即使父目录不存在也能创建文件夹  

		// 通知用户文件夹已创建  
		vscode.window.showInformationMessage(`Folder ${folderName} created in VS Code user data directory.`);
	} else {
		// 文件夹已存在  
		vscode.window.showInformationMessage(`Folder ${folderName} already exists in VS Code user data directory.`);
	}

	return folderPath
}
// This method is called when your extension is deactivated
export function deactivate() { }
