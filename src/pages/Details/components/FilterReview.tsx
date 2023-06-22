type FilterReviewProps = {
    setFilterMode : (mode: string) => void;
}

export const FilterReview = ({setFilterMode}: FilterReviewProps) => {

    return (
        <section id="filter-review">
            <h3>sort review by</h3>
            <button onClick={() => setFilterMode("popular")} className="button">Popular</button>
            <button onClick={() => setFilterMode("date")} className="button">Date</button>
        </section>
    )
}