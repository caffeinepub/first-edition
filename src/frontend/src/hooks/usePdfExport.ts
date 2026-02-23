import { useState } from 'react';
import { ProjectData } from '../contexts/ProjectContext';
import { toast } from 'sonner';

export function usePdfExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPdf = async (project: ProjectData) => {
    setIsExporting(true);
    try {
      // Create a new window with the story content formatted for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Please allow pop-ups to export PDF');
      }

      // Build HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>${project.title}</title>
            <style>
              @page {
                margin: 1in;
              }
              body {
                font-family: Georgia, 'Times New Roman', serif;
                line-height: 1.6;
                color: #000;
                max-width: 8.5in;
                margin: 0 auto;
                padding: 20px;
              }
              h1 {
                text-align: center;
                font-size: 28pt;
                margin-bottom: 10px;
                color: #333;
              }
              .subtitle {
                text-align: center;
                font-size: 12pt;
                color: #666;
                margin-bottom: 40px;
                border-bottom: 2px solid #333;
                padding-bottom: 20px;
              }
              p {
                font-size: 12pt;
                margin-bottom: 16px;
                text-align: justify;
              }
              .images-section {
                margin-top: 40px;
                border-top: 2px solid #333;
                padding-top: 20px;
              }
              .images-section h2 {
                font-size: 18pt;
                margin-bottom: 20px;
              }
              .image-container {
                margin-bottom: 30px;
                page-break-inside: avoid;
              }
              .image-container img {
                max-width: 100%;
                height: auto;
                display: block;
                margin: 0 auto 10px;
              }
              .image-caption {
                font-size: 10pt;
                font-style: italic;
                color: #666;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <h1>${escapeHtml(project.title)}</h1>
            <div class="subtitle">A novella by a Grade 4 Author</div>
            ${project.storyText
              .split('\n\n')
              .map((para) => `<p>${escapeHtml(para)}</p>`)
              .join('')}
            ${
              project.selectedImages.length > 0
                ? `
              <div class="images-section">
                <h2>Story Illustrations</h2>
                ${project.selectedImages
                  .map(
                    (img) => `
                  <div class="image-container">
                    <img src="${img.url}" alt="${escapeHtml(img.prompt)}" />
                    <div class="image-caption">${escapeHtml(img.prompt)}</div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            `
                : ''
            }
          </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Wait for images to load before printing
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          setIsExporting(false);
        }, 500);
      };

      toast.success('Print dialog opened!', {
        description: 'Use "Save as PDF" in the print dialog to export your novella.',
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Export failed', {
        description: error instanceof Error ? error.message : 'There was an error creating your PDF.',
      });
      setIsExporting(false);
    }
  };

  return { exportToPdf, isExporting };
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
