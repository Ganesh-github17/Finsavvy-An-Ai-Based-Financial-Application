import React from 'react';
import { motion } from 'framer-motion';
import { Award, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface CertificateProps {
  userName: string;
  courseName: string;
  completionDate: string;
  score: number;
}

const Certificate: React.FC<CertificateProps> = ({
  userName,
  courseName,
  completionDate,
  score,
}) => {
  const generateCertificate = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [800, 600]
    });

    // Add certificate styling
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 800, 600, 'F');
    
    // Add border
    doc.setDrawColor(0, 100, 200);
    doc.setLineWidth(5);
    doc.rect(20, 20, 760, 560);

    // Add header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(40);
    doc.setTextColor(0, 100, 200);
    doc.text('Certificate of Completion', 400, 100, { align: 'center' });

    // Add content
    doc.setFontSize(24);
    doc.setTextColor(60, 60, 60);
    doc.text('This is to certify that', 400, 200, { align: 'center' });
    
    doc.setFontSize(32);
    doc.setTextColor(0, 0, 0);
    doc.text(userName, 400, 250, { align: 'center' });

    doc.setFontSize(24);
    doc.setTextColor(60, 60, 60);
    doc.text('has successfully completed the course', 400, 300, { align: 'center' });

    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);
    doc.text(courseName, 400, 350, { align: 'center' });

    doc.setFontSize(20);
    doc.setTextColor(60, 60, 60);
    doc.text(`with a score of ${score}%`, 400, 400, { align: 'center' });
    doc.text(`Completed on ${new Date(completionDate).toLocaleDateString()}`, 400, 440, { align: 'center' });

    // Save the PDF
    doc.save(`${userName.replace(' ', '_')}_${courseName.replace(' ', '_')}_Certificate.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-8 border border-blue-100"
    >
      <div className="text-center mb-6">
        <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800">Certificate of Completion</h2>
      </div>

      <div className="space-y-4 text-center">
        <p className="text-xl">This is to certify that</p>
        <p className="text-2xl font-bold text-blue-600">{userName}</p>
        <p className="text-xl">has successfully completed</p>
        <p className="text-2xl font-bold">{courseName}</p>
        <p className="text-lg">
          with a score of <span className="font-bold text-green-600">{score}%</span>
        </p>
        <p className="text-gray-600">Completed on {new Date(completionDate).toLocaleDateString()}</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generateCertificate}
        className="mt-8 mx-auto flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Download className="w-5 h-5" />
        Download Certificate
      </motion.button>
    </motion.div>
  );
};

export default Certificate;
