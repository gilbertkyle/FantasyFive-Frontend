import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../actions/auth";
import { Form, Button, Input, Row, Col, message } from "antd";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    const { username, password, rePassword, email } = values;
    if (password !== rePassword) {
      message.error("Passwords do not match");
      return;
    }
    const userData = { username, email, password };
    dispatch(register(userData));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };
  return (
    <section>
      <Row>
        <Col offset={1}>
          <h2>Register</h2>
        </Col>
      </Row>
      <Form
        wrapperCol={{ span: 2 }}
        labelCol={{ span: 1 }}
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: `Username must be at least 3 characters`, min: 3 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirm Password" name="rePassword">
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 1 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default RegisterForm;
