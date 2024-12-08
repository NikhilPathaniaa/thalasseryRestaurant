import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Tabs, 
  Tab,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Tooltip,
  Paper,
  Stack,
  Link,
  Skeleton
} from '@mui/material';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { keyframes } from '@emotion/react';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import GrassIcon from '@mui/icons-material/Grass';
import SetMealIcon from '@mui/icons-material/SetMeal';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import CakeIcon from '@mui/icons-material/Cake';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CheckIcon from '@mui/icons-material/Check';

import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Mock data for food items
const foodItems = [
  // Kerala Cuisine
  { 
    id: 1, 
    name: 'Kerala Biriyani', 
    type: 'non-veg', 
    region: 'kerala',
    price: 250, 
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80',
    description: 'Aromatic rice with spices and tender meat'
  },
  { 
    id: 2, 
    name: 'Fish Curry', 
    type: 'non-veg',
    region: 'kerala', 
    price: 180, 
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&q=80',
    description: 'Traditional Kerala style fish curry'
  },
  // North Indian
  { 
    id: 3, 
    name: 'Butter Chicken', 
    type: 'non-veg',
    region: 'north', 
    price: 280, 
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80',
    description: 'Creamy tomato-based curry with tender chicken'
  },
  { 
    id: 4, 
    name: 'Dal Makhani', 
    type: 'veg',
    region: 'north', 
    price: 160, 
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80',
    description: 'Creamy black lentils cooked overnight'
  },
  // Gujarati
  { 
    id: 5, 
    name: 'Dhokla', 
    type: 'veg',
    region: 'gujarat', 
    price: 120, 
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80',
    description: 'Steamed fermented rice and chickpea cake'
  },
  { 
    id: 6, 
    name: 'Undhiyu', 
    type: 'veg',
    region: 'gujarat', 
    price: 220, 
    image: 'https://images.pexels.com/photos/9797029/pexels-photo-9797029.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Mixed vegetable curry, Gujarati specialty'
  },
  // Rajasthani
  { 
    id: 7, 
    name: 'Laal Maas', 
    type: 'non-veg',
    region: 'rajasthan', 
    price: 320, 
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Spicy mutton curry with red chilies'
  },
  { 
    id: 8, 
    name: 'Dal Baati', 
    type: 'veg',
    region: 'rajasthan', 
    price: 180, 
    image: 'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Baked wheat balls served with lentils'
  },
  // Bihari
  { 
    id: 9, 
    name: 'Litti Chokha', 
    type: 'veg',
    region: 'bihar', 
    price: 150, 
    image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Wheat balls with spiced mashed potatoes'
  },
  { 
    id: 10, 
    name: 'Bihari Kebab', 
    type: 'non-veg',
    region: 'bihar', 
    price: 280, 
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Spiced meat patties, Bihar style'
  },
  // Himachal
  { 
    id: 11, 
    name: 'Dham', 
    type: 'veg',
    region: 'himachal', 
    price: 250, 
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Traditional Himachali festive meal'
  },
  { 
    id: 12, 
    name: 'Chha Gosht', 
    type: 'non-veg',
    region: 'himachal', 
    price: 300, 
    image: 'https://images.pexels.com/photos/7625318/pexels-photo-7625318.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Slow-cooked lamb in yogurt gravy'
  },
  // Chinese Items
  {
    id: 13,
    name: 'Kung Pao Chicken',
    type: 'chinese',
    price: 280,
    image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Spicy stir-fried chicken with peanuts'
  },
  {
    id: 14,
    name: 'Veg Hakka Noodles',
    type: 'chinese',
    price: 180,
    image: 'https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Stir-fried noodles with vegetables'
  },
  // Snacks
  {
    id: 15,
    name: 'Samosa',
    type: 'snacks',
    price: 40,
    image: 'https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Crispy pastry with spiced potato filling'
  },
  {
    id: 16,
    name: 'Vada Pav',
    type: 'snacks',
    price: 50,
    image: 'https://images.pexels.com/photos/8992923/pexels-photo-8992923.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Spiced potato fritter in a bun'
  },
  // Ice Creams
  {
    id: 17,
    name: 'Kulfi Falooda',
    type: 'dessert',
    price: 120,
    image: 'https://images.pexels.com/photos/3625372/pexels-photo-3625372.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Traditional Indian ice cream with falooda'
  },
  {
    id: 18,
    name: 'Chocolate Sundae',
    type: 'dessert',
    price: 150,
    image: 'https://images.pexels.com/photos/3631/summer-dessert-sweet-ice-cream.jpg?auto=compress&cs=tinysrgb&w=400',
    description: 'Rich chocolate ice cream with toppings'
  },
  {
    id: 19,
    name: 'Butterscotch Ice Cream',
    type: 'dessert',
    price: 130,
    image: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Creamy butterscotch flavored ice cream'
  },
  {
    id: 20,
    name: 'Mango Ice Cream',
    type: 'dessert',
    price: 140,
    image: 'https://images.pexels.com/photos/1332267/pexels-photo-1332267.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh mango flavored ice cream'
  },
  // Sweets
  {
    id: 21,
    name: 'Gulab Jamun',
    type: 'sweets',
    price: 60,
    image: 'https://static.toiimg.com/thumb/63799510.cms?imgsize=1091643&width=800&height=800',
    description: 'Deep-fried milk solids in sugar syrup'
  },
  {
    id: 22,
    name: 'Rasgulla',
    type: 'sweets',
    price: 50,
    image: 'https://static.toiimg.com/thumb/52743612.cms?imgsize=134181&width=800&height=800',
    description: 'Soft cheese balls in sugar syrup'
  },
  {
    id: 23,
    name: 'Kaju Katli',
    type: 'sweets',
    price: 800,
    image: 'https://static.toiimg.com/thumb/53097626.cms?imgsize=164187&width=800&height=800',
    description: 'Diamond-shaped cashew fudge'
  },
  {
    id: 24,
    name: 'Mysore Pak',
    type: 'sweets',
    price: 400,
    image: 'https://static.toiimg.com/thumb/87304967.cms?imgsize=106794&width=800&height=800',
    description: 'Traditional ghee-based sweet'
  },
  {
    id: 25,
    name: 'Jalebi',
    type: 'sweets',
    price: 200,
    image: 'https://static.toiimg.com/thumb/53099699.cms?imgsize=328279&width=800&height=800',
    description: 'Crispy, syrup-soaked spirals'
  },
  {
    id: 26,
    name: 'Butter Chicken',
    type: 'non-veg',
    price: 340,
    image: 'https://static.toiimg.com/thumb/53205522.cms?imgsize=302803&width=800&height=800',
    description: 'Tender chicken in rich tomato-butter gravy'
  },
  {
    id: 27,
    name: 'Malai Kofta',
    type: 'veg',
    price: 280,
    image: 'https://static.toiimg.com/thumb/52716603.cms?imgsize=142050&width=800&height=800',
    description: 'Soft paneer dumplings in creamy gravy'
  },
  {
    id: 28,
    name: 'Hyderabadi Biryani',
    type: 'non-veg',
    price: 360,
    image: 'https://static.toiimg.com/thumb/54308405.cms?imgsize=510571&width=800&height=800',
    description: 'Aromatic rice layered with spiced meat'
  },
];

// Update the beverages data with better images
const beverages = [
  { 
    id: 1, 
    name: 'Kerala Coffee', 
    price: 40, 
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Traditional filter coffee'
  },
  { 
    id: 2, 
    name: 'Masala Chai', 
    price: 30, 
    image: 'https://images.pexels.com/photos/5946975/pexels-photo-5946975.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Spiced Indian tea'
  },
  { 
    id: 3, 
    name: 'Mango Lassi', 
    price: 50, 
    image: 'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Sweet yogurt-based drink'
  },
  { 
    id: 4, 
    name: 'Thandai', 
    price: 60, 
    image: 'https://images.pexels.com/photos/6413705/pexels-photo-6413705.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Spiced milk drink with nuts'
  }
];

const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-20px) }
  100% { transform: translateY(0px) }
`;

const rotate = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const backgroundVariants = {
  animate: {
    background: [
      'linear-gradient(45deg, #FF4B3A11 0%, #FF8F6B22 100%)',
      'linear-gradient(45deg, #FF6B5C 0%, #FF9D7D 100%)',
      'linear-gradient(45deg, #FF4B3A11 0%, #FF8F6B22 100%)'
    ],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const FloatingFoodIcons = () => (
  <Box
    sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    }}
  >
    {[FastfoodIcon, LocalDiningIcon, RamenDiningIcon].map((Icon, index) => (
      <Box
        key={index}
        component={Icon}
        sx={{
          position: 'absolute',
          fontSize: { xs: '3rem', md: '4rem' },
          color: '#FF4B3A',
          opacity: 0.2,
          animation: `${float} ${3 + index}s ease-in-out infinite`,
          left: `${20 + index * 30}%`,
          top: `${10 + index * 20}%`,
          transform: `rotate(${index * 45}deg)`,
        }}
      />
    ))}
  </Box>
);

const BackgroundSVGs = () => (
  <>
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.03,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Plate Pattern */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="plate-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="15" fill="none" stroke="#FF4B3A" strokeWidth="1"/>
          <circle cx="20" cy="20" r="8" fill="none" stroke="#FF4B3A" strokeWidth="1"/>
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#plate-pattern)"/>
      </svg>
    </Box>
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.02,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        transform: 'rotate(30deg)',
      }}
    >
      {/* Spoon and Fork Pattern */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="utensil-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 10 L30 50 M25 45 L35 45" stroke="#FF4B3A" strokeWidth="2"/>
          <path d="M20 10 Q25 20 20 30 L20 50" stroke="#FF4B3A" strokeWidth="2" fill="none"/>
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#utensil-pattern)"/>
      </svg>
    </Box>
  </>
);

const Footer = () => (
  <Box 
    component="footer" 
    sx={{ 
      mt: 'auto',
      py: 3,
      bgcolor: 'background.paper',
      borderTop: '1px solid',
      borderColor: 'divider'
    }}
  >
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Authentic Indian cuisine serving delicious dishes from various regions of India.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <Typography variant="body2" color="text.secondary">
            123 Food Street, Thalassery<br />
            Kerala, India<br />
            Phone: +91 123-456-7890<br />
            Email: info@thalasseryrestaurant.com
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Hours
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monday - Sunday<br />
            11:00 AM - 11:00 PM<br />
            Delivery Available
          </Typography>
        </Grid>
      </Grid>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        align="center" 
        sx={{ mt: 3 }}
      >
        {new Date().getFullYear()} Thalassery Restaurant. All rights reserved.
      </Typography>
    </Container>
  </Box>
);

const FoodCardSkeleton = () => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Skeleton variant="rectangular" height={160} animation="wave" />
    <CardContent sx={{ flexGrow: 1, p: 2 }}>
      <Skeleton variant="text" width="80%" height={32} animation="wave" />
      <Skeleton variant="text" width="60%" height={24} animation="wave" />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton variant="text" width="30%" height={32} animation="wave" />
        <Skeleton variant="rectangular" width="80px" height={36} animation="wave" />
      </Box>
    </CardContent>
  </Card>
);

const cartIconVariants = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.2, 1],
    transition: { duration: 0.3 }
  }
};

const addButtonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 },
  added: {
    backgroundColor: '#4CAF50',
    scale: [1, 1.1, 1],
    transition: { duration: 0.3 }
  }
};

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart, getCartCount } = useCart();
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const AddToCartButton = ({ item, isMenuItem }) => (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate={addedItems[item.id] ? "added" : "initial"}
      variants={addButtonVariants}
    >
      <Button
        size="small"
        sx={{
          backgroundColor: addedItems[item.id] ? '#4CAF50' : '#f50057',
          color: 'white',
          borderRadius: '25px',
          px: 2,
          py: 0.5,
          minWidth: '60px',
          height: '28px',
          fontSize: '0.75rem',
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: addedItems[item.id] ? '#43A047' : '#dc004e',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          },
          '&:active': {
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }
        }}
        onClick={() => handleAddToCart(item)}
        startIcon={
          <motion.div
            animate={addedItems[item.id] ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginRight: -4 }}
          >
            {addedItems[item.id] ? 
              <CheckIcon sx={{ fontSize: '16px' }} /> : 
              <ShoppingCartIcon sx={{ fontSize: '16px' }} />
            }
          </motion.div>
        }
      >
        {addedItems[item.id] ? 'Added' : 'Add'}
      </Button>
    </motion.div>
  );

  const FloatingCartButton = () => (
    <Box
      component={motion.div}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Button
        variant="contained"
        onClick={() => navigate('/cart')}
        startIcon={<ShoppingCartIcon />}
        sx={{
          backgroundColor: '#f50057',
          color: 'white',
          borderRadius: '25px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          '&:hover': {
            backgroundColor: '#dc004e',
          },
        }}
      >
        Cart ({getCartCount()})
      </Button>
    </Box>
  );

  const handleFilterChange = (event, newValue) => {
    setLoading(true);
    setFilter(newValue);
    setTimeout(() => setLoading(false), 0);
  };

  const filteredItems = foodItems.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* <BackgroundSVGs /> */}
      
      {/* Header */}
      
        <Toolbar>
          <RestaurantMenuIcon sx={{ mr: 2, color: '#FF4B3A', fontSize: '2rem' }} />
          <Typography 
            variant="h6" 
            component={motion.div}

            sx={{ 
              flexGrow: 1, 
              color: '#FF4B3A', 
              fontWeight: 600,
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            Thalassery Restaurant
          </Typography>
          <motion.div
            variants={cartIconVariants}
            animate={Object.values(addedItems).some(v => v) ? "animate" : "initial"}
          >
            <IconButton 
              sx={{ 
                position: 'relative',
                color: '#f50057'  
              }}
              aria-label="cart"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCartIcon />
              {getCartCount() > 0 && (
                <Box
                  component={motion.div}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  {getCartCount()}
                </Box>
              )}
            </IconButton>
          </motion.div>
        </Toolbar>

      <Toolbar /> {/* Spacer for fixed AppBar */}

      {/* Main Content */}
      <Container 
        maxWidth="xl" 
        sx={{ 
          flex: 1,
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          pb: 8
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{ 
            textAlign: 'center', 
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
            py: { xs: 4, md: 8 },
            px: 2,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #FF4B3A11 0%, #FF8F6B22 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <FloatingFoodIcons />
          <BackgroundSVGs />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                color: '#FF4B3A',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                position: 'relative',
                zIndex: 1
              }}
            >
              Thalassery Restaurant
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4, 
                opacity: 0.9,
                color: 'text.primary',
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                position: 'relative',
                zIndex: 1
              }}
            >
              Experience the taste of tradition
            </Typography>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#FF4B3A',
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  '&:hover': {
                    backgroundColor: '#E63B2A',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  }
                }}
                size="large"
                startIcon={<RestaurantMenuIcon />}
                onClick={() => navigate('/menu')}
              >
                Explore Menu
              </Button>
            </motion.div>
          </motion.div>
        </Box>

        {/* Menu Section */}
        <Box 
          sx={{ 
            position: 'relative',
            minHeight: '600px',
            mt: 4,
            scrollMarginTop: '80px'
          }}
        >
          {/* Filter Tabs */}
          <Box sx={{ 
            mb: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}>
            <Tabs 
              value={filter} 
              onChange={handleFilterChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                '& .MuiTab-root': {
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  py: 1.5,
                  minWidth: 'auto',
                  minHeight: '48px',
                  textTransform: 'none',
                },
                '& .MuiTab-root .MuiSvgIcon-root': {
                  mr: 1,
                  fontSize: '1.2rem'
                }
              }}
            >
              <Tab 
                icon={<RestaurantMenuIcon />} 
                iconPosition="start" 
                label="All Menu" 
                value="all" 
              />
              <Tab 
                icon={<GrassIcon />} 
                iconPosition="start" 
                label="Vegetarian" 
                value="veg" 
              />
              <Tab 
                icon={<RamenDiningIcon />} 
                iconPosition="start" 
                label="Non-Vegetarian" 
                value="non-veg" 
              />
              <Tab 
                icon={<SetMealIcon />} 
                iconPosition="start" 
                label="Chinese" 
                value="chinese" 
              />
              <Tab 
                icon={<LunchDiningIcon />} 
                iconPosition="start" 
                label="Snacks" 
                value="snacks" 
              />
              <Tab 
                icon={<CakeIcon />} 
                iconPosition="start" 
                label="Desserts" 
                value="dessert" 
              />
              <Tab 
                icon={<IcecreamIcon />} 
                iconPosition="start" 
                label="Sweets" 
                value="sweets" 
              />
            </Tabs>
          </Box>

          {/* Menu Items and Beverages */}
          <Box sx={{ position: 'relative' }}>
            <Grid container spacing={3}>
              {/* Menu Items */}
              <Grid item xs={12} md={9}>
                <Grid container spacing={2}>
                  {loading ? (
                    Array.from(new Array(4)).map((_, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Skeleton 
                          variant="rectangular" 
                          width="100%" 
                          height={250}
                          sx={{ borderRadius: 2 }}
                        />
                      </Grid>
                    ))
                  ) : (
                    filteredItems.map(item => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Card
                          component={motion.div}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            '&:hover': {
                              boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                              transform: 'translateY(-4px)',
                              transition: 'all 0.3s ease'
                            }
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="160"
                            image={item.image}
                            alt={item.name}
                            sx={{ objectFit: 'cover' }}
                          />
                          <CardContent sx={{ flexGrow: 1, p: 2 }}>
                            <Typography 
                              variant="h6" 
                              gutterBottom 
                              sx={{ 
                                fontSize: '1.1rem', 
                                fontWeight: 600,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {item.name}
                            </Typography>
                            <Tooltip title={item.description}>
                              <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ 
                                  mb: 2,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  cursor: 'pointer'
                                }}
                              >
                                {item.description}
                              </Typography>
                            </Tooltip>
                            <Box sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <Typography variant="h6" sx={{ color: '#f50057', fontSize: '1rem', fontWeight: 600 }}>
                                ₹{item.price}
                              </Typography>
                              <AddToCartButton item={item} isMenuItem={true} />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  )}
                </Grid>
              </Grid>

              {/* Beverages Section */}
              <Grid item xs={12} md={3}>
                <Box sx={{ 
                  position: 'sticky',
                  top: '100px',
                  pl: 2
                }}>
                  <Box sx={{ 
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    p: 3,
                  }}>
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      sx={{ 
                        mb: 3, 
                        fontWeight: 600,
                        borderBottom: '2px solid',
                        borderColor: '#FF4B3A',
                        pb: 1
                      }}
                    >
                      Beverages & Drinks
                    </Typography>
                    <Stack spacing={2}>
                      {beverages.map(beverage => (
                        <Card 
                          key={beverage.id} 
                          elevation={0}
                          sx={{ 
                            display: 'flex',
                            height: 90,
                            border: '1px solid',
                            borderColor: 'grey.200',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              borderColor: '#FF4B3A',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={{ 
                              width: 90,
                              height: '100%',
                              objectFit: 'cover'
                            }}
                            image={beverage.image}
                            alt={beverage.name}
                          />
                          <CardContent 
                            sx={{ 
                              flex: 1,
                              p: 2,
                              '&:last-child': { pb: 2 },
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between'
                            }}
                          >
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 600,
                                fontSize: '1rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {beverage.name}
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mt: 1
                            }}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  color: '#f50057',
                                  fontWeight: 600,
                                  fontSize: '1rem'
                                }}
                              >
                                ₹{beverage.price}
                              </Typography>
                              <AddToCartButton item={beverage} isMenuItem={false} />
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <FloatingCartButton />
      <Footer />
    </Box>
  );
};

export default HomePage;
