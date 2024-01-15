import Reviews from "../../components/HomePage/Reviews";

import classes from "./pages.module.css";

const ReviewsPage = () => {
    const reviews = [
      {
        text:
          "I didn't know that keeping all my sales data can be that much easy! I am using recommended program and I'm very satisfied with it.",
        author: "Tom",
      },
      {
        text:
          "The best technical support I've ever seen, my problem was resolved in a couple of minutes. And I only needed it once!",
        author: "Anne",
      },
      {
        text:
          "I can't imagine anymore managing my business without StorageApp. Everything is so simple and well planned.",
        author: "Andrew",
      },
    ];

    return (
      <>
        <section className={classes["main-section"]}>
          <img src="review.svg" alt="review" />
          <div className={classes["main-section__info"]}>
            <h2>Check what they say about us</h2>
            <p>
              Read our customer's reviews and find out how good it is to join
              us!
            </p>
          </div>
        </section>
        <Reviews reviews={reviews} />
      </>
    );
};

export default ReviewsPage;