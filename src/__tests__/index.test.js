import test from 'ava'
import is from 'is_js'
import React from 'react'
import { createRenderer } from 'react-addons-test-utils'
import expect from 'expect'
import expectJSX from 'expect-jsx'
//import { HelloWorld } from '../App'

expect.extend(expectJSX)

test('is an array of numbers', t => {
  t.true(
    [ 1, 2, 3 ].every(item => typeof item === 'number')
  )
})

test('1 is in the array', t => {
  t.true(
    is.inArray(1, [ 1, 2, 3 ])
  )
})

// test('MyComponent default render', () => {
//   const renderer = createRenderer()

//   renderer.render(
//     <HelloWorld />
//   )
//   expect(
//     renderer.getRenderOutput()
//   )
//   .toEqualJSX(
//     <div>Hello World.</div>
//   )
// })
