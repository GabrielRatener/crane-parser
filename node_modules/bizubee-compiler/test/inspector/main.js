
import {parse} from '../../src/parser';

var bzEditor, jsEditor;

const actions = {
	compile() {
		const source = bzEditor.getValue();
		console.log(source);
		jsEditor.setValue(parse(source).getJSText());
	},
	theme() {
		const index = floor(themes.length * random());
		editor.setTheme(`ace/theme/${themes[index]}`);
	}
};

window.onload = function(e) {
	bzEditor = CodeMirror(document.getElementById('bz-editor'), {
		value: Cookies.get('code') || '',
		mode: 'bizubee',
		theme: 'dracula',
		lineNumbers: true
	});

	jsEditor = CodeMirror(document.getElementById('js-editor'), {
		mode: 'javascript',
		theme: 'elegant'
	});

	const query = document.querySelectorAll('#actions input[bind-to]');
	for (var i = 0; i < query.length; i++) {
		const action = query[i].getAttribute('bind-to');
		query[i].onclick = actions[action];
	}
}

window.onbeforeunload = function() {
	Cookies.set('code', bzEditor.getValue());
}

