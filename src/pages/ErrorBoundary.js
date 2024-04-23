import { useRouteError } from "react-router";

import classes from "./pages.module.css";

const ErrorBoundary = () => {
    const error = useRouteError();

        return (
          <div className={classes["error-page"]}>
            <h1 className={classes["error-page__header"]}>
              Something went wrong.
            </h1>
            <p className={classes["error-page__sorry"]}>
              We're very sorry. Try realoading page or contact us.
            </p>
            <p className={classes["error-page__status"]}>
              Error status: {error.status}
            </p>
            <p className={classes["error-page__message"]}>
              {error.message || error.data}
            </p>
          </div>
        );

};

export default ErrorBoundary;