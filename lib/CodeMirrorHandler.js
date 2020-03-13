'use babel';

import { Disposable, CompositeDisposable } from 'event-kit';
import { run } from './Commander'

export class CodeMirrorHandler extends Disposable {
  constructor(cm) {
    super(() => this.destroy());
    this.subscriptions = new CompositeDisposable();
    this.cm = cm;
    this.cm.on('change', this.handleChange)
  }

  handleChange(cm, object) {
    const char = object.text[0];
    if (char === ' ') run(cm);
  }

  destroy() {
    this.subscriptions.dispose();
    this.cm.off('change', this.handleChange)
  }
}
