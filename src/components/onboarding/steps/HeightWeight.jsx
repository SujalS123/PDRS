import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
} from '@mui/material';

const HeightWeight = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    height: initialData?.height || '',
    weight: initialData?.weight || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.height || !formData.weight) {
      return;
    }
    onNext(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Basic Information
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Please enter your height and weight to help us calculate your daily calorie needs.
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            label="Height (cm)"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Weight (kg)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={onBack} disabled={!onBack}>
          Back
        </Button>
        <Button 
          type="submit" 
          variant="contained"
          disabled={!formData.height || !formData.weight}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default HeightWeight; 