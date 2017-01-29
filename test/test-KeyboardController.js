describe('KeyboardController', function() {
  it('throws if not given a function', function() {
    expect(function() {
      KeyboardController()
    }).toThrow('KeyboardController must be initialized with a function to which characters will be emitted')
  })
})

describe('KeyboardController', function() {
  var buffer
  var signal
  var controller

  beforeEach(function() {
    buffer = ''
    signal = null
    controller = KeyboardController(function(emitted, _signal) {
      buffer += emitted
      signal = _signal
    })
  })

  it('does not emit anything when no keys are pressed', function() {
    expect(buffer).toEqual('')
    expect(signal).toEqual(null)
  })

  it('translates key codes into characters', function() {
    controller.keyDown(65)
    expect(buffer).toEqual('a')
  })

  it('does not emit a signal when a character key is typed', function() {
    controller.keyDown(65)
    expect(signal).toEqual(null)
  })

  it('capitalizes letters when the shift key is held', function() {
    controller.keyDown(16)
    controller.keyDown(65)
    expect(buffer).toEqual('A')
  })

  it('does not capitalize letters when the shift key is released', function() {
    controller.keyDown(16)
    controller.keyUp(16)
    controller.keyDown(65)
    expect(buffer).toEqual('a')
  })

  it('emits a signal when backspace is pressed', function() {
    controller.keyDown(8)
    expect(signal).toEqual('backspace')
    expect(buffer).toEqual('')
  })

  it('emits a signal when shift+return is pressed', function() {
    controller.keyDown(16)
    controller.keyDown(13)
    expect(signal).toEqual('shift-return')
    expect(buffer).toEqual('')
  })

  it('emits accented characters typed with backtick escape codes', function() {
    controller.keyDown(192)
    controller.keyDown(69)
    controller.keyDown(65)
    expect(buffer).toEqual('á')
  })

  it('gets out of backtick escape mode when backtick is pressed again', function() {
    controller.keyDown(192)
    controller.keyDown(69)
    controller.keyDown(192)
    expect(buffer).toEqual('')
    controller.keyDown(69)
    expect(buffer).toEqual('e')
  })
})
