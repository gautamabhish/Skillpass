import React from 'react';
import { FiDownload } from 'react-icons/fi';

interface CertificateCardProps {
  image: string;
  title: string;
  completed: string;
  id:string
}

function CertificateCard(props: CertificateCardProps) {
  const { image, title, completed ,id} = props;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col  gap-4 w-[300px] md:h-[330px] md:w-[350px] ">
      <img src={image} alt={title} className="rounded-md object-cover w-full h-42 md:h-52"/>
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">{title}</p>
      </div>

      <div className='flex items-center justify-between'> 
      <span className="text-sm font-semibold text-gray-500">{completed}</span>
        <a href={`/certificate/${id}`} target='_blank'  className="text-blue-400 hover:text-blue-500 transition" >
        <FiDownload />
      </a>
      </div>
    </div>
  );
}

export default CertificateCard;