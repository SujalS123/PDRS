import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
} from '@mui/material';

const dietOptions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'gluten_free', label: 'Gluten-Free' },
  { value: 'dairy_free', label: 'Dairy-Free' },
];

const allergyOptions = [
  { value: 'nuts', label: 'Nuts' },
  { value: 'shellfish', label: 'Shellfish' },
  { value: 'eggs', label: 'Eggs' },
  { value: 'soy', label: 'Soy' },
  { value: 'wheat', label: 'Wheat' },
];

const cuisineOptions = [
  { value: 'indian', label: 'Indian' },
  { value: 'italian', label: 'Italian' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'mediterranean', label: 'Mediterranean' },
];

const DietPreferences = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    dietaryRestrictions: initialData?.dietaryRestrictions || [],
    allergies: initialData?.allergies || [],
    favoriteCuisines: initialData?.favoriteCuisines || [],
  });

  const handleChange = (category) => (event) => {
    const { value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Diet Preferences
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Tell us about your dietary preferences and restrictions.
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Dietary Restrictions
          </Typography>
          <FormGroup>
            {dietOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={formData.dietaryRestrictions.includes(option.value)}
                    onChange={handleChange('dietaryRestrictions')}
                    value={option.value}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Allergies
          </Typography>
          <FormGroup>
            {allergyOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={formData.allergies.includes(option.value)}
                    onChange={handleChange('allergies')}
                    value={option.value}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Favorite Cuisines
          </Typography>
          <FormGroup>
            {cuisineOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={formData.favoriteCuisines.includes(option.value)}
                    onChange={handleChange('favoriteCuisines')}
                    value={option.value}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={onBack} disabled={!onBack}>
          Back
        </Button>
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default DietPreferences; 