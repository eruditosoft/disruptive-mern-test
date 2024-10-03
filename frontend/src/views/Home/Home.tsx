import {NoData, ResourceCard, Title, SkeletonHome} from "@/components";
import {useFetch, useHome} from "@/hooks";

export default function Home() {
    const {loading, response} = useFetch({
        endpoint: "resource.findResource",
        initialCall: true,
    });

    const {data} = useHome(response as Response);
    if (loading) return <SkeletonHome/>;
    if (!response)
        return (
            <div>
                <Title id="resources"/>
                <div className="content-center-page">
                    <NoData/>
                </div>
            </div>
        );
    return (
        <div className="mtb-3">
            <div>
                <Title id="resources"/>
            </div>
            <div className="grid-container">
                {data &&
                    data.map((resource) => (
                        <ResourceCard key={resource.id} {...resource} />
                    ))}
            </div>
        </div>
    );
}
