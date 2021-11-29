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
  return (
    <div>
      {login ? (
        <section>
          <LoginForm />
          <Row>
            <Col offset={1}>
              <small>
                Don't have an account?{" "}
                <span onClick={() => setLogin(!login)} style={{ cursor: "pointer" }}>
                  Register
                </span>
              </small>
            </Col>
          </Row>
        </section>
      ) : (
        <section>
          <RegisterForm />
          <Row>
            <Col offset={1}>
              <small>
                Already have an account?{" "}
                <span onClick={() => setLogin(!login)} style={{ cursor: "pointer" }}>
                  Log In
                </span>
              </small>
            </Col>
          </Row>
        </section>
      )}
    </div>
  );
};

export default EnterPage;
