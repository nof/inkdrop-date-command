'use babel';

import { CompositeDisposable } from 'event-kit';
import { CodeMirrorHandler } from './CodeMirrorHandler';

let subscriptions = null;
let codeMirrorHandler = null;

module.exports = {

  activate() {
    this.subscriptions = new CompositeDisposable();

    const activeEditor = inkdrop.getActiveEditor();
    if (activeEditor !== undefined) {
      this.codeMirrorHandler = new CodeMirrorHandler(activeEditor.cm);
    } else {
      this.subscriptions.add(
        inkdrop.onEditorLoad(e => {
          this.codeMirrorHandler = new CodeMirrorHandler(e.cm);
        })
      )
    }
  },

  deactivate() {
    this.subscriptions.dispose();
    this.codeMirrorHandler.dispose();
  }
};
