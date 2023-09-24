import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, TextField, Divider, MenuItem, Select, FormControl, InputLabel, FormHelperText, } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import ModalBox from '../../common/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setGameIdAction } from './gameSlice';
import { createGameList, editGame, getGameById } from './action';
import { GameForm } from './type';

interface CreateGameProps {
  fetchGameList: () => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const validationSchema = Yup.object({
  venue_id: Yup.number().required('Venue ID is required').min(1, 'Venue ID must be at least 1').max(10, 'Venue ID must be at most 10'),
  to_user_id: Yup.number().required('User ID is required').min(1, 'User ID must be at least 1').max(50, 'User ID must be at most 50'),
  from_score: Yup.number().required('From score is required').min(1, 'From score must be at least 1').max(500, 'From score must be at most 500'),
  to_score: Yup.number().required('To score is required').max(500, 'To score must be at most 500'),
  private_note: Yup.string().min(3, 'Private note character length minimun 3').max(50, 'Private note character length maximum 50'),
  public_comments: Yup.string().min(3, 'Private comments character length minimun 3').max(50, 'Private comments character length maximum 50'),
  type: Yup.string().required('Type is required'),
  game_datetime: Yup.date().required('Game datetime is required'),
});

const Game: React.FC<CreateGameProps> = ({ fetchGameList, isModalOpen, setIsModalOpen }) => {
  const defaultDate = dayjs();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(defaultDate);
  const [gameData, setGameData] = useState<GameForm>({
    venue_id: 1,
    to_user_id: 1,
    from_score: 1,
    to_score: 0,
    public_comments: '',
    private_note: '',
    type: '',
    game_datetime: defaultDate.format('YYYY-MM-DD'),
  });

  const dispatch = useDispatch();
  const gameId = useSelector((s: RootState) => s?.game?.gameId);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpen = () => setIsModalOpen(true);

  const handleClose = () => {
    setIsModalOpen(false);
    dispatch(setGameIdAction(0));
    formik.resetForm();
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    formik.handleChange('game_datetime')(date?.format('YYYY-MM-DD') || '');
  };

  const formik = useFormik<GameForm>({
    initialValues: {
      ...gameData,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('Form', values);
      try {
        setIsLoading(true);
        if (gameId) {
          await editGame(gameId, values);
        } else {
          await createGameList(values);
        }
        fetchGameList();
      } catch (error) {
        console.error('error', error);
      } finally {
        setIsLoading(false);
      }
      setIsModalOpen(false);
      resetForm();
    },
  });

  const fetchGameById = useCallback(async () => {
    try {
      if (gameId) {
        const result = await getGameById(gameId);
        if (result?.data) {
          setGameData(result?.data);
        }
      }
    } catch (error) {
      console.error('error', error);
    }
  }, [gameId]);

  useEffect(() => {
    fetchGameById();
  }, [gameId, fetchGameById]);

  useEffect(() => {
    if (gameData) {
      formik.setValues({
        ...formik.values,
        ...gameData,
      });
    }
  }, [gameData]);

  return (
    <ModalBox buttonLabel='Add Game' headerLabel={gameId ? "Edit Game" : "Add Game"} open={isModalOpen} handleOpen={handleOpen} handleClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <Box className="grid grid-cols-2 gap-4">
          <Box>
            <TextField
              fullWidth
              id="venue_id"
              name="venue_id"
              label="Venue ID"
              type="number"
              value={formik.values.venue_id}
              onChange={formik.handleChange}
              error={formik.touched.venue_id && Boolean(formik.errors.venue_id)}
              helperText={formik.touched.venue_id && formik.errors.venue_id}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="to_score"
              name="to_score"
              label="To Score"
              type="number"
              value={formik.values.to_score}
              onChange={formik.handleChange}
              error={formik.touched.to_score && Boolean(formik.errors.to_score)}
              helperText={formik.touched.to_score && formik.errors.to_score}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="from_score"
              name="from_score"
              label="From Score"
              type="number"
              value={formik.values.from_score}
              onChange={formik.handleChange}
              error={formik.touched.from_score && Boolean(formik.errors.from_score)}
              helperText={formik.touched.from_score && formik.errors.from_score}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="to_user_id"
              name="to_user_id"
              label="User ID"
              type="number"
              value={formik.values.to_user_id}
              onChange={formik.handleChange}
              error={formik.touched.to_user_id && Boolean(formik.errors.to_user_id)}
              helperText={formik.touched.to_user_id && formik.errors.to_user_id}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="private_note"
              name="private_note"
              label="Private Note"
              value={formik.values.private_note}
              onChange={formik.handleChange}
              error={formik.touched.private_note && Boolean(formik.errors.private_note)}
              helperText={formik.touched.private_note && formik.errors.private_note}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="public_comments"
              name="public_comments"
              label="Public Comments"
              value={formik.values.public_comments}
              onChange={formik.handleChange}
              error={formik.touched.public_comments && Boolean(formik.errors.public_comments)}
              helperText={formik.touched.public_comments && formik.errors.public_comments}
            />
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  label="Game Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box className='mt-2'>
            <FormControl fullWidth>
              <InputLabel htmlFor="type">Type</InputLabel>
              <Select
                id="type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
              >
                <MenuItem value="Social">Social</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
                <MenuItem value="Intra-club">Intra-club(internal/closed comp)</MenuItem>
                <MenuItem value="Inter-club">Inter-club (external/open comp)</MenuItem>
              </Select>
              {formik.touched.type && Boolean(formik.errors.type) && (
                <FormHelperText sx={{ color: 'red' }}>{formik.errors.type}</FormHelperText>
              )}
            </FormControl>
          </Box>
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

  );
};
export default Game;
