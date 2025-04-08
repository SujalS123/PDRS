import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const schema = yup.object().shape({
  goal: yup.string().required('Goal is required'),
  targetWeight: yup
    .number()
    .required('Target weight is required')
    .min(30, 'Weight must be at least 30kg')
    .max(300, 'Weight must be at most 300kg'),
  targetCalories: yup
    .number()
    .required('Target calories is required')
    .min(1000, 'Calories must be at least 1000')
    .max(5000, 'Calories must be at most 5000'),
  timeline: yup.string().required('Timeline is required'),
});

const Goals = ({ onNext, onBack, initialData }) => {
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
        Your Goals
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Set your health and fitness goals to help us create a personalized plan.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <FormControl fullWidth error={!!errors.goal}>
                <InputLabel>Primary Goal</InputLabel>
                <Select
                  label="Primary Goal"
                  {...register('goal')}
                  defaultValue=""
                >
                  <MenuItem value="weight_loss">Weight Loss</MenuItem>
                  <MenuItem value="muscle_gain">Muscle Gain</MenuItem>
                  <MenuItem value="maintenance">Maintain Weight</MenuItem>
                  <MenuItem value="improve_health">Improve Health</MenuItem>
                </Select>
                {errors.goal && (
                  <Typography color="error" variant="caption">
                    {errors.goal.message}
                  </Typography>
                )}
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <TextField
                fullWidth
                label="Target Weight (kg)"
                type="number"
                {...register('targetWeight')}
                error={!!errors.targetWeight}
                helperText={errors.targetWeight?.message}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <TextField
                fullWidth
                label="Daily Calorie Target"
                type="number"
                {...register('targetCalories')}
                error={!!errors.targetCalories}
                helperText={errors.targetCalories?.message}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <FormControl fullWidth error={!!errors.timeline}>
                <InputLabel>Timeline</InputLabel>
                <Select
                  label="Timeline"
                  {...register('timeline')}
                  defaultValue=""
                >
                  <MenuItem value="1_month">1 Month</MenuItem>
                  <MenuItem value="3_months">3 Months</MenuItem>
                  <MenuItem value="6_months">6 Months</MenuItem>
                  <MenuItem value="1_year">1 Year</MenuItem>
                </Select>
                {errors.timeline && (
                  <Typography color="error" variant="caption">
                    {errors.timeline.message}
                  </Typography>
                )}
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={onBack} disabled={!onBack}>
          Back
        </Button>
        <Button type="submit" variant="contained">
          Complete Setup
        </Button>
      </Box>
    </Box>
  );
};

export default Goals; 