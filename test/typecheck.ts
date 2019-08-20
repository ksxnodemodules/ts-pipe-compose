import assert from 'static-type-assert'
import { pipe, pipeline } from '..'

assert<7>(pipe(
  3 as 3,
  x => {
    assert<3>(x)
    return 'x' as 'x'
  },
  x => {
    assert<'x'>(x)
    return 7 as 7
  }
))

assert<
  (a: 0, b: 1, c: 2) => 'y'
>(pipeline(
  (a: 0, b: 1, c: 2) => [a, b, c] as [0, 1, 2],
  x => {
    assert<[0, 1, 2]>(x)
    return 'x' as 'x'
  },
  x => {
    assert<'x'>(x)
    return 'y' as 'y'
  }
))
