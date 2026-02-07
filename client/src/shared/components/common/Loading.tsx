import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function LoadingContainer (props) {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <Typography variant="h4" component="h1" gutterBottom>
            Loading...
        </Typography>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}