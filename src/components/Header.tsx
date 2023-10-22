import React, { useRef } from 'react'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function Header() {

  const divToConvertRef = useRef<any>(null);

  const generatePDF = async () => {
    const divToConvert = divToConvertRef.current;

    if (!divToConvert) {
      return;
    }

    const doc:any = new jsPDF({
      orientation: 'portrait', // or 'landscape'
      unit: 'mm',
      format: 'a4',
    });

    const totalHeight = divToConvert.clientHeight;

    let currentPosition = 0;

    while (currentPosition < totalHeight) {
      const canvas = await html2canvas(divToConvert, {
        windowWidth: doc.internal.pageSize.getWidth(),
        windowHeight: doc.internal.pageSize.getHeight(),
        scrollX: 0,
        scrollY: currentPosition,
        useCORS: true, // Add this line to handle CORS issues with external resources
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      doc.addImage(imgData, 'JPEG', 0, 0);
      currentPosition += doc.internal.pageSize.getHeight();
      if (currentPosition < totalHeight) {
        doc.addPage();
      }
    }

    doc.save('scrollable_content.pdf');
  };


  return (
    <div ref={divToConvertRef} className="bg-blue-900 p-4 h-16 flex align-middle justify-between">
      <h1 className='text-2xl font-bold text-white'>JoulesLabs</h1>
      <div></div>
    </div>
  )
}
