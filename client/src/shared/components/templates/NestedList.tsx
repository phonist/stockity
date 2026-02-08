import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { AppState } from '../../../app/store';
import { attemptGetInsights } from '../../../features/insights/store/thunks/Insights';
import ErrorContainer from '../common/Error';
import EmptyContainer from '../common/Empty';
import LoadingContainer from '../common/Loading';

export default function NestedList() {
  const insights = useSelector((state: AppState) => state.insights);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (insights.loading) {
      dispatch(attemptGetInsights(insights.postInsights));
    }
  }, [dispatch, insights.loading, insights.postInsights]);

  if (insights.error) {
    return <ErrorContainer />;
  }

  if (insights.empty) {
    return <EmptyContainer />;
  }

  if (insights.loading) {
    return <LoadingContainer />;
  }

  const reports = insights.insights?.result?.reports || [];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h6">Latest Insights</Typography>
        <Button size="small" onClick={() => setOpen(prev => !prev)}>
          {open ? 'Collapse' : 'Expand'}
        </Button>
      </Stack>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ width: '100%', p: 0 }}>
          {reports.map((insight: any, index: number) => (
            <React.Fragment key={insight.id || `${insight.title}-${index}`}>
              <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 700 }}>{insight.title || 'Untitled Insight'}</Typography>}
                  secondary={
                    <>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                        {insight.publishedOn || 'Unknown date'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {insight.summary || 'No summary available.'}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < reports.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </Box>
  );
}
