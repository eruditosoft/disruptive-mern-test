import SkeletonCard from "@/components/Skeleton/SkeletonCard.tsx";

export default function SkeletonHome() {
    const body = Array.from({length: 12}, (_, i) => <SkeletonCard key={`resource-sk-${i}`}/>)
    return (
        <div className="mtb-3">
            <div className="skeleton-loader width-300 ml-3"/>
            <div className="grid-container">
                {body}
            </div>
        </div>
    );
}
