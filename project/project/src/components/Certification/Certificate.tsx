import React from 'react';
import { motion } from 'framer-motion';
import { Award, Download } from 'lucide-react';
import jsPDF from 'jspdf';

interface CertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  grade: string;
}

const Certificate: React.FC<CertificateProps> = ({
  studentName,
  courseName,
  completionDate,
  grade
}) => {
  const downloadCertificate = () => {
    const doc = new jsPDF();
    
    // Add certificate content
    doc.setFontSize(30);
    doc.text('Certificate of Completion', 105, 40, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text(`This is to certify that`, 105, 70, { align: 'center' });
    
    doc.setFontSize(24);
    doc.text(studentName, 105, 90, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text(`has successfully completed the course`, 105, 110, { align: 'center' });
    
    doc.setFontSize(20);
    doc.text(courseName, 105, 130, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(`Completion Date: ${completionDate}`, 105, 160, { align: 'center' });
    doc.text(`Grade Achieved: ${grade}`, 105, 170, { align: 'center' });
    
    // Save the PDF
    doc.save('certificate.pdf');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto"
    >
      <div className="text-center space-y-6">
        <Award className="w-16 h-16 text-blue-600 mx-auto" />
        
        <div>
          <h1 className="text-3xl font-bold mb-2">Certificate of Completion</h1>
          <p className="text-gray-600 dark:text-gray-400">This certifies that</p>
        </div>
        
        <p className="text-2xl font-semibold text-blue-600">{studentName}</p>
        
        <div>
          <p className="text-gray-600 dark:text-gray-400">has successfully completed the course</p>
          <h2 className="text-xl font-bold mt-2">{courseName}</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <p>Completion Date</p>
            <p className="font-semibold">{completionDate}</p>
          </div>
          <div>
            <p>Grade Achieved</p>
            <p className="font-semibold">{grade}</p>
          </div>
        </div>
        
        <button
          onClick={downloadCertificate}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download Certificate</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Certificate;