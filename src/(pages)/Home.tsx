import React from 'react'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/Hero'
import Main from '@/components/Main'
import Footer from '@/components/ui/Footer'
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