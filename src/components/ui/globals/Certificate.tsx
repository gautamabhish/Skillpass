// @ts-nocheck
'use client';

import React from 'react';
import { Cedarville_Cursive } from 'next/font/google';
import { useCertificateFetch } from '@/hooks/useCerificateFetch';
import ExploreLoading from '@/app/loading';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  Instagram,
  Linkedin,
  Download,
  Share2,
  MessageCircle,
} from 'lucide-react';
import Image from 'next/image';

import './certificate.css';

const Cedarvile = Cedarville_Cursive({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cedarville',
});

type CertificateProps = {
  certificateId: string;
};

const Certificate = ({ certificateId }: CertificateProps) => {
  const { data, isLoading } = useCertificateFetch(certificateId);
  if (isLoading || !data?.certificateDetails) return <ExploreLoading />;
  const c = data.certificateDetails;

  const generateQRCode = () => {
    const url = `https://skillpass.org/certificate/${certificateId}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(url)}`;
  };

const handleDownloadPDF = async () => {
  const el = document.getElementById('print-area');
  if (!el) return;

  // Render DOM to canvas at double resolution
  const canvas = await html2canvas(el, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL('image/jpeg', 1.0);

  // Create A4 landscape PDF
  const pdf = new jsPDF('l', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();   // ~297mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // ~210mm

  // Calculate image height to maintain aspect ratio
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  // If the rendered certificate is taller than the pageHeight, scale it down
  const finalHeight = imgHeight > pageHeight ? pageHeight : imgHeight;

  pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, finalHeight);

  // Safe filename
  const safeName = c.userName.replace(/\s+/g, '_');
  const safeQuiz = c.quizTitle.replace(/\s+/g, '_');
  pdf.save(`${safeName}-${safeQuiz}.pdf`);
};


  const shareURL = `https://skillpass.org/certificate/${certificateId}`;
  const fallbackCopy = () => {
    navigator.clipboard.writeText(shareURL);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="container">
      <div id="print-area" className="certificateBox">
         <div className="logo">
       <Image src="/logonew.png" alt="SkillPass Logo" width={96} height={96} />
    </div>
        <div className="corner topLeft" />
        <div className="corner topRight" />
        <div className="corner bottomLeft" />
        <div className="corner bottomRight" />

        <div className="header">
          <h1>CERTIFICATE</h1>
          <h2>OF ACHIEVEMENT</h2>
          <div className="underline" />
        </div>

        <div className="main">
          <p>This is to certify that</p>
          <h3 className="username">{c.userName}</h3>
          <p>has successfully completed</p>
          <h4 className="quizTitle">{c.quizTitle}</h4>
          <div className="stats">
            <div>
              <div className="badge score">
                <span>{c.score}/{c.totalScore}</span>
              </div>
              <p>SCORE</p>
            </div>
            <div>
              <div className="badge rank">
                <span>#{c.rank}</span>
              </div>
              <p>RANK</p>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="info">
            <p>Date Issued:</p>
            <p className="date">{new Date(c.issuedAt).toLocaleDateString()}</p>
          </div>
          <div className="qr">
            <img src={generateQRCode()} alt="QR Code" />
            <p>Scan to verify</p>
          </div>
          <div className="signature">
            <p className="signer" style={{ fontFamily: Cedarvile.variable }}>SkillPass</p>
            <p>Authorized Signature</p>
            <p className="creator">Quiz Created by: {c.creatorName}</p>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="printBtn" onClick={() => window.print()}>
          Print Certificate
        </button>
        <button className="pdfBtn" onClick={handleDownloadPDF}>
          <Download /> Download PDF
        </button>
      </div>

      <div className="socialIcons">
        <a href={`https://www.instagram.com/?url=${encodeURIComponent(shareURL)}`} target="_blank" rel="noopener">
          <Instagram color="#E1306C" />
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareURL)}`} target="_blank" rel="noopener">
          <Linkedin color="#0A66C2" />
        </a>
        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareURL)}`} target="_blank" rel="noopener">
          <MessageCircle color="#25D366" />
        </a>
        <button onClick={navigator.share ? () => navigator.share({ title: 'My Certificate', url: shareURL }) : fallbackCopy}>
          <Share2 color="#374151" />
        </button>
      </div>
    </div>
  );
};

export default Certificate;
