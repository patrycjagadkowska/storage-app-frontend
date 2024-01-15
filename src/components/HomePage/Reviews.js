import { useState, useEffect } from "react";

import Review from "./Review";

import classes from "./styles/Reviews.module.css";

const Reviews = ({ reviews }) => {
    const [ reviewsList, setReviewsList] = useState([]);

    useEffect(() => {
        if (!reviews || reviews.length === 0) {
            setReviewsList([]);
            return;
        }

        const mappedReviews = reviews.map((review, index) => {
            const { text, author } = review;
            return <Review review={text} author={author} key={`${index}/${author}`} />
        });
        setReviewsList(mappedReviews);
    }, [reviews]);

    return (
        <div className={classes.reviews}>
            { reviewsList }
        </div>
    );
};

export default Reviews;