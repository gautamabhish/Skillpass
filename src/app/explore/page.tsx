import { Trending } from '@/components/explore/Trending'
import TopPerformer from '@/components/explore/TopPerformer'
import React from 'react'
import LeaderBoard from '@/components/explore/LeaderBoard'
import SearchNavbar from '@/components/ui/globals/SearchNavbar'
import WeeklyChallenge from '@/components/explore/WeeklyChallenge'
// Container from '@/components/dashboard/RecommendConatiner'
import Footer from '@/components/ui/globals/Footer'
const page = () => {
  return (
    <div className='flex flex-col gap-y-8 bg-[#f5f5f5] p-2 min-h-screen'>
       <SearchNavbar></SearchNavbar>
        <Trending></Trending>
        <TopPerformer></TopPerformer>
       <WeeklyChallenge></WeeklyChallenge>
       <LeaderBoard
  topPlayers={[
    { id: '1', name: 'Alice', score: 1200, rank: 1 },
    { id: '2', name: 'Bob', score: 1150, rank: 2 },
    // ...up to 10
  ]}
  surroundingPlayers={[
    { id: '21', name: 'Jake', score: 870, rank: 118 },
    { id: '22', name: 'You', score: 860, rank: 119 },
    { id: '23', name: 'Emma', score: 855, rank: 120 },
  ]}
  currentUser={{ id: '22', name: 'You', score: 860, rank: 119 }}
/>
  <div className='pt-6'>
  <Footer></Footer>
  </div>
    </div>
  )
}

export default page