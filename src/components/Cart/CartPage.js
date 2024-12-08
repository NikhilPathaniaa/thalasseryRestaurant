import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Grid,
  CardMedia,
  Divider,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Remove as RemoveIcon, 
  Delete as DeleteIcon,
  ShoppingBag as ShoppingBagIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Background animation component
const FloatingCircle = ({ delay }) => (
  <motion.div
    style={{
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 75, 58, 0.1)',
    }}
    animate={{
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
    }}
  />
);

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  if (cart.length === 0) {
    return (
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 8, 
          textAlign: 'center',
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }}>
          <FloatingCircle delay={0} style={{ width: 100, height: 100, top: '10%', left: '10%' }} />
          <FloatingCircle delay={1} style={{ width: 150, height: 150, top: '50%', right: '10%' }} />
          <FloatingCircle delay={2} style={{ width: 80, height: 80, bottom: '20%', left: '30%' }} />
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ShoppingBagIcon sx={{ fontSize: 100, color: 'rgba(0, 0, 0, 0.2)', mb: 2 }} />
          <Typography variant="h4" gutterBottom>Your cart is empty</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Add some delicious items to get started!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#FF4B3A',
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: '#E63B2A',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              }
            }}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Shopping
          </Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: 'relative' }}>
      <Box sx={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }}>
        <FloatingCircle delay={0} style={{ width: 100, height: 100, top: '10%', left: '10%' }} />
        <FloatingCircle delay={1} style={{ width: 150, height: 150, top: '50%', right: '10%' }} />
        <FloatingCircle delay={2} style={{ width: 80, height: 80, bottom: '20%', left: '30%' }} />
      </Box>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton 
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">Shopping Cart</Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <AnimatePresence>
              {cart.map((item) => (
                <Card 
                  key={item.id}
                  component={motion.div}
                  variants={itemVariants}
                  sx={{ 
                    mb: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
                      image={item.image}
                      alt={item.name}
                    />
                    <Box sx={{ flex: 1, ml: 2 }}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        ₹{item.price} each
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          size="small" 
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          component={motion.button}
                          whileTap={{ scale: 0.9 }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          component={motion.button}
                          whileTap={{ scale: 0.9 }}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => removeFromCart(item.id)}
                          sx={{ ml: 'auto', color: 'error.main' }}
                          component={motion.button}
                          whileTap={{ scale: 0.9 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </AnimatePresence>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card 
              component={motion.div}
              variants={itemVariants}
              sx={{ 
                position: 'sticky',
                top: 24,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                p: 3
              }}
            >
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" sx={{ mb: 3 }}>
                Total: ₹{getTotalPrice()}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/payment')}
                sx={{
                  backgroundColor: '#FF4B3A',
                  py: 1.5,
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: '#E63B2A',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  }
                }}
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/')}
                sx={{
                  mt: 2,
                  borderColor: '#FF4B3A',
                  color: '#FF4B3A',
                  borderRadius: '50px',
                  '&:hover': {
                    borderColor: '#E63B2A',
                    backgroundColor: 'rgba(255, 75, 58, 0.05)',
                  }
                }}
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Shopping
              </Button>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default CartPage;
