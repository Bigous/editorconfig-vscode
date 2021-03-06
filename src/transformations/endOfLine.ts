'use strict';

import * as editorconfig from 'editorconfig';
import {
	EndOfLine,
	TextEditor,
	TextDocument
} from 'vscode';

/**
 * Transform the textdocument by setting the end of line sequence
 */
export function transform(
	editorconfig: editorconfig.knownProps,
	editor: TextEditor,
	textDocument: TextDocument
): Thenable<boolean|void> {
	const eol = {
		lf: EndOfLine.LF,
		crlf: EndOfLine.CRLF
	}[(editorconfig.end_of_line || '').toLowerCase()];

	if (!eol) {
		return Promise.resolve();
	}

	return editor.edit(edit => {
		edit.setEndOfLine(eol);
	});
}
