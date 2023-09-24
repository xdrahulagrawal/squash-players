import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { register } from './action';
import { RegisterInterface } from '../../types/index';

const initialValues: RegisterInterface = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  mobile: '',
  device_type: '',
  device_token: '',
};


const validationSchema = Yup.object({
  first_name: Yup.string().required('first name  is required').min(5, 'first name must be at least 5').max(40, 'first name must be at most 40'),
  last_name: Yup.string().required('last name  is required').min(5, 'last name must be at least 5').max(40, 'last name must be at most 40'),
  email: Yup.string().email('Invalid email address').required('email address is required'),
  password: Yup.string().required('password is required').matches(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{1,}$/, 'Password must contain at least one letter and one number').min(6, 'Password must be at least 6 characters').max(20, 'Password must be at most 20 characters'),
  mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
  device_type: Yup.string().required('type is required'),
  device_token: Yup.string().max(50, 'device token character length maximum 50'),
});

const RegisterUser: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formik: any = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: RegisterInterface) => {
      setIsLoading(true);
      const deviceType = values.device_type === 'android' ? '0' : '1';
      const payload = { ...values, device_type: deviceType };
      try {
        const response = await register(payload);
        if (response?.status === 200) {
          navigate('/login');
        }
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  });

  const navigateLoginRoute = () => {
    navigate('/login');
  };

  return (
    <>
      <Box className='mt-6'>
        <Typography variant="h5" component="h5" className='text-center'>
          Register User
        </Typography>
        <form onSubmit={formik.handleSubmit} className='flex flex-col w-full md:w-2/4 sm:w-1/4 gap-2 mx-auto md:mx-128'>
          {['first_name', 'last_name', 'email', 'password', 'mobile', 'device_token'].map((field) => (
            <TextField
              key={field}
              className="w-full"
              id={field}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
              type={field === 'password' ? 'password' : 'text'}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[field] && Boolean(formik.errors[field])}
              helperText={formik.touched[field] && formik.errors[field]}
            />
          ))}

          <TextField
            className="w-full"
            id="device_type"
            name="device_type"
            label="Device Type"
            select
            value={formik.values.device_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.device_type && Boolean(formik.errors.device_type)}
            helperText={formik.touched.device_type && formik.errors.device_type}
          >
            <MenuItem value='android'>Android</MenuItem>
            <MenuItem value='ios'>iOS</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            Sign Up
          </Button>
          <Button variant="contained" color="primary" disabled={isLoading} onClick={navigateLoginRoute}>
            Sign In
          </Button>
        </form>
      </Box>
    </>

  );
};

export default RegisterUser;
