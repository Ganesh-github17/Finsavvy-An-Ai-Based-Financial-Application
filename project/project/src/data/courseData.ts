export interface Module {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  duration: string;
  quiz: {
    questions: {
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: Module[];
}

export const courses: Course[] = [
  {
    id: 'fin-101',
    title: 'Introduction to Financial Markets',
    description: 'Learn the basics of financial markets, including stocks, bonds, and market analysis.',
    level: 'Beginner',
    duration: '4 weeks',
    modules: [
      {
        id: 'fin-101-m1',
        title: 'Understanding Stock Markets',
        content: `
          In this module, you'll learn about:
          - What are stocks and how they work
          - Different types of stock markets
          - How to read stock quotes and charts
          - Basic market indicators
          - The role of stock exchanges
        `,
        duration: '45 minutes',
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is a stock?',
              options: [
                'A type of bond',
                'A share of ownership in a company',
                'A government security',
                'A type of cryptocurrency'
              ],
              correctAnswer: 1
            },
            {
              id: 'q2',
              question: 'Which of these is a major stock exchange?',
              options: [
                'Federal Reserve',
                'World Bank',
                'New York Stock Exchange',
                'International Monetary Fund'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'fin-101-m2',
        title: 'Introduction to Bonds',
        content: `
          This module covers:
          - What are bonds and their characteristics
          - Types of bonds (government, corporate, municipal)
          - Understanding bond yields
          - Bond ratings and risk assessment
          - How interest rates affect bond prices
        `,
        duration: '40 minutes',
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What happens to bond prices when interest rates rise?',
              options: [
                'They increase',
                'They decrease',
                'They stay the same',
                'It depends on the type of bond'
              ],
              correctAnswer: 1
            },
            {
              id: 'q2',
              question: 'Which type of bonds are typically considered the safest?',
              options: [
                'Corporate bonds',
                'Municipal bonds',
                'Government bonds',
                'Junk bonds'
              ],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  },
  {
    id: 'fin-201',
    title: 'Investment Strategies',
    description: 'Learn various investment strategies and portfolio management techniques.',
    level: 'Intermediate',
    duration: '6 weeks',
    modules: [
      {
        id: 'fin-201-m1',
        title: 'Portfolio Diversification',
        content: `
          Learn about:
          - The importance of diversification
          - Asset allocation strategies
          - Risk management techniques
          - Correlation between different assets
          - Building a balanced portfolio
        `,
        duration: '50 minutes',
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the main benefit of diversification?',
              options: [
                'Guaranteed returns',
                'Risk reduction',
                'Higher returns',
                'Lower taxes'
              ],
              correctAnswer: 1
            },
            {
              id: 'q2',
              question: 'Which of these is NOT a common asset class?',
              options: [
                'Stocks',
                'Bonds',
                'Social media followers',
                'Real estate'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'fin-201-m2',
        title: 'Technical Analysis',
        content: `
          This module explores:
          - Chart patterns and trends
          - Technical indicators
          - Volume analysis
          - Support and resistance levels
          - Moving averages
        `,
        duration: '55 minutes',
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is a moving average used for?',
              options: [
                'Predicting market crashes',
                'Smoothing price data to identify trends',
                'Calculating dividends',
                'Managing portfolio risk'
              ],
              correctAnswer: 1
            },
            {
              id: 'q2',
              question: 'What does high trading volume typically indicate?',
              options: [
                'Low market interest',
                'Market manipulation',
                'Strong price movement',
                'Market holiday'
              ],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  }
];
