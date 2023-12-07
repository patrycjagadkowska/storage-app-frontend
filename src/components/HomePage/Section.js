import classes from "./styles/Section.module.css";

const Section = ({ info, img, bubble }) => {
    return (
        <section className={`${classes.section} ${bubble ? classes["section--bubble"] : ""}`}>
            {info}
            <div className={classes["section__img"]}>
                {img}
            </div>
        </section>
    );
};

export default Section;