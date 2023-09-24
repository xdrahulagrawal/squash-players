import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, TableSortLabel } from '@mui/material';
import { Venue } from './type';
import { getComparator, stableSort } from '../../common/methods';


interface EnhancedTableProps {
    data: Venue[];
}

const VenewList: React.FC<EnhancedTableProps> = ({ data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState<keyof Venue>('name');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [sortedRows, setSortedRows] = useState<Venue[]>(data);

    const handleRequestSort = (property: keyof Venue) => {
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

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'name'}
                                direction={orderBy === 'name' ? order : 'asc'}
                                onClick={() => handleRequestSort('name')}
                            >
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'state'}
                                direction={orderBy === 'state' ? order : 'asc'}
                                onClick={() => handleRequestSort('state')}
                            >
                                State
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'physical_address'}
                                direction={orderBy === 'physical_address' ? order : 'asc'}
                                onClick={() => handleRequestSort('physical_address')}
                            >
                                Physical Address
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'country'}
                                direction={orderBy === 'country' ? order : 'asc'}
                                onClick={() => handleRequestSort('country')}
                            >
                                Country
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.state}</TableCell>
                            <TableCell>{row.physical_address}</TableCell>
                            <TableCell>{row.country}</TableCell>
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
    );
};

export default React.memo(VenewList);
