import React, { useState } from "react";
import Link from "next/link";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Row, Col } from "antd";

const EnterPage = () => {
  const [login, setLogin] = useState(true);
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  if (isAuthenticated) {
    router.push("/");
  }

  const loginSection = (
    <section>
      <LoginForm />
      <Row>
        <Col offset={1}>
          <small>
            Don't have an account?{" "}
            <span onClick={() => setLogin(!login)} style={{ cursor: "pointer" }}>
              <a href="#">Register</a>
            </span>
          </small>
        </Col>
      </Row>
    </section>
  );

  const pwRecoverSection = (
    <Row>
      <Col offset={1}>
        <small>
          <Link href="/account/recover">
            <a href="#">Forgot your password?</a>
          </Link>
        </small>
      </Col>
    </Row>
  );

  const registerSection = (
    <section>
      <RegisterForm />
      <Row>
        <Col offset={1}>
          <small>
            Already have an account?{" "}
            <span onClick={() => setLogin(!login)} style={{ cursor: "pointer" }}>
              <a href="#">Log In</a>
            </span>
          </small>
        </Col>
      </Row>
    </section>
  );

  return (
    <>
      {login ? (
        <>
          {loginSection} {pwRecoverSection}
        </>
      ) : (
        <>
          {registerSection} {pwRecoverSection}
        </>
      )}
    </>
  );
};

export default EnterPage;
