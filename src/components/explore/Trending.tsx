// import { div } from "framer-motion/client";
import { Inter } from "next/font/google";
import RecommendCard from "../ui/dashboard/RecommendedCard";
import clsx from "clsx";
const inter = Inter({
  subsets:['latin']
})
export const Trending = () => {
  const trendingCertificates = [
    {
      image: "https://source.unsplash.com/400x250/?coding",
      tag: "Trending",
      color: "#f97316",
      title: "Frontend Web Development",
      description: "Master HTML, CSS, and React to build modern web apps.",
      time: 10,
    },
    {
      image: "https://source.unsplash.com/400x250/?cybersecurity",
      tag: "Trending",
      color: "#f97316",
      title: "Ethical Hacking Essentials",
      description: "Learn penetration testing and network security from scratch.",
      time: 4,
    },
    {
      image: "https://source.unsplash.com/400x250/?ai",
      tag: "Trending",
      color: "#f97316",
      title: "AI & Machine Learning Basics",
      description: "Build intelligent systems using Python and TensorFlow.",
      time: 3,
    },
  ];

  return (
    <div className="mx-4">
      <div className={clsx('font-bold text-3xl  z-[100]',inter.className,'px-4')}>Creating a Buzz..</div>

    <div className="flex  gap-6 px-4 py-2 ">
      
      {trendingCertificates.map((card, index) => (
        <RecommendCard
          key={index}
          image={card.image}
          tag={card.tag}
          color={card.color}
          title={card.title}
          description={card.description}
          time={card.time}
        />
      ))}
    </div>
    </div>
  );
};
