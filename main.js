var buffer = ''

var keyboardController = KeyboardController(function(char, signal) {
  if (char) buffer += char

  if (signal === 'backspace') {
    buffer = buffer.slice(0, buffer.length - 1)
  }

  render()
})

C680.onKeyDown(keyboardController.keyDown)
C680.onKeyUp(keyboardController.keyUp)

function render() {
  C680.render(('> ' + buffer + '_').split('\n'))
}

C680.render([
  '',
  '',
  '',
  '',
  '  ------------------------------------------------------------',
  '',
  toBlockDrawing('  ###########                    #   ##########    ###########'),
  toBlockDrawing('    ____    ##                  ##  ##        ##  ##'),
  toBlockDrawing('    ####    ##                  ##  ##  ####  ##  ##'),
  toBlockDrawing('    ^^^^    ##  #######         ##  ##        ##  ##'),
  toBlockDrawing('  ##########          ##   #######  ##        ##   #########'),
  toBlockDrawing('    ____    ##   #######  ##    ##  ##        ##           ##'),
  toBlockDrawing('    ####    ##  ##    ##  ##    ##  ##  ####  ##           ##'),
  toBlockDrawing('    ^^^^    ##  ##    ##  ##    ##  ##        ##           ##'),
  toBlockDrawing('  ###########    ######^#  #######   ##########  ########### '),
  '',
  '  ------------------------------------------------------------',
  '',
  '                 Press any key to continue.'
])

function toBlockDrawing(s) {
  if (!s) {
    return ''
  }

  if (s.length === 1) {
    switch(s) {
      case '#':
        return '\u2588' // full block
      case '_':
        return '\u2584' // lower half block
      case '^':
        return '\u2580' // upper half block
      default:
        return s
    }
  }

  return s.split('').map(toBlockDrawing).join('')
}
