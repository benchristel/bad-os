var KeyboardController = function(emit) {
  var shift
  shiftOff()

  var deadKey
  var deadKeySequence
  deadKeyOff()

  var chars = {
    13: '\n',
    32: ' ',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    '+32': ' ',
    '+65': 'A',
    '+66': 'B',
    '+67': 'C',
    '+68': 'D',
    '+69': 'E',
    '+70': 'F',
    '+71': 'G',
    '+72': 'H',
    '+73': 'I',
    '+74': 'J',
    '+75': 'K',
    '+76': 'L',
    '+77': 'M',
    '+78': 'N',
    '+79': 'O',
    '+80': 'P',
    '+81': 'Q',
    '+82': 'R',
    '+83': 'S',
    '+84': 'T',
    '+85': 'U',
    '+86': 'V',
    '+87': 'W',
    '+88': 'X',
    '+89': 'Y',
    '+90': 'Z',
  }

  var specialChars = {
    'ea': 'á',
    'ee': 'é',
    'ei': 'í',
    'eo': 'ó',
    'eu': 'ú',
    '\\a': 'à',
    '\\e': 'è',
    '\\i': 'ì',
    '\\o': 'ò',
    '\\u': 'ù',
    'ia': 'â',
    'ie': 'ê',
    'ii': 'î',
    'io': 'ô',
    'iu': 'û',
  }

  var signals = {
    8: 'backspace',
    '+8': 'backspace',
    '+13': 'shift-return'
  }

  if (typeof emit !== 'function') {
    throw 'KeyboardController must be initialized with a function '
      + 'to which characters will be emitted'
  }

  return {
    keyDown: keyDown,
    keyUp: keyUp
  }

  function keyDown(code) {
    if (code === 16) shiftOn()
    if (code === 192) deadKeyToggle()

    var key = shift + code

    var char = chars[key]

    if (deadKey && char) {
      deadKeySequence += char

      char = specialChars[deadKeySequence]

      if (char) {
        deadKeyOff()
      }
    }

    var signal = signals[key]

    doEmit(char, signal)
  }

  function doEmit(char, signal) {
    if (char || signal) {
      emit(char || '', signal || null)
    }
  }

  function keyUp(code) {
    if (code === 16) shiftOff()
  }

  function shiftOn() {
    shift = '+'
  }

  function shiftOff() {
    shift = ''
  }

  function deadKeyOn() {
    deadKey = true
  }

  function deadKeyOff() {
    deadKey = false
    deadKeySequence = ''
  }

  function deadKeyToggle() {
    deadKey = !deadKey
    deadKeySequence = ''
  }
}
