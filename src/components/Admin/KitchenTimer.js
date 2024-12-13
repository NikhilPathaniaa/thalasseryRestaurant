import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AlarmIcon from '@mui/icons-material/Alarm';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { motion, AnimatePresence } from 'framer-motion';

const TimerWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: 120,
  height: 120,
}));

const TimeDisplay = styled(Typography)(({ theme, warning }) => ({
  position: 'absolute',
  color: warning ? theme.palette.error.main : theme.palette.text.primary,
  transition: 'color 0.3s ease',
}));

const KitchenTimer = ({ orderId, initialTime = 900 }) => { // 15 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime === 0) {
            setShowAlert(true);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTime(initialTime);
    setIsRunning(true);
    setShowAlert(false);
  };

  const progress = (time / initialTime) * 100;
  const isWarning = time < 300; // Warning when less than 5 minutes remaining

  return (
    <>
      <TimerWrapper>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={100}
          thickness={4}
          sx={{
            color: isWarning ? 'error.main' : 'primary.main',
            transition: 'color 0.3s ease',
          }}
        />
        <TimeDisplay variant="h6" warning={isWarning}>
          {formatTime(time)}
        </TimeDisplay>
      </TimerWrapper>
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
        <IconButton
          size="small"
          onClick={() => setIsRunning(!isRunning)}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton
          size="small"
          onClick={handleReset}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <RestartAltIcon />
        </IconButton>
      </Box>

      <Dialog
        open={showAlert}
        onClose={() => setShowAlert(false)}
        PaperComponent={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <DialogTitle sx={{ bgcolor: 'error.main', color: 'white' }}>
          Time's Up!
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography>
            The timer for Order #{orderId} has finished. Please check the order status.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAlert(false)}>Dismiss</Button>
          <Button onClick={handleReset} variant="contained" color="primary">
            Reset Timer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default KitchenTimer;
