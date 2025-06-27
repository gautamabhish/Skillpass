import React from 'react';
import { FiDownload } from 'react-icons/fi';
import Image from 'next/image';

interface CertificateCardProps {
  image: string;
  title: string;
  completed: string;
  id: string;
}

function CertificateCard(props: CertificateCardProps) {
  const { image, title, completed, id } = props;

  return (
    <div className="bg-white shadow-md rounded-xl flex flex-col w-[300px] h-[350px] md:w-[350px] md:h-[350px] overflow-hidden">
      <div className="w-full h-[180px] md:h-[200px] relative bg-gray-50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain blur-[3px]"
         
        />
      </div>

      <div className="flex-1 flex flex-col justify-between p-4">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">{title}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500">{completed}</span>
          <a
            href={`/certificate/${id}`}
            target="_blank"
            className="text-blue-400 hover:text-blue-500 transition"
          >
            <FiDownload />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CertificateCard;
