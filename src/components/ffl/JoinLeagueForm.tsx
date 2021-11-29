import React, { useState, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { joinLeague } from "../../actions/ffl";
import { Form, Button, Input, Row, Col, Typography, AutoComplete } from "antd";

const { Title } = Typography;

const JoinLeagueForm = () => {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      const { name, password } = values;
      dispatch(joinLeague(name, password));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed: ", errorInfo);
  };

  const data = ["fart", "poop", "doodoo butter"];

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 2 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row>
        <Col span={4} offset={4}>
          <Title level={3}>Join League</Title>
        </Col>
      </Row>
      <Form.Item label="League name" name="league" rules={[{ required: true, message: "Enter a league name" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: "Enter a password" }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 2 }}>
        <Button type="primary" htmlType="submit">
          Join
        </Button>
      </Form.Item>
    </Form>
  );
};

export default JoinLeagueForm;
