import React from 'react'
import Navbar from '@/components/ui/globals/Navbar'
import Hero from '@/components/ui/globals/Hero'
import Main from '@/components/ui/globals/Main'
import Footer from '@/components/ui/globals/Footer'
const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <Main></Main>
        <Footer></Footer>
    </div>
  )
}

export default Home