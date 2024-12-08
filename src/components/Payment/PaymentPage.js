import React, { useState } from "react";
import { Box, Container, Typography, Card, Button, Dialog, IconButton, useTheme, Link } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

// Background animation components
const FloatingCircle = ({ delay }) => (
  <motion.div
    style={{
      position: "absolute",
      borderRadius: "50%",
      background: "rgba(255, 75, 58, 0.1)",
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

const BuyMeCoffeeButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{
      background: "#FF813F",
      padding: "8px 24px",
      border: "none",
      borderRadius: "25px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      color: "white",
      fontFamily: "'Inter', sans-serif",
      fontSize: "1rem",
      fontWeight: "500",
      boxShadow: "0 4px 14px rgba(255, 129, 63, 0.4)",
      transition: "all 0.2s ease",
      marginTop: "16px",
    }}>
    <LocalCafeIcon style={{ fontSize: "20px" }} />
    Buy me a coffee
  </motion.button>
);

const PaymentPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getTotalPrice } = useCart();
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [coffeeDialogOpen, setCoffeeDialogOpen] = useState(false);

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, position: "relative", minHeight: "90vh" }}>
      {/* Background Animations */}
      <Box sx={{ position: "absolute", width: "100%", height: "100%", overflow: "hidden", zIndex: -1 }}>
        <FloatingCircle delay={0} style={{ width: 100, height: 100, top: "10%", left: "10%" }} />
        <FloatingCircle delay={1} style={{ width: 150, height: 150, top: "50%", right: "10%" }} />
        <FloatingCircle delay={2} style={{ width: 80, height: 80, bottom: "20%", left: "30%" }} />
      </Box>

      {/* Back Button */}
      <IconButton
        onClick={() => navigate("/cart")}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
        }}
        component={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}>
        <ArrowBackIcon />
      </IconButton>

      <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit">
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #FF4B3A, #FF8E53)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}>
          Complete Your Payment
        </Typography>

        <Card
          component={motion.div}
          variants={itemVariants}
          sx={{
            p: 4,
            mb: 4,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}>
          <Typography variant="h5" gutterBottom>
            Order Summary
          </Typography>
          <Typography variant="h4" sx={{ color: "#FF4B3A", mb: 2 }}>
            Total: ₹{getTotalPrice()}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#FF4B3A",
              py: 2,
              fontSize: "1.1rem",
              "&:hover": {
                backgroundColor: "#E63B2A",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              },
              transition: "all 0.3s ease",
            }}
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setQrDialogOpen(true)}>
            Pay Now with GPay
          </Button>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <BuyMeCoffeeButton onClick={() => setCoffeeDialogOpen(true)} />
          </Box>
        </Card>

        {/* Payment QR Code Dialog */}
        <Dialog
          open={qrDialogOpen}
          onClose={() => setQrDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 2,
              p: 2,
              maxWidth: "400px",
            },
          }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
              Scan QR Code to Pay
            </Typography>
            <Box
              component="img"
              src="/PKpay.jpeg"
              alt="Payment QR Code"
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: "300px",
                display: "block",
                margin: "0 auto",
                borderRadius: 1,
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: "center" }}>
              After payment, your order will be confirmed automatically
            </Typography>
          </motion.div>
        </Dialog>

        {/* Buy Me a Coffee Dialog */}
        <Dialog
          open={coffeeDialogOpen}
          onClose={() => setCoffeeDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 2,
              p: 2,
              maxWidth: "400px",
            },
          }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
              Support Us with a Coffee ☕
            </Typography>
            <Box
              component="img"
              src="/pay.jpeg"
              alt="Buy Me a Coffee QR Code"
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: "300px",
                display: "block",
                margin: "0 auto",
                borderRadius: 1,
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: "center" }}>
              Your support helps us keep brewing amazing experiences!
            </Typography>
          </motion.div>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default PaymentPage;
