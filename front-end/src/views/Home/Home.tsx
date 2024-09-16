import data from '@/mock/resource.json';
import Resource from "@/components/Resource/Resource.tsx";
import labelStyles from '@/styles/label.module.css';
import GridContainer from "@/components/Container/GridContainer.tsx";

export type HomeProps = {}

export default function Home({}: HomeProps) {
    const values = data.items.map(({id, author, category, name, createdAt, content}) => (
        <Resource key={id} title={name} category={category} author={author} created={createdAt} resource={content} disabled={false}/>));
    return (<div>
        <span className={labelStyles.title}>

        </span>
        <GridContainer>
        {values}
        </GridContainer>
    </div>);
}
