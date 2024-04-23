import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import CustomButton from "../components/UI/CustomButton";
import CustomLink from "../components/UI/CustomLink";

import classes from "./pages.module.css";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate(-1);
    };

    return (
      <div className={classes["not-found"]}>
        <h1 className={classes["not-found__header"]}>404 PAGE NOT FOUND</h1>
        <p className={classes["not-found__sorry"]}>
          We're sorry but page you're trying to enter doesn't exist.
        </p>
        <div className={classes["not-found__links"]}>
          <CustomButton aria-label="link" onClick={goBackHandler}>
            go back
          </CustomButton>{" "}
          <CustomLink to="/">home page</CustomLink>
        </div>
      </div>
    );
};

export default NotFoundPage;