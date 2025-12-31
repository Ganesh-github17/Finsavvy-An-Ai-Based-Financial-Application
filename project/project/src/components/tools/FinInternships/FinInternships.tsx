import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Search, 
  Filter,
  X,
  CheckCircle,
  ListChecks
} from 'lucide-react';

interface Internship {
  id: string;
  company: string;
  position: string;
  location: string;
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  type: 'remote' | 'hybrid' | 'onsite';
  deadline: string;
  applyLink: string;
}

const sampleInternships: Internship[] = [
  {
    id: '1',
    company: 'Goldman Sachs',
    position: 'Investment Banking Intern',
    location: 'New York, NY',
    duration: '10 weeks',
    stipend: '$8,000/month',
    description: 'Join our Investment Banking division for a summer internship program. Work on live deals, learn financial modeling, and gain hands-on experience in M&A and capital markets transactions.',
    requirements: ['Currently pursuing Bachelor\'s/Master\'s in Finance', 'Strong analytical skills', 'Excel proficiency'],
    type: 'onsite',
    deadline: '2024-05-15',
    applyLink: 'https://careers.goldmansachs.com/'
  },
  {
    id: '2',
    company: 'JPMorgan Chase',
    position: 'Financial Analysis Intern',
    location: 'London, UK',
    duration: '12 weeks',
    stipend: '£7,000/month',
    description: 'Work with our Financial Analysis team to develop market insights, perform company valuations, and support key investment decisions.',
    requirements: ['Finance or Economics major', 'Strong mathematical background', 'Python knowledge'],
    type: 'hybrid',
    deadline: '2024-05-20',
    applyLink: 'https://careers.jpmorgan.com/'
  },
  {
    id: '3',
    company: 'Morgan Stanley',
    position: 'Quantitative Trading Intern',
    location: 'Singapore',
    duration: '16 weeks',
    stipend: 'SGD 6,000/month',
    description: 'Join our Quantitative Trading team to develop trading strategies, implement algorithms, and analyze market data using cutting-edge technologies.',
    requirements: ['Strong programming skills', 'Statistics/Mathematics background', 'Machine Learning knowledge'],
    type: 'remote',
    deadline: '2024-06-01',
    applyLink: 'https://www.morganstanley.com/careers'
  },
  {
    id: '4',
    company: 'BlackRock',
    position: 'Portfolio Management Intern',
    location: 'San Francisco, CA',
    duration: '14 weeks',
    stipend: '$7,500/month',
    description: 'Work with our portfolio management team on investment strategies, risk analysis, and portfolio optimization using BlackRock\'s proprietary tools.',
    requirements: ['Finance/Economics major', 'Investment analysis skills', 'Bloomberg Terminal knowledge'],
    type: 'hybrid',
    deadline: '2024-05-30',
    applyLink: 'https://careers.blackrock.com/'
  }
];

const ApplicationModal: React.FC<{
  internship: Internship | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (internship: Internship) => void;
}> = ({ internship, isOpen, onClose, onApply }) => {
  if (!internship) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-[#252b3b] rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#4a9eff] mb-2">{internship.position}</h3>
                <div className="flex items-center text-gray-300 mb-2">
                  <Building2 size={18} className="mr-2" />
                  {internship.company}
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full text-sm bg-[#1a1f2e] text-[#4a9eff] border border-[#4a9eff]">
                    {internship.type}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-[#1a1f2e] text-[#4a9eff] border border-[#4a9eff]">
                    {internship.duration}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-[#1a1f2e] text-[#4a9eff] border border-[#4a9eff]">
                    {internship.stipend}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                  <CheckCircle size={20} className="mr-2 text-[#4a9eff]" />
                  Description
                </h4>
                <p className="text-gray-300">{internship.description}</p>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                  <ListChecks size={20} className="mr-2 text-[#4a9eff]" />
                  Requirements
                </h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {internship.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Application deadline */}
              <div className="mb-6">
                <div className="flex items-center text-gray-300">
                  <Calendar size={18} className="mr-2 text-[#4a9eff]" />
                  Application Deadline: {internship.deadline}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => onApply(internship)}
                  className="flex-1 py-3 px-4 bg-[#4a9eff] hover:bg-[#2f80e0] text-white font-semibold rounded-lg 
                    flex items-center justify-center gap-2 transition-all duration-300"
                >
                  Proceed to Application
                  <ExternalLink size={18} />
                </button>
                <button
                  onClick={onClose}
                  className="py-3 px-6 border border-[#4a9eff] text-[#4a9eff] hover:bg-[#4a9eff] hover:text-white 
                    font-semibold rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const FinInternships: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'remote' | 'hybrid' | 'onsite'>('all');
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredInternships = sampleInternships.filter(internship => {
    const matchesSearch = internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || internship.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleApply = (internship: Internship) => {
    try {
      // Check if URL is valid
      new URL(internship.applyLink);
      
      // Open in new tab with proper security attributes
      const newWindow = window.open(
        internship.applyLink,
        '_blank',
        'noopener,noreferrer'
      );

      // Fallback if window.open is blocked
      if (newWindow === null) {
        alert('Please allow popups to access the application page');
      }

      // Close modal only if window opened successfully
      if (newWindow !== null) {
        setIsModalOpen(false);
      }
    } catch (error) {
      alert('Sorry, the application link appears to be invalid. Please try again later or contact support.');
    }
  };

  const handleApplyClick = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#4a9eff] mb-4">
            Financial Internships
          </h1>
          <p className="text-lg text-gray-300">
            Discover and apply for internships in the financial sector
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by company or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#252b3b] border border-[#2f3649] text-gray-200 
                placeholder-gray-400 focus:ring-2 focus:ring-[#4a9eff] focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-3 rounded-lg bg-[#252b3b] border border-[#2f3649] text-gray-200 
                focus:ring-2 focus:ring-[#4a9eff] focus:border-transparent cursor-pointer transition-all duration-300"
            >
              <option value="all">All Types</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="bg-[#252b3b] rounded-xl shadow-lg overflow-hidden border border-[#2f3649] 
                hover:shadow-2xl hover:border-[#4a9eff] transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#4a9eff] mb-1 group-hover:text-[#6ab0ff]">
                      {internship.position}
                    </h3>
                    <div className="flex items-center text-gray-300">
                      <Building2 size={16} className="mr-1" />
                      {internship.company}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${internship.type === 'remote' ? 'bg-[#252b3b] text-[#4a9eff] border border-[#4a9eff]' :
                      internship.type === 'hybrid' ? 'bg-[#252b3b] text-[#4a9eff] border border-[#4a9eff]' :
                      'bg-[#252b3b] text-[#4a9eff] border border-[#4a9eff]'}`}>
                    {internship.type.charAt(0).toUpperCase() + internship.type.slice(1)}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-300">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    {internship.location}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    {internship.duration}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Briefcase size={16} className="mr-2 text-gray-400" />
                    {internship.stipend}
                  </div>
                </div>

                <div className="border-t border-[#2f3649] pt-4 mt-4">
                  <button 
                    onClick={() => handleApplyClick(internship)}
                    className="w-full py-2 px-4 bg-[#4a9eff] hover:bg-[#2f80e0] text-white font-semibold rounded-lg 
                      flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02]
                      focus:outline-none focus:ring-2 focus:ring-[#4a9eff] focus:ring-opacity-50"
                  >
                    Apply Now
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Application Modal */}
        <ApplicationModal
          internship={selectedInternship}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onApply={handleApply}
        />

        {/* Add a hidden link for testing */}
        <div className="hidden">
          <a 
            href="https://careers.goldmansachs.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            id="test-link"
          >
            Test Link
          </a>
        </div>
      </div>
    </div>
  );
};

export default FinInternships; 