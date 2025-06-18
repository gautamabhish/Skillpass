import React from 'react'
import { Inter } from 'next/font/google';
import RecommendCard from '../ui/dashboard/RecommendedCard';
import clsx from 'clsx';
const inter = Inter({
    subsets:['latin']
  })
const TopPerformer = () => {
     const bestRatedCertificates = [
        {
          image: "https://source.unsplash.com/400x250/?business",
          tag: "Best Rated",
          title: "Effective Business Communication",
          description: "Enhance your professional writing and speaking skills.",
          time: "Best rated for 2 weeks",
        },
        {
          image: "https://source.unsplash.com/400x250/?finance",
          tag: "Best Rated",
          title: "Financial Markets & Investment",
          description: "Understand the stock market, crypto, and investment basics.",
          time: "Best rated since last month",
        },
        {
          image: "https://source.unsplash.com/400x250/?design",
          tag: "Best Rated",
          title: "UI/UX Design Fundamentals",
          description: "Learn design thinking and prototyping with Figma.",
          time: "Top rated 5 days in a row",
        },
      ];
      
  return (
    <div className="mx-4">
      <div className={clsx('font-bold text-3xl  z-[100]',inter.className,'px-4')}>Top Rated</div>

    <div className="flex  gap-6 px-4 py-2 ">
      
      {bestRatedCertificates.map((card, index) => (
        <RecommendCard
          id={"77"}
          key={index}
          image={card.image}
          tag={card.tag}
          color={''}
          title={card.title}
          description={card.description}
          time={null}
        />
      ))}
    </div>
    </div>
  )
}

export default TopPerformer