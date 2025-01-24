import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Box, Paper, Checkbox, FormControlLabel } from '@mui/material';
import Navbar from '../../../common/Navbar/Navbar';

export default  function CheckOut() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    isAgree: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isAgree: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form data
    if (!formData.name || !formData.email || !formData.address || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      setError('Please fill out all required fields');
      return;
    }
    if (!formData.isAgree) {
      setError('You must agree to the terms and conditions');
      return;
    }
    setError('');
    alert('Checkout successful');
  };

  return (
    <>
       <Navbar />
   
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 ,marginTop:"70px"}}>
 
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Checkout Form
        </Typography>
        {error && <Typography color="error" variant="body2">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Customer Information */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
              />
            </Grid>

            {/* Shipping Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Shipping Address"
                variant="outlined"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                variant="outlined"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Zip Code"
                variant="outlined"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                variant="outlined"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Payment Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Payment Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Card Number"
                variant="outlined"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expiry Date (MM/YY)"
                variant="outlined"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CVV"
                variant="outlined"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid>

            {/* Terms and Conditions */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isAgree}
                    onChange={handleCheckboxChange}
                    name="isAgree"
                    color="primary"
                  />
                }
                label="I agree to the terms and conditions"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Place Order
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
    
    </>
   
  );
};

