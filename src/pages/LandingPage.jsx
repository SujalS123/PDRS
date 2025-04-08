import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const FoodBowl = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4CAF50" />
    </mesh>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h1" gutterBottom>
              Dieterium
            </Typography>
            <Typography variant="h4" color="text.secondary" paragraph>
              Your Personalized Diet Companion
            </Typography>
            <Typography variant="body1" paragraph>
              Track your nutrition, get personalized meal plans, and achieve your health goals with our AI-powered platform.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ height: '500px' }}
          >
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <FoodBowl />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage; 