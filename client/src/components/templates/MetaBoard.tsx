import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../atoms/Title';
import { attemptGetQuotes } from '../../redux/thunks/Quotes';
import LoadingContainer from '../organisms/Loading';
import EmptyContainer from '../organisms/Empty';
import ErrorContainer from '../organisms/Error';
import { AppState } from '../../redux/store';

function MetaBoard(props: any) {
    const {
        quoteParams
    } = props;

    const dispatch = useDispatch();
    const quotes = useSelector((state: AppState) => state.quotes);
    const [value, setValue] = useState({});


    useEffect(() => {
        if(quotes.loading){
            console.log(quotes);

            dispatch(attemptGetQuotes(quoteParams));
        }else{
            if(!quotes.error && !quotes.empty){
                setValue(quotes);
            }
        }
    }, [quotes.loading, quotes.empty, quotes.error]);

    return ( 
        <React.Fragment>
            {quotes.error && <ErrorContainer />}
            {quotes.empty && <EmptyContainer />}
            {quotes.loading ? (
                <LoadingContainer />
            ) : (
                <>
                <Title>{value}</Title>
                {/* <Typography component="p" variant="h4">
                    {quotes.quotes.meta.regularMarketPrice != null && quotes.quotes.meta.regularMarketPrice.toFixed(2)}
                    <Typography variant="caption" display="block" gutterBottom>
                        {quotes.quotes.meta.regularMarketChange != null && quotes.quotes.meta.regularMarketChange.toFixed(2)} ({quotes.quotes.meta.regularMarketChangePercent != null && quotes.quotes.meta.regularMarketChangePercent.toFixed(2)}%)
                    </Typography>
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {quotes.quotes.meta.postMarketPrice != null && quotes.quotes.meta.postMarketPrice.toFixed(2)} 
                    <Typography variant="caption" display="block" gutterBottom>
                        {quotes.quotes.meta.postMarketChange != null && quotes.quotes.meta.postMarketChange.toFixed(2)} ({quotes.quotes.meta.postMarketChangePercent!=null && quotes.quotes.meta.postMarketChangePercent.toFixed(2)}%)
                    </Typography>
                </Typography> */}
                </>
            )}
        </React.Fragment>
    );
}

export default MetaBoard;
