import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/api';
import HeightWeight from './steps/HeightWeight';
import AgeGender from './steps/AgeGender';
import ActivityLevel from './steps/ActivityLevel';
import DietPreferences from './steps/DietPreferences';
import Goals from './steps/Goals';

const steps = [
  { label: 'Basic Info', component: HeightWeight },
  { label: 'Personal Details', component: AgeGender },
  { label: 'Activity Level', component: ActivityLevel },
  { label: 'Diet Preferences', component: DietPreferences },
  { label: 'Goals', component: Goals },
];

const OnboardingFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNext = (data) => {
    console.log('Received data:', data); // Debug log
    setFormData((prevData) => ({ ...prevData, ...data }));
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting form data:', formData); // Debug log
      await userService.updateProfile(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {React.createElement(steps[activeStep].component, {
            onNext: handleNext,
            onBack: activeStep > 0 ? handleBack : null,
            initialData: formData,
          })}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default OnboardingFlow; 