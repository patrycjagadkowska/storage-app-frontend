import SignupForm from "../components/Auth/SignupForm";

import classes from "./pages.module.css";

const Signup = () => {
    return (
      <div className={classes["page-content"]}>
        <section className={classes.section}>
            <h1>Create new account</h1>
            <SignupForm />
            <div className={classes["cta-container"]}>
                <img src="auth.png" alt="authorization" />
                <h2>Join our community</h2>
                <p>
                    Create new account and enjoy the best app to control your
                    inventory.
                </p>
            </div>
        </section>
      </div>
    );
};

export default Signup;