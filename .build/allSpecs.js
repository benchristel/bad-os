function BufferView(buffer) {
  var view = {}

  view.getLines = function() {
    return buffer.getLines().map(addCursorPrefix)
  }

  function addCursorPrefix(line) {
    return '* ' + line
  }

  return view
}
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
describe('BufferView', function() {
  it('renders an empty buffer', function() {
    var buffer = Editor.Buffer()
    expect(BufferView(buffer).getLines()).toEqual([])
  })

  it('renders a buffer of one line', function() {
    var buffer = Editor.Buffer('hello')
    expect(BufferView(buffer).getLines()).toEqual(['* hello'])
  })

  it('renders a > cursor when the buffer is in edit mode', function() {
    var buffer = Editor.Buffer('hello')
    expect(BufferView(buffer).getLines()).toEqual(['* hello'])
  })
})
describe('navigating a buffer', function() {
  it('moves the cursor right', function() {
    var buffer = Editor.Buffer("hello")
    buffer.moveRight()
    expect(buffer.getCursorX()).toEqual(1)
  })

  it('moves the cursor right twice', function() {
    var buffer = Editor.Buffer("hello")
    buffer.moveRight()
    buffer.moveRight()
    expect(buffer.getCursorX()).toEqual(2)
  })

  it('moves the cursor right and then left', function() {
    var buffer = Editor.Buffer("hello")
    buffer.moveRight()
    buffer.moveLeft()
    expect(buffer.getCursorX()).toEqual(0)
  })

  it('moves the cursor down', function() {
    var buffer = Editor.Buffer("hello\nworld")
    buffer.moveDown()
    expect(buffer.getCursorX()).toEqual(0)
    expect(buffer.getCursorY()).toEqual(1)
  })

  it('moves the cursor down twice', function() {
    var buffer = Editor.Buffer("oh\nhello\nworld")
    buffer.moveDown()
    buffer.moveDown()
    expect(buffer.getCursorX()).toEqual(0)
    expect(buffer.getCursorY()).toEqual(2)
  })

  it('moves the cursor down and then up', function() {
    var buffer = Editor.Buffer("hello\nworld")
    buffer.moveDown()
    buffer.moveUp()
    expect(buffer.getCursorX()).toEqual(0)
    expect(buffer.getCursorY()).toEqual(0)
  })

  it('does not move the cursor left when it is at the beginning of the buffer', function() {
    var buffer = Editor.Buffer('hello')
    buffer.moveLeft()
    expect(buffer.getCursorX()).toEqual(0)
    expect(buffer.getCursorY()).toEqual(0)
  })

  it('does not move the cursor left when the buffer is empty', function() {
    var buffer = Editor.Buffer('')
    buffer.moveLeft()
    expect(buffer.getCursorX()).toEqual(0)
    expect(buffer.getCursorY()).toEqual(0)
  })

  it('does not move the cursor right when it is at the end of the buffer', function() {
    var buffer = Editor.Buffer('h')
    buffer.moveRight()
    buffer.moveRight()
    expect(buffer.getCursorX()).toEqual(1)
  })

  it('does not move the cursor left when it is at the end of a line', function() {
    var buffer = Editor.Buffer('hi\nworld')
    buffer.moveRight()
    buffer.moveRight()
    buffer.moveRight()
    expect(buffer.getCursorX()).toEqual(2)
    expect(buffer.getCursorY()).toEqual(0)
  })

  it('does not move the cursor down when the buffer is empty', function() {
    var buffer = Editor.Buffer()
    buffer.moveDown()
    expect(buffer.getCursorY()).toEqual(0)
  })

  it('does not move the cursor down when it is at the bottom', function() {
    var buffer = Editor.Buffer('hello\nworld')
    buffer.moveDown()
    buffer.moveDown()
    expect(buffer.getCursorY()).toEqual(1)
  })

  it('does not move the cursor up when it is at the top', function() {
    var buffer = Editor.Buffer()
    buffer.moveUp()
    expect(buffer.getCursorY()).toEqual(0)
  })
})

describe('editing text in a buffer', function() {
  it('edits a line', function() {
    var buffer = Editor.Buffer('bc')
    buffer.edit('abc')
    expect(buffer.getLines()).toEqual(['abc'])
  })

  it('edits a line in a multiline buffer', function() {
    var buffer = Editor.Buffer('line1\nline2')
    buffer.edit('changed')
    expect(buffer.getLines()).toEqual(['changed', 'line2'])
  })

  it('opens a line above the cursor', function() {
    var buffer = Editor.Buffer('line1')
    buffer.openLine()
    expect(buffer.getLines()).toEqual(['', 'line1'])
    expect(buffer.getCursorY()).toEqual(0)
  })

  it('deletes the first line of a document', function() {
    var buffer = Editor.Buffer('line1\nline2')
    buffer.deleteLine()
    expect(buffer.getLines()).toEqual(['line2'])
  })

  it('deletes the last line of a document', function() {
    var buffer = Editor.Buffer('line1\nline2')
    buffer.moveDown()
    buffer.deleteLine()
    expect(buffer.getLines()).toEqual(['line1'])
    expect(buffer.getCursorY()).toEqual(0)
  })
})
