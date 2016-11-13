var Editor = {}

Editor.Buffer = function(text) {
  text = text || ''
  var lines = text.split('\n')
  var buffer = {}
  var x = 0
  var y = 0

  buffer.getCursorX = function() {
    return x
  }

  buffer.getCursorY = function() {
    return y
  }

  buffer.moveLeft = function() {
    if (x > 0) x -= 1
  }

  buffer.moveRight = function() {
    if (x < lines[y].length) x += 1
  }

  buffer.moveDown = function() {
    if (y < lines.length - 1) y += 1
  }

  buffer.moveUp = function() {
    if (y > 0) y -= 1
  }

  buffer.edit = function(text) {
    lines[y] =  text
  }

  buffer.openLine = function() {
    lines = lines.slice(0, y).concat(['']).concat(lines.slice(y))
  }

  buffer.getLines = function() {
    return lines
  }

  return buffer
}

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
  return function(line, i) {
    var isLineAtCursor = buf.getCursorY() === i

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
}

redraw()
