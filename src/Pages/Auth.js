import React from 'react'

// components
import { Switch, Route } from 'react-router-dom'

import slideImg1 from '../assets/img/register_bg_2.png'
// views

import Register from './Register'
import Login from './Login'

export default function Auth() {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div className="absolute top-0 w-full h-full bg-white-500 bg-no-repeat bg-full">
            <img src={slideImg1} />
          </div>
          {/*<Switch>*/}
          {/*    <Route path="/auth/register" exact component={Register} />*/}
          {/*</Switch>*/}
          {/*<Register/>*/}
          <Login />
        </section>
      </main>
    </>
  )
}
