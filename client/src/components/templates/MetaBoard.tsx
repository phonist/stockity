import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../atoms/Title';
import { attemptGetQuotes } from '../../redux/thunks/Quotes';
import { AppState } from '../../redux/store';

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

function MetaBoard(props: any) {
    const {
        quoteParams
    } = props;

    const dispatch = useDispatch();
    const quotes = useSelector((state: AppState) => state.quotes);

    useEffect(() => {
        dispatch(attemptGetQuotes(quoteParams));
    }, [quotes.loading]);

    return ( 
        <React.Fragment>
            {quotes.loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <>
                <Title>{!quotes.loading && quotes.quotes.name}</Title>
                <Typography component="p" variant="h4">
                    {!quotes.loading && quotes.quotes.meta.regularMarketPrice != null && quotes.quotes.meta.regularMarketPrice.toFixed(2)}
                    <Typography variant="caption" display="block" gutterBottom>
                        {!quotes.loading && quotes.quotes.meta.regularMarketChange != null && quotes.quotes.meta.regularMarketChange.toFixed(2)} ({!quotes.loading && quotes.quotes.meta.regularMarketChangePercent != null && quotes.quotes.meta.regularMarketChangePercent.toFixed(2)}%)
                    </Typography>
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {!quotes.loading && quotes.quotes.meta.postMarketPrice != null && quotes.quotes.meta.postMarketPrice.toFixed(2)} 
                    <Typography variant="caption" display="block" gutterBottom>
                        {!quotes.loading && quotes.quotes.meta.postMarketChange != null && quotes.quotes.meta.postMarketChange.toFixed(2)} ({!quotes.loading && quotes.quotes.meta.postMarketChangePercent!=null && quotes.quotes.meta.postMarketChangePercent.toFixed(2)}%)
                    </Typography>
                </Typography>
                </>
            )}
        </React.Fragment>
    );
}

export default MetaBoard;
