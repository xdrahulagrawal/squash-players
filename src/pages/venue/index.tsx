import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Box } from '@mui/material'
import VenewList from './VenewList';
import CreateVenue from './CreateVenue';
import OvalCircle from '../../common/spinner/Ovalcircle';
import { getVenueList } from './action';
import { setVenueListAction } from './venueSlice';


const Venue = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const venueData = useSelector((s: RootState) => s?.venue?.venueList)


  const fetchVenueList = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getVenueList();
      if (result?.data?.data) {
        dispatch(setVenueListAction(result?.data?.data));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching venue list:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchVenueList();
  }, [fetchVenueList]);

  return (
    <>
      <Box className='flex justify-end'>
        <CreateVenue fetchVenueList={fetchVenueList} />
      </Box>
      {isLoading ? <OvalCircle /> : <VenewList data={venueData} />}
    </>
  )
}

export default React.memo(Venue);