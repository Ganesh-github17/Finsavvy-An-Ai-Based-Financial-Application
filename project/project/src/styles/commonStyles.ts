export const cardStyle = "bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300";
export const headerStyle = "text-2xl font-bold text-white mb-4";
export const inputStyle = "w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none";
export const buttonStyle = "px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all duration-300";
export const labelStyle = "text-gray-300 text-sm font-medium mb-2";
export const chartContainerStyle = "bg-gray-800 rounded-xl p-4 mt-4";

export const toolCardStyle = `
  ${cardStyle}
  flex flex-col
  min-h-[300px]
  hover:transform hover:scale-[1.02]
  border border-gray-700
`;

export const virtualBankCardStyle = `
  ${cardStyle}
  flex flex-col
  min-h-[200px]
  border-l-4 border-blue-500
`;

export const riskLevelIndicator = (level: 'low' | 'medium' | 'high') => {
  const colors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  };
  return `inline-block w-3 h-3 rounded-full ${colors[level]} mr-2`;
};
