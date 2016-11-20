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
