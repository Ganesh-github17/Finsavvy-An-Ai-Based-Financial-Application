import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

interface ModulePage {
  id: string;
  title: string;
  content: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
}

const CourseModule = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<ModulePage[]>([]);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    // Fetch module pages
    const fetchPages = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}/modules/${moduleId}`);
        const data = await response.json();
        setPages(data.pages);
      } catch (error) {
        console.error('Error fetching module pages:', error);
      }
    };

    fetchPages();
  }, [courseId, moduleId]);

  useEffect(() => {
    // Timer for quiz
    let timer: NodeJS.Timeout;
    if (quizOpen && !quizSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizOpen, quizSubmitted, timeLeft]);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleStartQuiz = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/quiz`);
      const data = await response.json();
      setQuiz(data.questions);
      setQuizOpen(true);
      setTimeLeft(600); // Reset timer
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: parseInt(value),
    });
  };

  const handleSubmitQuiz = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          user_id: localStorage.getItem('userId'),
        }),
      });

      const data = await response.json();
      setQuizSubmitted(true);

      if (data.passed) {
        // Show certificate or redirect to certificate page
        navigate(`/certificate/${data.certificate_id}`);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <StyledContainer>
      <StyledPaper>
        {pages[currentPage] && (
          <>
            <Typography variant="h4" gutterBottom>
              {pages[currentPage].title}
            </Typography>
            <Typography variant="body1" paragraph>
              {pages[currentPage].content}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                variant="contained"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
              {currentPage === pages.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleStartQuiz}
                >
                  Take Quiz
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextPage}
                >
                  Next
                </Button>
              )}
            </Box>
          </>
        )}
      </StyledPaper>

      <Dialog open={quizOpen} maxWidth="md" fullWidth>
        <DialogTitle>
          Module Quiz
          <Typography variant="subtitle1" color="textSecondary">
            Time Remaining: {formatTime(timeLeft)}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(timeLeft / 600) * 100}
            sx={{ mt: 1 }}
          />
        </DialogTitle>
        <DialogContent>
          {quiz.map((question, index) => (
            <Box key={question.id} sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {index + 1}. {question.question}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                >
                  {question.options.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={optionIndex}
                      control={<Radio />}
                      label={option}
                      disabled={quizSubmitted || timeLeft === 0}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitQuiz}
            disabled={
              quizSubmitted ||
              timeLeft === 0 ||
              Object.keys(answers).length !== quiz.length
            }
          >
            Submit Quiz
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default CourseModule;
