import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { AppState } from '../../redux/store';
import { attemptGetQuoteSummaries } from '../../redux/thunks/QuoteSummaries';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable(props: any) {
    const {
        quoteSummaryParams
    } = props;
    const quoteSummaries = useSelector((state: AppState) => state.quoteSummaries);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(attemptGetQuoteSummaries(quoteSummaryParams));
        console.log(quoteSummaries);
    }, [quoteSummaries.loading]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">52 Weeks Changes</TableCell>
                        <TableCell align="right">Forward Eps</TableCell>
                        <TableCell align="right">Forwared PE</TableCell>
                        <TableCell align="right">Peg Ratio</TableCell>
                    </TableRow>
                </TableHead>
                {quoteSummaries.loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                            {/* <TableCell align="right">{quoteSummaries.quoteSummaries.meta.defaultKeyStatistics.52WeekChange.fmt}</TableCell> */}
                            <TableCell align="right">{quoteSummaries.quoteSummaries.meta.defaultKeyStatistics.forwardEps.fmt}</TableCell>
                            <TableCell align="right">{quoteSummaries.quoteSummaries.meta.defaultKeyStatistics.forwardPE.fmt}</TableCell>
                            <TableCell align="right">{quoteSummaries.quoteSummaries.meta.defaultKeyStatistics.pegRatio.fmt}</TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
}