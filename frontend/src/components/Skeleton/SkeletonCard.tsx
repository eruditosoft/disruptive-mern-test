import './styles.css';

export default function SkeletonCard() {

    return (<div className="skeleton-container">
        <div className="skeleton-loader width-100"/>
        <div className="skeleton-loader rectangle"/>
    </div>);
}
