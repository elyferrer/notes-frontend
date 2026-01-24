import React from 'react'
import Notes from '../notes/Notes'
import Categories from '../categories/Categories'

const Home = () => {
  return (
    <div className='mx-auto w-2/5 min-h-screen bg-red-300'>
      <h1>Home</h1>
      <div>
        <Categories />
      </div>
    </div>
  )
}

export default Home
