import LoginForm from "../components/Auth/LoginForm";
import CustomLink from "../components/UI/CustomLink";

import classes from "./pages.module.css";

const Login = () => {
    return (
      <div className={classes["page-content"]}>
        <section className={classes.section}>
          <h1>Enter you data to log in</h1>
          <LoginForm />
          <div className={classes["cta-container"]}>
            <img src="auth.png" alt="authorization" />
            <h2>Don't have an account yet?</h2>
            <p>You can take just a moment to join our great community!</p>
            <CustomLink to="/signup" dark={true}>Sign up</CustomLink>
          </div>
        </section>
      </div>
    );
};

export default Login;