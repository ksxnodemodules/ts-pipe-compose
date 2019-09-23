import assert from 'static-type-assert'

import {
  pipe,
  pipeline,
  compose,
  composeRight,
  pipelineUnary,
  composeUnary,
  composeUnaryRight
} from '..'

assert<7>(pipe(
  3 as const,
  x => {
    assert<3>(x)
    return 'x' as const
  },
  x => {
    assert<'x'>(x)
    return 7 as const
  }
))

assert<
  (a: 0, b: 1, c: 2) => 'y'
>(pipeline(
  (a: 0, b: 1, c: 2) => [a, b, c] as const,
  x => {
    assert<readonly [0, 1, 2]>(x)
    return 'x' as const
  },
  x => {
    assert<'x'>(x)
    return 'y' as const
  }
))

assert<
  (a: 0, b: 1, c: 2) => 'x4'
>(compose(
  (_: 'x3') => 'x4' as const,
  (_: 'x2') => 'x3' as const,
  (_: 'x1') => 'x2' as const,
  (_: 'x0') => 'x1' as const,
  (_0: 0, _1: 1, _2: 2) => 'x0' as const
))

assert<typeof composeRight>(pipeline)
assert<typeof pipeline>(composeRight)

assert<
  (x: 'x') => 'y'
>(pipelineUnary(
  (x: 'x') => [x] as const,
  x => {
    assert<readonly ['x']>(x)
    return 'x' as const
  },
  x => {
    assert<'x'>(x)
    return 'y' as const
  }
))

assert<
  (x0: 'x0') => 'x5'
>(composeUnary(
  (_: 'x4') => 'x5' as const,
  (_: 'x3') => 'x4' as const,
  (_: 'x2') => 'x3' as const,
  (_: 'x1') => 'x2' as const,
  (_: 'x0') => 'x1' as const
))

assert<typeof composeUnaryRight>(pipelineUnary)
assert<typeof pipelineUnary>(composeUnaryRight)
