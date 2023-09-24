import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getGameList } from './action';
import { setGameListAction } from './gameSlice';
import OvalCircle from '../../common/spinner/Ovalcircle';
import Game from './game';
import GameList from './gameList';

const Games = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const gameData = useSelector((s: RootState) => s?.game?.gameList)


  const fetchGameList = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getGameList();
      if (result?.data?.data) {
        dispatch(setGameListAction(result?.data?.data));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching game list:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchGameList();
  }, [fetchGameList]);

  return (
    <>
      <Game fetchGameList={fetchGameList} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      {isLoading ? <OvalCircle /> : <GameList data={gameData} fetchGameList={fetchGameList} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}

    </>
  )
}

export default Games;