import Generator from '../Generator'

describe('Generating a string from an AST', () => {
  it('should return a pretty strings', () => {
    const generator = new Generator()

    expect(
      generator.generate({
        body: [
          {
            body: [
              {
                type: 'Dimension',
                value: 1,
                unit: 'px'
              },
              {
                type: 'Keyword',
                value: 'inherit'
              },
              {
                type: 'Function',
                callee: 'rgba',
                params: [
                  {
                    type: 'Integer',
                    value: 255
                  },
                  {
                    type: 'Integer',
                    value: 94
                  },
                  {
                    type: 'Float',
                    integer: 0,
                    fractional: 34
                  }
                ]
              }
            ],
            type: 'CSSValue'
          },
          {
            body: [
              {
                type: 'Dimension',
                unit: 'ms',

                value: 300
              },
              {
                type: 'Identifier',
                value: 'all'
              },
              {
                type: 'Identifier',
                value: 'linear'
              }
            ],
            type: 'CSSValue'
          }
        ],
        type: 'MultiValue'
      })
    ).toBe('1px inherit rgba(255,94,.34),300ms all linear')
  })

  it('should use custom formatters', () => {
    const generator = new Generator({
      Function: (node, generate) =>
        `${node.callee}(${node.params.map(generate).join(' , ')})`
    })

    expect(
      generator.generate({
        type: 'CSSValue',
        body: [
          {
            type: 'Function',
            callee: 'rgba',
            params: [
              {
                type: 'Integer',
                value: 255
              },
              {
                type: 'Integer',
                value: 0
              },
              {
                type: 'Integer',
                value: 255
              },
              {
                type: 'Float',
                integer: 0,
                fractional: 55
              }
            ]
          }
        ]
      })
    ).toBe('rgba(255 , 0 , 255 , .55)')
  })
})
