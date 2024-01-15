import classes from "./styles/Reviews.module.css";

const Review = ({ review, author }) => {
    return (
        <div className={classes.review}>
            <blockquote className={classes["review__content"]}>"{review}"</blockquote>
            <span className={classes["review__author"]}>~ {author}</span>
        </div>
    );
};

export default Review;