import Resource from "@/views/Home/components/Resource/Resource.tsx";
import labelStyles from '@/styles/label.module.css';
import GridContainer from "@/components/Container/GridContainer.tsx";
import useHomeHooks from "@/views/Home/hooks/useHomeHooks.ts";
import SkeletonHome from "@/views/Home/components/Skeleton/SkeletonHome.tsx";

export default function Home() {
    const {resources, loading} = useHomeHooks();
    const values = resources?.map(({id, author, category, name, createdAt, content, topicId}) => (
        <Resource id={id} key={id} title={name} category={category} author={author} created={createdAt}
                  resource={content} topicId={topicId}/>));
    if (loading) return <SkeletonHome/>;

    return (
        <div>
            <span className={`${labelStyles.title} ${labelStyles.text_center}`}>Recursos</span>
            <GridContainer>
                {values}
            </GridContainer>
        </div>);
}
