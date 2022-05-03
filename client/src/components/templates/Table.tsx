import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AppState } from '../../redux/store';
import { attemptGetQuoteSummaries } from '../../redux/thunks/QuoteSummaries';
import LoadingContainer from '../organisms/Loading';
import ErrorContainer from '../organisms/Error';
import EmptyContainer from '../organisms/Empty';
import { Grid } from '@mui/material';

export default function BasicTable() {
    const quoteSummaries = useSelector((state: AppState) => state.quoteSummaries);
    const dispatch = useDispatch();
    const [valuationMeasures, setValuationMeasures] = useState([]);
    const [fiscalYear, setFiscalYear] = useState([]);

    useEffect(() => {
        if(quoteSummaries.loading) {
            dispatch(attemptGetQuoteSummaries(quoteSummaries.postQuoteSummaries));
        }else{
            if(!quoteSummaries.error && !quoteSummaries.empty) {
                let data = quoteSummaries.quoteSummaries.result[0];
                setValuationMeasures ([
                    createData('Market Cap', data.summaryDetail.marketCap.fmt === null ? 'N/A' : data.summaryDetail.marketCap.fmt),
                    createData('Enterprise Value', data.defaultKeyStatistics.enterpriseValue.fmt === null ? 'N/A' : data.defaultKeyStatistics.enterpriseValue.fmt),
                    createData('Traling P/E', data.summaryDetail.trailingPE.fmt === null ? 'N/A' : data.summaryDetail.trailingPE.fmt),
                    createData('Forward P/E', data.defaultKeyStatistics.forwardPE.fmt === null ? 'N/A' : data.defaultKeyStatistics.forwardPE.fmt),
                    createData('PEG Ratio (5 years expected)', data.defaultKeyStatistics.pegRatio.fmt === null ? 'N/A' : data.defaultKeyStatistics.pegRatio.fmt),
                    createData('Prices/Sales(ttm)', data.summaryDetail.priceToSalesTrailing12Months.fmt === null ? 'N/A' : data.summaryDetail.priceToSalesTrailing12Months.fmt),
                    createData('Price/Book (mrq)', data.defaultKeyStatistics.priceToBook.fmt === null ? 'N/A' : data.defaultKeyStatistics.priceToBook.fmt),
                    createData('Enterprise Value/Revenue', data.defaultKeyStatistics.enterpriseToRevenue.fmt === null ? 'N/A' : data.defaultKeyStatistics.enterpriseToRevenue.fmt),
                    createData('Enterprise Value/EBITDA', data.defaultKeyStatistics.enterpriseToEbitda.fmt === null ? 'N/A' : data.defaultKeyStatistics.enterpriseToEbitda.fmt),
                ]);
                setFiscalYear([
                    createData('Fiscal Year Ends', data.defaultKeyStatistics.lastFiscalYearEnd.fmt === null ? 'N/A' : data.defaultKeyStatistics.lastFiscalYearEnd.fmt),
                    createData('Most Recent Quaters', data.defaultKeyStatistics.mostRecentQuarter.fmt === null ? 'N/A' : data.defaultKeyStatistics.mostRecentQuarter.fmt),
                ]);
            }
        }
    }, [quoteSummaries.loading, quoteSummaries.empty, quoteSummaries.error]);

    function createData(
        name: string,
        value: string
    ) {
        return { name, value };
    }

    return (
        <>
            <Grid container spacing={12}>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} size="small" aria-label="valuation measures">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Valuation Measures</TableCell>
                                </TableRow>
                            </TableHead>
                            {quoteSummaries.error && 
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <ErrorContainer />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            }
                            {quoteSummaries.empty && 
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <EmptyContainer />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            }
                            {quoteSummaries.loading ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <LoadingContainer />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {valuationMeasures.map((valuationMeasure) => (
                                        <TableRow
                                        key={valuationMeasure.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                        {valuationMeasure.name}
                                        </TableCell>
                                        <TableCell align="left">{valuationMeasure.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} size="small" aria-label="financial highlights">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Financial Highlights</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Fiscal Year</TableCell>
                                </TableRow>
                            </TableHead>
                            {quoteSummaries.error && 
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <ErrorContainer />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            }
                            {quoteSummaries.empty && 
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <EmptyContainer />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            }
                            {quoteSummaries.loading ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <LoadingContainer />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {fiscalYear.map((data) => (
                                        <TableRow
                                        key={data.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                        {data.name}
                                        </TableCell>
                                        <TableCell align="left">{data.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>             
                </Grid>
            </Grid>
        </>

    );
}