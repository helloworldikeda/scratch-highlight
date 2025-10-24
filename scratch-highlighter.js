(function(hljs) {
  function hljsDefineScratch(hljs) {
  const CONTROL_BLOCKS = [
    'repeat',
    'forever',
    'if',
    'else',
    'wait',
    'until',
    'while',
    'for each',
    'stop'
  ];

  const MOTION_BLOCKS = [
    'move',
    'turn',
    'go to',
    'goto',
    'glide',
    'point in direction',
    'point towards',
    'change x by',
    'set x to',
    'change y by',
    'set y to',
    'if on edge, bounce',
    'set rotation style'
  ];

  const LOOKS_BLOCKS = [
    'say',
    'think',
    'show',
    'hide',
    'switch costume to',
    'next costume',
    'switch backdrop to',
    'next backdrop',
    'change size by',
    'set size to',
    'change',
    'set',
    'clear graphic effects',
    'go to front',
    'go back',
    'layers'
  ];

  const SOUND_BLOCKS = [
    'play sound',
    'start sound',
    'stop all sounds',
    'change volume by',
    'set volume to',
    'change pitch effect by',
    'set pitch effect to'
  ];

  const EVENT_BLOCKS = [
    'when',
    'when flag clicked',
    'when key pressed',
    'when this sprite clicked',
    'when backdrop switches to',
    'broadcast',
    'when I receive'
  ];

  const SENSING_BLOCKS = [
    'touching',
    'touching color',
    'distance to',
    'ask',
    'answer',
    'key pressed',
    'mouse down',
    'mouse x',
    'mouse y',
    'loudness',
    'timer',
    'reset timer',
    'of'
  ];

  const OPERATOR_BLOCKS = [
    'and',
    'or',
    'not',
    'join',
    'letter',
    'length',
    'contains',
    'mod',
    'round',
    'sqrt',
    'abs',
    'floor',
    'ceiling',
    'sin',
    'cos',
    'tan',
    'asin',
    'acos',
    'atan',
    'ln',
    'log',
    'e ^',
    '10 ^'
  ];

  const DATA_BLOCKS = [
    'set',
    'change',
    'show variable',
    'hide variable',
    'add',
    'delete',
    'insert',
    'replace item',
    'item',
    'length of',
    'contains',
    'show list',
    'hide list'
  ];

  const CUSTOM_BLOCKS = [
    'define',
    'call'
  ];

  const KEYWORDS = [
    ...CONTROL_BLOCKS,
    ...EVENT_BLOCKS,
    'end',
    'then',
    'times',
    'seconds'
  ];

  const BUILT_INS = [
    ...MOTION_BLOCKS,
    ...LOOKS_BLOCKS,
    ...SOUND_BLOCKS,
    ...SENSING_BLOCKS,
    ...DATA_BLOCKS,
    'create clone of',
    'delete this clone',
    'myself'
  ];

  return {
    name: 'Scratch',
    case_insensitive: true,
    keywords: {
      keyword: KEYWORDS,
      built_in: BUILT_INS,
      literal: ['true', 'false']
    },
    contains: [
      hljs.COMMENT('//', '$'),
      {
        className: 'number',
        begin: '\\b-?\\d+(\\.\\d+)?\\b',
        relevance: 0
      },
      {
        className: 'string',
        begin: '"',
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        // Dropdown values like [myself v] or [random position v]
        className: 'symbol',
        begin: '\\[',
        end: '\\s*v?\\]',
        relevance: 10
      },
      {
        // Parentheses for block inputs
        className: 'params',
        begin: '\\(',
        end: '\\)',
        contains: [
          'self',
          hljs.COMMENT('//', '$'),
          {
            className: 'number',
            begin: '\\b-?\\d+(\\.\\d+)?\\b'
          },
          {
            className: 'string',
            begin: '"',
            end: '"'
          }
        ]
      },
      {
        // Operators
        className: 'operator',
        begin: '\\+|-|\\*|/|<|>|=',
        relevance: 0
      },
      {
        // Custom block definitions
        className: 'title',
        begin: '\\bdefine\\s+',
        end: '$',
        keywords: 'define',
        contains: [
          {
            className: 'params',
            begin: '\\(',
            end: '\\)'
          }
        ]
      }
    ]
  };
}

// Auto-register if hljs is available
if (typeof hljs !== 'undefined') {
  hljs.registerLanguage('scratch', hljsDefineScratch);
}

// Support different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = hljsDefineScratch;
}
})(typeof hljs !== 'undefined' ? hljs : undefined);