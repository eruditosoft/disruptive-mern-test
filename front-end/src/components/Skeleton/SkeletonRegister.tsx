import Skeleton from '@mui/material/Skeleton';

export default function SkeletonRegister() {
    return (
        <div style={{width: '100%'}}>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton sx={{ bgcolor: 'grey.900', height: 194 }} animation="wave" />
        </div>
    );
}