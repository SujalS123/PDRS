import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Dieterium
        </Typography>
        
        <Grid container spacing={3}>
          {/* Daily Summary Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Today's Summary
                </Typography>
                <Typography variant="body1">
                  Calories: 0/2000 kcal
                </Typography>
                <Typography variant="body1">
                  Protein: 0/150g
                </Typography>
                <Typography variant="body1">
                  Carbs: 0/250g
                </Typography>
                <Typography variant="body1">
                  Fat: 0/70g
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button variant="contained" onClick={() => navigate('/meal-plan')}>
                    View Meal Plan
                  </Button>
                  <Button variant="contained" onClick={() => navigate('/recipes')}>
                    Browse Recipes
                  </Button>
                  <Button variant="contained" onClick={() => navigate('/profile')}>
                    Update Profile
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity Card */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  No recent activity to display
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 