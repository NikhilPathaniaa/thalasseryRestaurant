import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  IconButton,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  Badge,
  Tabs,
  Tab,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import KitchenTimer from './KitchenTimer';
import DashboardAnalytics from './DashboardAnalytics';

const StyledCard = styled(Card)(({ theme, status }) => ({
  marginBottom: theme.spacing(2),
  borderLeft: `5px solid ${
    status === 'pending' ? '#ff9800' :
    status === 'cooking' ? '#2196f3' :
    status === 'completed' ? '#4caf50' : '#e0e0e0'
  }`,
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor:
    status === 'pending' ? '#fff3e0' :
    status === 'cooking' ? '#e3f2fd' :
    status === 'completed' ? '#e8f5e9' : '#f5f5f5',
  color:
    status === 'pending' ? '#ef6c00' :
    status === 'cooking' ? '#1565c0' :
    status === 'completed' ? '#2e7d32' : '#616161',
  fontWeight: 'bold',
}));

const AdminPage = () => {
  const { orders, updateOrderStatus } = useOrders();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AccessTimeIcon sx={{ color: '#ff9800' }} />;
      case 'cooking':
        return <LocalDiningIcon sx={{ color: '#2196f3' }} />;
      case 'completed':
        return <CheckCircleIcon sx={{ color: '#4caf50' }} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ position: 'relative', mb: 4 }}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              },
            }}
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            fontWeight="bold"
            sx={{ textAlign: 'center' }}
          >
            Kitchen Dashboard
          </Typography>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Orders" />
          <Tab label="Analytics" />
        </Tabs>

        {tabValue === 0 ? (
          <Grid container spacing={3}>
            {orders.map((order) => (
              <Grid item xs={12} md={6} key={order.id}>
                <Card
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        Order #{order.id}
                      </Typography>
                      <Box>
                        {order.status === 'cooking' && (
                          <KitchenTimer orderId={order.id} />
                        )}
                      </Box>
                    </Box>
                    
                    <List>
                      {order.items.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={item.name}
                            secondary={`Quantity: ${item.quantity} - ₹${item.price}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1">
                        Total: ₹{order.total}
                      </Typography>
                      <Box>
                        <Button
                          variant={order.status === 'pending' ? 'contained' : 'outlined'}
                          color="primary"
                          onClick={() => handleStatusChange(order.id, 'cooking')}
                          disabled={order.status === 'completed'}
                          sx={{ mr: 1 }}
                        >
                          Start Cooking
                        </Button>
                        <Button
                          variant={order.status === 'completed' ? 'contained' : 'outlined'}
                          color="success"
                          onClick={() => handleStatusChange(order.id, 'completed')}
                          disabled={order.status === 'pending'}
                        >
                          Complete
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <DashboardAnalytics />
        )}
      </motion.div>
    </Container>
  );
};

export default AdminPage;
