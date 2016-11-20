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
