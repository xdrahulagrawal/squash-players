import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, TableSortLabel, Button, Typography, Box } from '@mui/material';
import { GameFormTable } from './type';
import { deleteGame } from './action';
import { getComparator, stableSort } from '../../common/methods';
import CustomDialog from '../../common/dialogBox/customDiaglog';
import { useDispatch } from 'react-redux';
import { setGameIdAction } from './gameSlice';

interface EnhancedTableProps {
    data: GameFormTable[];
    fetchGameList: () => Promise<void>;
    isModalOpen:boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VenewList: React.FC<EnhancedTableProps> = ({ data, fetchGameList,setIsModalOpen }) => {
    const dispatch=useDispatch()
    const [page, setPage] = useState(0);
    const [openConfirmBox, setOpenConfirmBox] = useState<boolean>(false);
    const [gameId, setGameId] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState<keyof GameFormTable>('game_datetime');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [sortedRows, setSortedRows] = useState<GameFormTable[]>(data);

    const handleConfirmBoxOpen = (gameId:number) => {
        setGameId(gameId);
        setOpenConfirmBox(true);
      };
    const handleConfirmBoxClose = () => setOpenConfirmBox(false);

    const handleRequestSort = (property: keyof GameFormTable) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrderBy(property);
        setOrder(isAsc ? 'desc' : 'asc');
        setSortedRows(stableSort(data, getComparator(isAsc ? 'desc' : 'asc', property)));
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedRows?.length - page * rowsPerPage);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        setSortedRows(data);
    }, [data]);

    const deleteGameApi = async (gameId: number) => {
        try {
            const result = await deleteGame(gameId)
            //facing some api issue if api is failed also get status 200 instead of different error status thatswhy using msg other this codition handle with status
            if (result?.data?.message === 'Game deleted successfully') {
                //game delete successfully show notication msg here
            }
            fetchGameList();
        } catch (error) {

        }
    }

    return (
        <>
            <CustomDialog
                message='Are you sure, delete this game?'
                onConfirm={() => {
                    deleteGameApi(gameId); 
                    handleConfirmBoxClose(); 
                }}
                open={openConfirmBox}
                onClose={handleConfirmBoxClose}
            />
            <Box className="overflow-x-auto">
                <TableContainer className="min-w-full">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'game_datetime'}
                                        direction={orderBy === 'game_datetime' ? order : 'asc'}
                                        onClick={() => handleRequestSort('game_datetime')}
                                    >
                                        Game Date
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'from_score'}
                                        direction={orderBy === 'from_score' ? order : 'asc'}
                                        onClick={() => handleRequestSort('from_score')}
                                    >
                                        From score
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'to_score'}
                                        direction={orderBy === 'to_score' ? order : 'asc'}
                                        onClick={() => handleRequestSort('to_score')}
                                    >
                                        To score
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'type'}
                                        direction={orderBy === 'type' ? order : 'asc'}
                                        onClick={() => handleRequestSort('type')}
                                    >
                                        Type
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <Typography component='h3'>Actions</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row?.game_datetime}</TableCell>
                                    <TableCell>{row?.from_score}</TableCell>
                                    <TableCell>{row?.to_score}</TableCell>
                                    <TableCell>{row?.type}</TableCell>
                                    <TableCell>
                                    <Button color='error' onClick={() => handleConfirmBoxOpen(row?.id)}>Delete</Button>
                                    <Button color='primary' onClick={() => {dispatch(setGameIdAction(row?.id));setIsModalOpen(true)}}>Update</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={sortedRows?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
        </>

    );
};

export default React.memo(VenewList);
