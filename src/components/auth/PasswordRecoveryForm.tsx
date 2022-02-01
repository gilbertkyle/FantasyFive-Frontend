import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { recover_password } from "../../actions/auth";
import { useRouter } from "next/router";

const PasswordRecoveryForm = () => {
  const { emailSent } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (emailSent && emailSent === true) {
      const fields = form.getFieldsValue();
      router.push(
        {
          pathname: "/account/recover/sent",
          query: { email: fields.email },
        },
        "/account/recover/sent"
      );
    }
  }, [emailSent]);

  const onFinish = async (values: any) => {
    const { email } = values;

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      await dispatch(recover_password(email));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("not cool");
    console.log(errorInfo);
  };

  return (
    <section>
      <Row>
        <Col offset={1}>
          <h2>Recover Password</h2>
        </Col>
      </Row>
      <Form
        form={form}
        name="recover"
        wrapperCol={{ span: 3 }}
        labelCol={{ span: 1 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="email" name="email" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>
        <Row>
          <Col offset={1}>
            <Button type="primary" htmlType="submit">
              Recover
            </Button>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default PasswordRecoveryForm;
