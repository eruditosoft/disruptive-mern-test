import Skeleton from '@mui/material/Skeleton';
import {styles} from "@/views/SignIn/styles/styles.ts";
import st from '@/views/SignIn/styles/styles.module.css';

export default function SkeletonAuth() {
    return (
        <div className={st.content_skeleton}>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
            <Skeleton sx={styles.skeleton} animation="wave"/>
        </div>
    );
}