import assert from 'static-type-assert'
import { pipe, pipeline, compose, composeRight } from '..'

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

assert<
  (a: 0, b: 1, c: 2) => 'x4'
>(compose(
  (_: 'x3') => 'x4' as 'x4',
  (_: 'x2') => 'x3' as 'x3',
  (_: 'x1') => 'x2' as 'x2',
  (_: 'x0') => 'x1' as 'x1',
  (_0: 0, _1: 1, _2: 2) => 'x0' as 'x0'
))

assert<typeof composeRight>(pipeline)
assert<typeof pipeline>(composeRight)
