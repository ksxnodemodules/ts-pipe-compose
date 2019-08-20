import { pipe, pipeline } from '..'

describe('pipe', () => {
  it('without function', () => {
    const x = Symbol('x')
    expect(pipe(x)).toEqual(x)
  })

  describe('with one function', () => {
    const setup = () => {
      const x0 = Symbol('x0')
      const x1 = Symbol('x1')
      const fn = jest.fn(() => x1)
      const y = pipe(x0, fn)
      return { x0, x1, fn, y }
    }

    it('calls the function once', () => {
      const { fn } = setup()
      expect(fn).toBeCalledTimes(1)
    })

    it('passes the argument to the function', () => {
      const { x0, fn } = setup()
      expect(fn).toBeCalledWith(x0)
    })

    it('returns what the function returns', () => {
      const { x1, y } = setup()
      expect(y).toBe(x1)
    })
  })

  describe('with multiple functions', () => {
    const setup = () => {
      const x0 = Symbol('x0')
      const x1 = Symbol('x1')
      const x2 = Symbol('x2')
      const x3 = Symbol('x3')
      const f1 = jest.fn(() => x1)
      const f2 = jest.fn(() => x2)
      const f3 = jest.fn(() => x3)
      const y = pipe(x0, f1, f2, f3)
      return { x0, x1, x2, x3, f1, f2, f3, y }
    }

    describe('calls each function once', () => {
      it('f1', () => {
        const { f1 } = setup()
        expect(f1).toBeCalledTimes(1)
      })

      it('f2', () => {
        const { f2 } = setup()
        expect(f2).toBeCalledTimes(1)
      })

      it('f3', () => {
        const { f3 } = setup()
        expect(f3).toBeCalledTimes(1)
      })
    })

    describe('passes result of previous function to next function', () => {
      it('x0 → f1', () => {
        const { x0, f1 } = setup()
        expect(f1).toBeCalledWith(x0)
      })

      it('x1 → f2', () => {
        const { x1, f2 } = setup()
        expect(f2).toBeCalledWith(x1)
      })

      it('x2 → f3', () => {
        const { x2, f3 } = setup()
        expect(f3).toBeCalledWith(x2)
      })
    })

    it('returns result of last function', () => {
      const { x3, y } = setup()
      expect(y).toBe(x3)
    })
  })
})

describe('pipeline', () => {
  describe('with one function', () => {
    const setup = (times = 1) => {
      const args = [...'args']
      const x0 = Symbol('x0')
      const f0 = jest.fn((..._: string[]) => x0)
      const fn = pipeline(f0)
      const ys = Array(times).fill(null).map(() => fn(...args))
      return { args, x0, f0, fn, ys }
    }

    it('calls provided function once', () => {
      const { f0 } = setup()
      expect(f0).toBeCalledTimes(1)
    })

    it('calls provided function every time the resulting function is called', () => {
      const times = 5
      const { f0 } = setup(times)
      expect(f0).toBeCalledTimes(times)
    })

    it('passes arguments to provided function', () => {
      const { args, f0 } = setup()
      expect(f0).toBeCalledWith(...args)
    })

    it('returns result of provided function', () => {
      const { x0, ys: [y] } = setup()
      expect(y).toBe(x0)
    })
  })

  describe('with multiple functions', () => {
    const setup = (times = 1) => {
      const args = [...'args']
      const x0 = Symbol('x0')
      const x1 = Symbol('x1')
      const x2 = Symbol('x2')
      const x3 = Symbol('x3')
      const f0 = jest.fn((..._: string[]) => x0)
      const f1 = jest.fn(() => x1)
      const f2 = jest.fn(() => x2)
      const f3 = jest.fn(() => x3)
      const fn = pipeline(f0, f1, f2, f3)
      const ys = Array(times).fill(null).map(() => fn(...args))
      return { args, x0, x1, x2, x3, f0, f1, f2, f3, fn, ys }
    }

    describe('calls each function once', () => {
      it('f0', () => {
        const { f0 } = setup()
        expect(f0).toBeCalledTimes(1)
      })

      it('f1', () => {
        const { f1 } = setup()
        expect(f1).toBeCalledTimes(1)
      })

      it('f2', () => {
        const { f2 } = setup()
        expect(f2).toBeCalledTimes(1)
      })

      it('f3', () => {
        const { f3 } = setup()
        expect(f3).toBeCalledTimes(1)
      })
    })

    describe('calls each function every time the resulting function is called', () => {
      const times = 5

      it('f0', () => {
        const { f0 } = setup(times)
        expect(f0).toBeCalledTimes(times)
      })

      it('f1', () => {
        const { f1 } = setup(times)
        expect(f1).toBeCalledTimes(times)
      })

      it('f2', () => {
        const { f2 } = setup(times)
        expect(f2).toBeCalledTimes(times)
      })

      it('f3', () => {
        const { f3 } = setup(times)
        expect(f3).toBeCalledTimes(times)
      })
    })

    describe('passes result of previous function to next function', () => {
      it('...args → f0', () => {
        const { args, f0 } = setup()
        expect(f0).toBeCalledWith(...args)
      })

      it('x0 → f1', () => {
        const { x0, f1 } = setup()
        expect(f1).toBeCalledWith(x0)
      })

      it('x1 → f2', () => {
        const { x1, f2 } = setup()
        expect(f2).toBeCalledWith(x1)
      })

      it('x2 → f3', () => {
        const { x2, f3 } = setup()
        expect(f3).toBeCalledWith(x2)
      })
    })

    it('returns result of the last function', () => {
      const { x3, ys: [y] } = setup()
      expect(y).toBe(x3)
    })
  })
})
