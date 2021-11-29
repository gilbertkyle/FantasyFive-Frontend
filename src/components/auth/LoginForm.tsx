import React, { useState, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import { Form, Input, Button, Row, Col } from "antd";

const LoginForm = () => {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      const { username, password } = values;
      dispatch(login(username, password));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed: ", errorInfo);
  };

  return (
    <section>
      <Row>
        <Col offset={1}>
          <h2>Login</h2>
        </Col>
      </Row>
      <Form
        name="login"
        wrapperCol={{ span: 2 }}
        labelCol={{ span: 1 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input username", min: 3 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input a password" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 1 }}>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default LoginForm;
