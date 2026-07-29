import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generatePdfFromElement(element, fileName = 'academic-calculator-result') {
  if (!element) return;

  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
  });

  const imageData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = (canvas.height * pageWidth) / canvas.width;

  pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight);
  pdf.save(`${fileName}.pdf`);
}
