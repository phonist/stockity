import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import { AppState } from '../../redux/store';
import { attemptGetInsights } from '../../redux/thunks/Insights';
import ErrorContainer from '../organisms/Error';
import EmptyContainer from '../organisms/Empty';

export default function NestedList(props: any) {
    const {
        insightParams
    } = props;

    const insights = useSelector((state: AppState) => state.insights);

    const [ open, setOpen] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if(insights.loading){
            dispatch(attemptGetInsights(insightParams));
        }
    }, [insights.loading, insights.empty, insights.error]); 

    return (
        <List
            sx={{ width: '100%', minWidth: 650, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Insights
                </ListSubheader>
            }
        >
            {insights.error && <ErrorContainer />}
            {insights.empty && <EmptyContainer />}
            {insights.loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                    {insights.insights.result.reports.map((insight: any) => (
                        <ListItemText
                            key={insight.id}
                            primary={insight.publishedOn}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {insight.title}
                                </Typography>
                                {insight.summary}
                                </React.Fragment>
                            }
                        />
                    ))}
                    </Collapse>
                </>
            )}
        </List>
    );
}