import CustomLink from "../../components/UI/CustomLink";
import Section from "../../components/HomePage/Section";

import classes from "./pages.module.css";

const Home = () => {
    const mainSectionInfo = <div className={classes["main-section__info"]}>
        <h1>Storage App</h1>
        <h2>Store your sales data in easy way</h2>
        <p>
            Keep your data about stock, sales, delivery and contacts in one
            place with the best pricing
        </p>
        <div className={classes["main-section__buttons"]}>
            <CustomLink to="/signup">Join us now</CustomLink>
            <CustomLink to="/plans">Our plans</CustomLink>
        </div>
    </div>;

    const mainSectionImg = <img src="main.png" alt="3d graphic" />

    const plansSectionInfo = <div className={classes["main__bubble"]}>
      <p>Check our pricing and compare to other companies - we gurantee the lowest prices!</p>
      <CustomLink dark={true} to="/plans">See plans</CustomLink>
    </div>

    const demoSectionInfo = <div className={classes["main__bubble"]}>
      <p>Interested but not sure yet? Come and see our demo!</p>
      <CustomLink dark={true} to="/login">Check demo</CustomLink>
    </div>
    
    return (
      <div className={classes["main-container"]}>
        <Section bubble={false} info={mainSectionInfo} img={mainSectionImg} main={true} />
        <Section bubble={true} info={plansSectionInfo} img={mainSectionImg} />
        <Section bubble={true} info={demoSectionInfo} img={mainSectionImg} />
      </div>
    );
};

export default Home;