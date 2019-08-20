# Pipe and Compose for TypeScript

`pipe`, `pipeline`, and `compose` functions with TypeScript definitions

## What's the point?

This package not only provides simple `pipe`, `pipeline`, and `compose` implementation, it also provides many TypeScript overloads for each function. [See [index.d.ts](https://cdn.jsdelivr.net/npm/ts-pipe-compose@0.1.1/lib/index.d.ts)]

## Usage

### APIs

#### `pipe`

**Signature:** `pipe (value, ...functions) → result`

```javascript
const y = pipe(x0, f1, f2, f3)
```

is equivalent to

```javascript
const x1 = f1(x0)
const x2 = f2(x1)
const x3 = f3(x2)
const y = f3(x3)
```

or

```javascript
const y = f3(f2(f1(x0)))
```

#### `pipeline`

**Signature:** `pipeline (...functions) → function`

```javascript
const fn = pipe(f0, f1, f2, f3)
```

is equivalent to

```javascript
const fn = (...args) => f3(f2(f1(f0(...args))))
```

#### `compose`

**Signature:** `compose (...functions) → function`

```javascript
const fn = compose(f3, f2, f1, f0)
```

is equivalent to

```javascript
const fn = (...args) => f3(f2(f1(f0(...args))))
```

#### `composeRight`

It is just an alias of [`pipeline`](#pipeline)

### Example

```javascript
// pipe
const y0 = pipe(x, f1, f2, f3, f4)

// pipeline
const g1 = pipeline(f0, f1, f2, f3, f4)
const y1 = g1(...args)

// compose
const g2 = compose(f4, f3, f2, f1, f0)
const y2 = g2(...args)
```

## License

[MIT](https://git.io/fjbqB) © [Hoàng Văn Khải](hvksmr1996@gmail.com)
