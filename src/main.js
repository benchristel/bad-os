var buffer = Editor.Buffer()
var mode = 'normal'
var fileToEdit = 'README.md'

C680.readFile(fileToEdit, function(content) {
  buffer = Editor.Buffer(content)
  redraw()
})

C680.onKeyPress = function(key) {
  if (mode === 'normal') {
    handleKeypressInNormalMode(key)
  } else {
    handleKeypressInEditMode(key)
  }
  redraw()
}

function handleKeypressInNormalMode(key) {
  switch (key) {
    case 'j':
      buffer.moveDown()
      break
    case 'k':
      buffer.moveUp()
      break
    case 'o':
      buffer.openLine()
      break
    case 'x':
      buffer.deleteLine()
      break
    case 's':
      C680.writeFile(fileToEdit, buffer.getLines().join('\n'))
      break
    case 'Enter':
      mode = 'edit'
      break
  }
}

var lineBeingEdited = ''
function handleKeypressInEditMode(key) {
  switch (key) {
    case 'Enter':
      buffer.edit(lineBeingEdited)
      lineBeingEdited = ''
      mode = 'normal'
      break
    case 'Backspace':
      lineBeingEdited = lineBeingEdited.slice(0, lineBeingEdited.length - 1)
      break
    default:
      lineBeingEdited += key
  }
}

function redraw() {
  C680.render(viewBuffer(buffer))
}

function viewBuffer(buf) {
  return buf.getLines()
    .filter(nearCursor(buf))
    .map(viewLine(buf))
}

function nearCursor(buf) {
  return function() {
    return true
  }
}

function viewLine(buf) {
  return function(line, i, lines) {
    var isLineAtCursor = buf.getCursorY() === i

    return firstChar() + secondChar()

    if (mode === 'normal') {
      if (isLineAtCursor) {
        return '* ' + line
      } else {
        return '  ' + line
      }
    } else {
      if (isLineAtCursor) {
        return '> ' + lineBeingEdited
      } else {
        return '  ' + line
      }
    }
  }

  function firstChar(line, i, buf) {
    if (i === buf.getCursorY()) {
      
    }
  }
}

redraw()
