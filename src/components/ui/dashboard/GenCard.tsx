import React from 'react'
import { IconType } from 'react-icons';

interface CardProps {
  title: string,
  number: string,
  subtext: string,
  icon: IconType,
  color: string,
}


function Card(props : CardProps) {
  const { title, number, subtext, icon: Icon, color } = props;
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-fit min-w-[330px] md:min-w-[300px] flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <Icon color={color} />
      </div>
      <h2 className="text-3xl font-bold text-gray-900">{number}</h2>
      <p className="text-xs text-gray-500 mt-1 font-semibold">{subtext}</p>
    </div>
  )
}

export default Card;