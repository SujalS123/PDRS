import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
} from '@mui/material';

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
  { value: 'lightly_active', label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
  { value: 'moderately_active', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
  { value: 'very_active', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
  { value: 'extra_active', label: 'Extra Active', description: 'Very hard exercise & physical job' },
];

const ActivityLevel = ({ onNext, onBack, initialData }) => {
  const [selectedActivity, setSelectedActivity] = useState(initialData?.activity_level || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedActivity) {
      return;
    }
    onNext({ activity_level: selectedActivity });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Activity Level
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Select your typical activity level to help us calculate your daily calorie needs.
      </Typography>

      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <RadioGroup
          aria-label="activity level"
          name="activity_level"
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
        >
          {activityLevels.map((level) => (
            <Card
              key={level.value}
              sx={{
                mb: 2,
                '&:hover': {
                  boxShadow: 3,
                },
                backgroundColor: selectedActivity === level.value ? 'action.selected' : 'background.paper',
              }}
            >
              <CardContent>
                <FormControlLabel
                  value={level.value}
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle1">{level.label}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {level.description}
                      </Typography>
                    </Box>
                  }
                  sx={{ width: '100%' }}
                />
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={onBack} disabled={!onBack}>
          Back
        </Button>
        <Button 
          type="submit" 
          variant="contained"
          disabled={!selectedActivity}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ActivityLevel; 