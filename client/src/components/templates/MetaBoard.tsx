import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Title from '../atoms/Title';
import { attemptGetQuotes } from '../../redux/thunks/Quotes';
import LoadingContainer from '../organisms/Loading';
import EmptyContainer from '../organisms/Empty';
import ErrorContainer from '../organisms/Error';
import { AppState } from '../../redux/store';

function MetaBoard() {
    const dispatch = useDispatch();
    const quotes = useSelector((state: AppState) => state.quotes);
    // const [quoteParams, setQuoteParams] = useState({
    //     region: "US",
    //     lang: "en",
    //     symbols: "AAPL"
    // });

    useEffect(() => {
        if(quotes.loading){
            dispatch(attemptGetQuotes(quotes.postQuote));
        }
    }, [quotes.loading, quotes.empty, quotes.error]);

    return ( 
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
            {quotes.error && <ErrorContainer />}
            {quotes.empty && <EmptyContainer />}
            {quotes.loading ? (
                <LoadingContainer />
            ) : (
                <Box>
                    <Title>{quotes.quotes.result[0].symbol}</Title>
                    <Typography component="p" variant="h4"> 
                        {quotes.quotes.result[0].regularMarketPrice}
                        <Typography variant="caption" display="block" gutterBottom>
                            {quotes.quotes.result[0].regularMarketChange != null && quotes.quotes.result[0].regularMarketChange.toFixed(2)} ({quotes.quotes.result[0].regularMarketChangePercent != null && quotes.quotes.result[0].regularMarketChangePercent.toFixed(2)}%)
                        </Typography>
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        {quotes.quotes.result[0].postMarketPrice != null && quotes.quotes.result[0].postMarketPrice.toFixed(2)} 
                        <Typography variant="caption" display="block" gutterBottom>
                            {quotes.quotes.result[0].postMarketChange != null && quotes.quotes.result[0].postMarketChange.toFixed(2)} ({quotes.quotes.result[0].postMarketChangePercent!=null && quotes.quotes.result[0].postMarketChangePercent.toFixed(2)}%)
                        </Typography>
                    </Typography> 
                </Box>
            )}
            </Container>
        </React.Fragment>
    );
}

export default MetaBoard;
