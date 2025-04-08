import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import {
  WelcomeIcon,
  NameIcon,
  AgeIcon,
  HeightWeightIcon,
  ActivityIcon,
  HealthIcon,
  DietIcon,
  WaterIcon,
  GoalIcon,
  SuccessIcon
} from './QuestionnaireIcons';

interface FormData {
  fullName: string;
  age: number;
  sex: string;
  height: number;
  weight: number;
  physicalActivity: string;
  healthConditions: string;
  dietaryPreferences: string[];
  waterIntake: string;
  healthGoals: string;
}

interface Question {
  id: keyof FormData;
  text: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea';
  options?: string[];
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: 'fullName',
    text: 'What is your full name?',
    type: 'text',
    placeholder: 'Enter your full name'
  },
  {
    id: 'age',
    text: 'What is your age?',
    type: 'number',
    placeholder: 'Enter your age'
  },
  {
    id: 'sex',
    text: 'What is your sex?',
    type: 'select',
    options: ['Male', 'Female', 'Other']
  },
  {
    id: 'height',
    text: 'What is your height? (in cm)',
    type: 'number',
    placeholder: 'Enter your height in cm'
  },
  {
    id: 'weight',
    text: 'What is your weight? (in kg)',
    type: 'number',
    placeholder: 'Enter your weight in kg'
  },
  {
    id: 'physicalActivity',
    text: 'What is your physical activity level?',
    type: 'select',
    options: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Super Active']
  },
  {
    id: 'healthConditions',
    text: 'Do you have any health conditions? (Optional)',
    type: 'textarea',
    placeholder: 'Enter any health conditions or leave blank if none'
  },
  {
    id: 'dietaryPreferences',
    text: 'What are your dietary preferences?',
    type: 'multiselect',
    options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Other']
  },
  {
    id: 'waterIntake',
    text: 'How much water do you drink per day?',
    type: 'select',
    options: ['Less than 1L', '1-2L', '2-3L', 'More than 3L']
  },
  {
    id: 'healthGoals',
    text: 'What are your health goals?',
    type: 'select',
    options: ['Weight Loss', 'Weight Gain', 'Maintain Weight', 'Build Muscle', 'Improve Endurance']
  }
];

const Questionnaire: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm<FormData>();

  const currentQuestion = questions[currentQuestionIndex];

  const validateCurrentQuestion = async () => {
    setValidationError(null);
    
    if (currentQuestion.type === 'multiselect') {
      const currentValue = watch(currentQuestion.id) as string[] || [];
      if (currentValue.length === 0) {
        setValidationError('Please select at least one option before continuing');
        return false;
      }
    } else if (currentQuestion.type === 'textarea') {
      // Textarea is optional, so no validation needed
      return true;
    } else {
      const fieldName = currentQuestion.id;
      const isValid = await trigger(fieldName);
      
      if (!isValid) {
        setValidationError(`Please fill in this field before continuing`);
        return false;
      }
    }
    
    return true;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentQuestion();
    
    if (isValid) {
      if (currentQuestionIndex < questions.length - 1) {
        setDirection(1);
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleSubmit(onSubmit)();
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(prev => prev - 1);
      setValidationError(null);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate successful form submission
      console.log('Form data submitted:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard on success
      navigate('/dashboard');
    } catch (error) {
      setValidationError('An error occurred. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const welcomeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const renderInput = () => {
    switch (currentQuestion.type) {
      case 'select':
        return (
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options?.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setValue(currentQuestion.id, option);
                  setValidationError(null);
                }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  watch(currentQuestion.id) === option
                    ? 'border-dietrium bg-dietrium-light text-dietrium-dark'
                    : 'border-gray-200 hover:border-dietrium'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      
      case 'multiselect':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options?.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  const currentValue = (watch(currentQuestion.id) as string[]) || [];
                  const newValue = currentValue.includes(option)
                    ? currentValue.filter((v: string) => v !== option)
                    : [...currentValue, option];
                  setValue(currentQuestion.id, newValue);
                  setValidationError(null);
                }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  ((watch(currentQuestion.id) as string[]) || []).includes(option)
                    ? 'border-dietrium bg-dietrium-light text-dietrium-dark'
                    : 'border-gray-200 hover:border-dietrium'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      
      case 'textarea':
        return (
          <textarea
            {...register(currentQuestion.id)}
            className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-dietrium-light outline-none transition-all duration-300 ${
              validationError ? 'border-red-500' : 'border-gray-200 focus:border-dietrium'
            }`}
            placeholder={currentQuestion.placeholder}
            rows={4}
            onChange={() => setValidationError(null)}
          />
        );
      
      default:
        return (
          <input
            type={currentQuestion.type}
            {...register(currentQuestion.id, { 
              required: true,
              validate: value => {
                if (currentQuestion.type === 'number') {
                  if (isNaN(Number(value)) || Number(value) <= 0) {
                    return `Please enter a valid ${currentQuestion.id}`;
                  }
                  
                  // Additional validation for specific fields
                  if (currentQuestion.id === 'age' && Number(value) > 120) {
                    return 'Please enter a valid age (less than 120)';
                  }
                  
                  if (currentQuestion.id === 'height' && Number(value) > 300) {
                    return 'Please enter a valid height in cm (less than 300)';
                  }
                  
                  if (currentQuestion.id === 'weight' && Number(value) > 500) {
                    return 'Please enter a valid weight in kg (less than 500)';
                  }
                }
                return true;
              }
            })}
            className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-dietrium-light outline-none transition-all duration-300 ${
              validationError ? 'border-red-500' : 'border-gray-200 focus:border-dietrium'
            }`}
            placeholder={currentQuestion.placeholder}
            onChange={() => setValidationError(null)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-dietrium h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        {showWelcome ? (
          <motion.div
            key="welcome"
            variants={welcomeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-dietrium mb-4">Welcome to Dietrium</h1>
            <p className="text-gray-600">Let's get to know you better to create your personalized plan.</p>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? 100 : -100 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900">{currentQuestion.text}</h2>
            {renderInput()}
            
            {validationError && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-2"
              >
                {validationError}
              </motion.p>
            )}
          </motion.div>
        )}

        {!showWelcome && (
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                currentQuestionIndex === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-dietrium hover:bg-dietrium-light'
              }`}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-dietrium text-white rounded-lg hover:bg-dietrium-dark transition-all duration-300"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire; 