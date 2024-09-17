import Skeleton from '@mui/material/Skeleton';
import st from '@/views/Home/styles/styles.module.css';
import labelStyles from "@/styles/label.module.css";
import GridContainer from "@/components/Container/GridContainer.tsx";

function SkeletonNode() {
    return (
        <div className={st.content_root}>
            <Skeleton variant="text" className={`${labelStyles.subtitle} ${labelStyles.text_center} ${st.title}`}/>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
        </div>
    );
}

export default function SkeletonHome() {

    return (<div><span className={`${labelStyles.title} ${labelStyles.text_center}`}>Recursos</span>
            <GridContainer>
                <SkeletonNode/>
                <SkeletonNode/>
                <SkeletonNode/>
            </GridContainer>
        </div>
    )
}