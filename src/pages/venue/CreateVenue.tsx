import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store';
import { Box, Divider, TextField, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ModalBox from '../../common/modal/Modal';
import { Country, VenueForm } from './type';
import { getCountriesList, getStateList, getSuburbsList, createVenue } from './action';
import { setCountriesListAction, setStateListAction, setSuburbsListAction } from './venueSlice';

const initialValues: VenueForm = {
  name: '',
  physical_address: '',
  country_code: '',
  state: '',
  suburb: ''

}

interface CreateVenueProps {
  fetchVenueList: () => Promise<void>;
}

const validationSchema = Yup.object({
  name: Yup.string().required('name is required').min(5, 'name character length maximum 5').max(50, 'name character length maximum 50'),
  physical_address: Yup.string().required('physical address is required').min(5, 'physical address character length maximum 5').max(50, 'physical address character length maximum 50'),
  country_code: Yup.string().required('country is required'),
  state: Yup.string().required('state is required'),
  suburb: Yup.string().required('suburb is required'),
});

const CreateVenue: React.FC<CreateVenueProps> = ({ fetchVenueList }) => {

  const dispatch = useDispatch()
  const [countryCode, setCountryCode] = useState<string>('')
  const [state, setstate] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false);
  const countryList = useSelector((s: RootState) => s?.venue?.countriesList)
  const stateList = useSelector((s: RootState) => s?.venue?.stateList)
  const suburbsList = useSelector((s: RootState) => s?.venue?.suburbsList)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: VenueForm) => {
      setIsLoading(true)
      const payload = {
        ...values,
        country_code: countryCode,
        g_place_id: uuidv4(),
        latitude: '191.199025',
        longitude: "-13.870775",
      }
      try {
        await createVenue(payload)
        setIsLoading(false);
        handleClose()
        fetchVenueList()
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const getViewCountryApiCall = useCallback(async () => {
    try {
      const result = await getCountriesList();
      if (result?.data?.countries) {
        dispatch(setCountriesListAction(result?.data?.countries))
      }
    } catch (error) {
      console.error("error", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getViewCountryApiCall()
  }, [getViewCountryApiCall]);

  const getViewStateApiCall = useCallback(async () => {
    if (countryCode) {
      try {
        const result = await getStateList(countryCode);
        if (result?.data?.states) {
          dispatch(setStateListAction(result?.data?.states))
        }
      } catch (error) {
        console.error("error", error);
      }
    }
  }, [countryCode, dispatch]);

  useEffect(() => {
    getViewStateApiCall()
  }, [countryCode, getViewStateApiCall]);

  const getViewSuburbsApiCall = useCallback(async () => {
    if (state) {
      try {
        const result = await getSuburbsList(state);
        if (result?.data?.suburb) {
          dispatch(setSuburbsListAction(result?.data?.suburb))
        }
      } catch (error) {
        console.error("error", error);
      }
    }
  }, [dispatch, state]);

  useEffect(() => {
    getViewSuburbsApiCall()
  }, [state, getViewSuburbsApiCall]);


  const handleClose = () => {
    setIsModalOpen(false);
    dispatch(setStateListAction([]))
    dispatch(setSuburbsListAction([]))
    formik.resetForm();
  };

  return (
    <Box>
      <ModalBox buttonLabel="Add Venue" headerLabel="Add Venue" open={isModalOpen} handleOpen={handleOpen} handleClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <Box className='flex gap-2'>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={!!formik.errors.name}
              helperText={formik.errors.name}
            />
            <TextField
              fullWidth
              id="physical_address"
              name="physical_address"
              label="Physical Address"
              value={formik.values.physical_address}
              onChange={formik.handleChange}
              error={!!formik.errors.physical_address}
              helperText={formik.errors.physical_address}
            />

          </Box>
          <Box className='flex gap-2 mt-2'>
            <TextField
              className="w-full"
              id="country_code"
              name="country_code"
              label="Select Country"
              select
              value={formik.values.country_code}
              onChange={(event) => {
                formik.handleChange(event);
                const selectedCountry = event?.target?.value;
                const selectedCountryData = countryList.find((country: Country) => country?.country === selectedCountry);
                if (selectedCountryData) {
                  setCountryCode(selectedCountryData?.country_code);
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.country_code && Boolean(formik.errors.country_code)}
              helperText={formik.touched.country_code && formik.errors.country_code}
            >
              {countryList?.map((country: Country, index: number) => (
                <MenuItem key={index} value={country?.country}>
                  {country?.country}
                </MenuItem>
              ))}
            </TextField>


            <TextField
              className="w-full"
              id="state"
              name="state"
              label="Select State"
              select
              value={formik.values.state}
              onChange={(event) => {
                formik.handleChange(event);
                const selectedState = event?.target?.value;
                if (selectedState) {
                  setstate(selectedState);
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            >
              {stateList?.map((state: string) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box className='flex gap-2 mt-2'>
            <TextField
              className="w-full"
              id="suburb"
              name="suburb"
              label="Select Suburbs"
              select
              value={formik.values.suburb}
              onChange={(event) => {
                formik.handleChange(event);

              }}
              onBlur={formik.handleBlur}
              error={formik.touched.suburb && Boolean(formik.errors.suburb)}
              helperText={formik.touched.suburb && formik.errors.suburb}
            >
              {suburbsList?.map((suburbs: string) => (
                <MenuItem key={suburbs} value={suburbs}>
                  {suburbs}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box className='flex justify-end mt-3 gap-2'>
            <Button onClick={handleClose} color="primary" variant="contained">
              Close
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              Save
            </Button>
          </Box>
        </form>
      </ModalBox>
    </Box>
  );
};

export default React.memo(CreateVenue);
