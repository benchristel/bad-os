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
    lines[y] = text
  }

  buffer.openLine = function() {
    lines = lines.slice(0, y).concat(['']).concat(lines.slice(y))
  }

  buffer.deleteLine = function() {
    lines = lines.slice(0, y).concat(lines.slice(y + 1))
    if (y >= lines.length) {
      y = lines.length - 1
    }
  }

  buffer.getLines = function() {
    return lines
  }

  return buffer
}
