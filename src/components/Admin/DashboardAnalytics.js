import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { motion } from 'framer-motion';

// Mock data for charts
const dailyData = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 5000, orders: 30 },
  { name: 'Thu', sales: 2780, orders: 16 },
  { name: 'Fri', sales: 6890, orders: 42 },
  { name: 'Sat', sales: 8390, orders: 52 },
  { name: 'Sun', sales: 7490, orders: 46 },
];

const hourlyData = [
  { time: '10 AM', orders: 5 },
  { time: '11 AM', orders: 8 },
  { time: '12 PM', orders: 15 },
  { time: '1 PM', orders: 12 },
  { time: '2 PM', orders: 6 },
  { time: '3 PM', orders: 4 },
  { time: '4 PM', orders: 7 },
  { time: '5 PM', orders: 9 },
  { time: '6 PM', orders: 14 },
  { time: '7 PM', orders: 16 },
  { time: '8 PM', orders: 13 },
  { time: '9 PM', orders: 8 },
];

const StatCard = ({ title, value, subtitle, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" color={color} sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
);

const DashboardAnalytics = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Analytics Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Sales"
            value="₹12,590"
            subtitle="+14% from yesterday"
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value="48"
            subtitle="Last 24 hours"
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Average Order Value"
            value="₹262"
            subtitle="+5% this week"
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Peak Hour"
            value="7 PM"
            subtitle="16 orders/hour"
            color="warning.main"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weekly Sales Overview
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" fill="#8884d8" name="Sales (₹)" />
                    <Bar yAxisId="right" dataKey="orders" fill="#82ca9d" name="Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hourly Order Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardAnalytics;
