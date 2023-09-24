import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUserLoginAction } from './userLoginSlice';
import { LoginInterface } from '../../types/index'
import { login } from './action';
import { useState } from 'react';


const initialValues: LoginInterface = {
    email: '',
    password: '',
    device_type: '',
    device_token: ''
};

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('email address is required'),
    password: Yup.string().required('password is required').matches(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{1,}$/, 'Password must contain at least one letter and one number').min(6, 'Password must be at least 6 characters').max(20, 'Password must be at most 20 characters'),
    device_type: Yup.string().required('type is required'),
    device_token: Yup.string().max(50, 'device token character length maximum 50'),
  });

const LoginUser: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik: any = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true)
                const deviceType = values.device_type === 'android' ? '0' : '1';
                const payload = { ...values, device_type: deviceType };
                const response = await login(payload);
                if (!(response?.data?.error === 'Invalid combination of email and password.')) {
                    const auth = {
                        id: response?.data?.id,
                        authorization: response?.data?.authorization,
                        email: response?.data?.email,
                    }
                    localStorage.setItem('auth', JSON.stringify(auth))
                    dispatch(setUserLoginAction(auth))
                    navigate('/');
                }
            } catch (error) {
                console.log('Error: Unexpected response from server:', error);
            }
            finally {
                setIsLoading(false);
            }
        },
       
    });
    const navigateRegisterRoute = () => {
        navigate('/register')
    }

    return (
            <Box className='mt-6'>
                <Typography variant="h5" component="h5" className='text-center'>Login User</Typography>
                <form onSubmit={formik.handleSubmit} className='flex flex-col mt-8 w-full md:w-1.5/4  sm:w-1/4 gap-2.5 mx-auto md:mx-128'>
                    {['email', 'password', 'device_token'].map((field) => (
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
                        Sing In
                    </Button>
                    <Button variant="contained" color="primary" disabled={isLoading} onClick={navigateRegisterRoute}>
                        Sign Up
                    </Button>
                </form>
            </Box>
    );
};

export default LoginUser