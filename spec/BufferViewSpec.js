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
