import { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';

// Set the worker source for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface PdfUploadReturnType {
  imagesData: string[];
}

const usePdfUpload = (url: string): PdfUploadReturnType => {
  const [imagesData, setImages] = useState<string[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    urlUploader(url);
  }, [url]);

  const setUrl = () => {
    setPdfUrl(pdfUrl);
  };

  const urlUploader = (url: string) => {
    url && fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = atob((e.target!.result as string).replace(/.*base64,/, ''));
          renderPage(data);
        };
        reader.readAsDataURL(blob);
      });
  };

  const renderPage = async (data: string) => {
    const pdf = await pdfjs.getDocument({ data }).promise;
    const imagesArray: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext: any = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport,
      };
      await page.render(renderContext).promise;
      const img = canvas.toDataURL('image/png');
      imagesArray.push(img);
    }
    setImages(imagesArray);
  };

  return { imagesData };
};

export default usePdfUpload;
