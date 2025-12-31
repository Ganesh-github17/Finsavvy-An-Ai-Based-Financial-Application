import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { supabase } from './config/supabaseClient';
import { useEffect, useState, createContext, useContext } from 'react';

// Pages
import Home from './pages/Home';
import Learning from './pages/Learning';
import Market from './pages/Market';
import AIChat from './pages/AIChat';
import Workshops from './pages/Workshops';
import Portfolio from './pages/Portfolio';
import Games from './pages/Games';
import Tools from './pages/Tools';
import Profile from './pages/Profile';
import VirtualBank from './pages/VirtualBank';
import About from './pages/About';

// Learning Components
import CourseLibrary from './components/LearningCenter/CourseLibrary';
import AILearningAssistant from './components/LearningCenter/AILearningAssistant';
import StudyGroups from './components/LearningCenter/StudyGroups';
import PracticeQuiz from './components/LearningCenter/PracticeQuiz';
import VideoLessons from './components/LearningCenter/VideoLessons';

// Tool Components
import SIPCalculator from './components/Tools/SIPCalculator';
import TaxCalculator from './components/Tools/TaxCalculator/TaxCalculator';
import RetirementPlanner from './components/Tools/RetirementPlanner/RetirementPlanner';
import BudgetPlanner from './components/Tools/BudgetPlanner';
import AIAdvisor from './components/Tools/AIAdvisor/AIAdvisor';
import StockPredictor from './components/Tools/StockPredictor/StockPredictor';
import TodoList from './components/Tools/TodoList';
import CreditScore from './components/Tools/CreditScore/CreditScore';
import EmergencyFund from './components/Tools/EmergencyFund/EmergencyFund';
import FinInternships from './components/Tools/FinInternships/FinInternships';

// Game Components
import MoneyMaze from './components/Games/MoneyMaze/MoneyMaze';
import BudgetHero from './components/Games/BudgetHero/BudgetHero';
import InvestmentSimulator from './components/Games/InvestmentSimulator/InvestmentSimulator';

// Bank Components
import BankAccounts from './components/Banking/BankAccounts';
import BankCards from './components/Banking/BankCards';
import BankTransactions from './components/Banking/BankTransactions';
import BankLoans from './components/Banking/BankLoans';
import BankInvestments from './components/Banking/BankInvestments';

const AuthContext = createContext<{ user: any; setUser: (u: any) => void }>({ user: null, setUser: () => {} });
export const useAuth = () => useContext(AuthContext);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    window.location.href = '/login';
    return null;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    return () => { listener.subscription.unsubscribe(); };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="flex h-screen bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/market" element={<Market />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
            <Route path="/internships" element={<ProtectedRoute><FinInternships /></ProtectedRoute>} />
            {/* Learning Routes */}
            <Route path="/learning/courses" element={<ProtectedRoute><CourseLibrary /></ProtectedRoute>} />
            <Route path="/learning/ai-tutor" element={<ProtectedRoute><AILearningAssistant /></ProtectedRoute>} />
            <Route path="/learning/groups" element={<ProtectedRoute><StudyGroups /></ProtectedRoute>} />
            <Route path="/learning/quizzes" element={<ProtectedRoute><PracticeQuiz /></ProtectedRoute>} />
            <Route path="/learning/videos" element={<ProtectedRoute><VideoLessons /></ProtectedRoute>} />
            {/* Virtual Bank Routes */}
            <Route path="/virtual-bank" element={<ProtectedRoute><VirtualBank /></ProtectedRoute>} />
            <Route path="/virtual-bank/accounts" element={<ProtectedRoute><BankAccounts /></ProtectedRoute>} />
            <Route path="/virtual-bank/cards" element={<ProtectedRoute><BankCards /></ProtectedRoute>} />
            <Route path="/virtual-bank/transactions" element={<ProtectedRoute><BankTransactions /></ProtectedRoute>} />
            <Route path="/virtual-bank/loans" element={<ProtectedRoute><BankLoans /></ProtectedRoute>} />
            <Route path="/virtual-bank/investments" element={<ProtectedRoute><BankInvestments /></ProtectedRoute>} />
            {/* Games Routes */}
            <Route path="/games" element={<Games />} />
            <Route path="/games/money-maze" element={<ProtectedRoute><MoneyMaze /></ProtectedRoute>} />
            <Route path="/games/budget-hero" element={<ProtectedRoute><BudgetHero /></ProtectedRoute>} />
            <Route path="/games/investment-simulator" element={<ProtectedRoute><InvestmentSimulator /></ProtectedRoute>} />
            {/* Tools Routes */}
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/sip-calculator" element={<ProtectedRoute><SIPCalculator /></ProtectedRoute>} />
            <Route path="/tools/tax-calculator" element={<ProtectedRoute><TaxCalculator /></ProtectedRoute>} />
            <Route path="/tools/retirement-planner" element={<ProtectedRoute><RetirementPlanner /></ProtectedRoute>} />
            <Route path="/tools/budget-planner" element={<ProtectedRoute><BudgetPlanner /></ProtectedRoute>} />
            <Route path="/tools/ai-advisor" element={<ProtectedRoute><AIAdvisor /></ProtectedRoute>} />
            <Route path="/tools/stock-predictor" element={<ProtectedRoute><StockPredictor /></ProtectedRoute>} />
            <Route path="/tools/todo-list" element={<ProtectedRoute><TodoList /></ProtectedRoute>} />
            <Route path="/tools/credit-score" element={<ProtectedRoute><CreditScore /></ProtectedRoute>} />
            <Route path="/tools/emergency-fund" element={<ProtectedRoute><EmergencyFund /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
