'use babel';

import { format } from 'date-fns'

const PARSE_LENGTH = 10; // /datetime + 1(space)

export function run(cm) {
  const doc = cm.doc;
  const cursor = doc.getCursor();
  const text = doc.getRange({ line: cursor.line, ch: cursor.ch - PARSE_LENGTH }, { line: cursor.line, ch: cursor.ch - 1 });

  if (/\/date$/.test(text)) {
    replace(doc, 'date', 'yyyy年MM月dd日')
  } else if (/\/datetime$/.test(text)) {
    replace(doc, 'datetime', 'yyyy年MM月dd日 HH:mm')
  } else if (/\/time$/.test(text)) {
    replace(doc, 'time', 'HH:mm')
  }
}

function replace(doc, command, dateFormat) {
  const cursor = doc.getCursor();
  const commandLength = command.length + 2; // 2 = '/' + ' '
  doc.replaceRange(format(new Date, dateFormat), { line: cursor.line, ch: cursor.ch - commandLength }, { line: cursor.line, ch: cursor.ch })
}
