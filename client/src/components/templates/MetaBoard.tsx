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

    const quotes = useSelector((state: AppState) => state.quotes).quotes;
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        dispatch(attemptGetQuotes(quoteParams));
        if(quotes._id=== '' || quotes._id === undefined) {
            setLoading(true);
        }else{
            setLoading(false);
        }
    }, [dispatch, quotes._id, quoteParams]);

    return ( 
        <React.Fragment>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <>
                <Title>{!loading && quotes.name}</Title>
                <Typography component="p" variant="h4">
                    {!loading && quotes.meta.regularMarketPrice != null && quotes.meta.regularMarketPrice.toFixed(2)}
                    <Typography variant="caption" display="block" gutterBottom>
                        {!loading && quotes.meta.regularMarketChange != null && quotes.meta.regularMarketChange.toFixed(2)} ({!loading && quotes.meta.regularMarketChangePercent != null && quotes.meta.regularMarketChangePercent.toFixed(2)}%)
                    </Typography>
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {!loading && quotes.meta.postMarketPrice != null && quotes.meta.postMarketPrice.toFixed(2)} 
                    <Typography variant="caption" display="block" gutterBottom>
                        {!loading && quotes.meta.postMarketChange != null && quotes.meta.postMarketChange.toFixed(2)} ({!loading && quotes.meta.postMarketChangePercent!=null && quotes.meta.postMarketChangePercent.toFixed(2)}%)
                    </Typography>
                </Typography>
                </>
            )}
        </React.Fragment>
    );
}

export default MetaBoard;
// const mapStateToProps = (state: AppState) => ({
//     quotes: state.quotes
// });

// const mapDispatchToProps = (dispatch:any) => ({
//     attemptGetQuotes
// });

// export default connect(mapStateToProps, mapDispatchToProps)(MetaBoard);
