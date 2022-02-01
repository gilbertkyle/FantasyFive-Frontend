import React, { useEffect } from "react";
import { Form, Col, Row, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reset_password } from "../../actions/auth";
import { useRouter } from "next/router";

const PasswordSetForm = (props: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = props;
  const { passwordSet } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (passwordSet && passwordSet === true) {
      router.push("/enter");
    }
  }, [passwordSet]);

  const onFinish = (values: any) => {
    if (dispatch && dispatch !== undefined && dispatch !== null) {
      const { password, rePassword } = values;
      if (password !== rePassword) {
        message.error("Passwords do not match");
      } else {
        if (token) {
          dispatch(reset_password(password, token));
        }
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Failed, check console for more info");
    console.log(errorInfo);
  };

  return (
    <section>
      <Row>
        <Col offset={1}>
          <h2>Reset Password</h2>
        </Col>
      </Row>
      <Form
        name="setPassword"
        wrapperCol={{ span: 3 }}
        labelCol={{ span: 1 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelWrap
        colon={false}
      >
        <Form.Item name="password" label="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="rePassword" label="Confirm Password" rules={[{ required: true }]} style={{ color: "red" }}>
          <Input.Password />
        </Form.Item>
        <Row>
          <Col offset={1}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default PasswordSetForm;
