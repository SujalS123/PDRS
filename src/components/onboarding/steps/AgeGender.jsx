import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const schema = yup.object().shape({
  age: yup
    .number()
    .required('Age is required')
    .min(13, 'You must be at least 13 years old')
    .max(120, 'Please enter a valid age'),
  gender: yup.string().required('Gender is required'),
});

const AgeGender = ({ onNext, onBack, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom>
        Personal Details
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Help us personalize your experience by providing some basic information.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Age"
            type="number"
            {...register('age')}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.gender}>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              {...register('gender')}
              defaultValue=""
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
            </Select>
            {errors.gender && (
              <Typography color="error" variant="caption">
                {errors.gender.message}
              </Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>

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

export default AgeGender; 