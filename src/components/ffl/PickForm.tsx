import React, { useState, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Row, Col, Typography, AutoComplete } from "antd";

const { Title } = Typography;

const PickForm = () => {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      console.log("success");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      console.log("fail");
    }
  };

  const handleSearch = (value: string) => {};

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 2 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row>
        <Col offset={4}>
          <Title level={3}>Make Picks</Title>
        </Col>
      </Row>
      <Form.Item label="Quarterback" name="qb" rules={[{ required: true, message: "Quarterback required" }]}>
        <AutoComplete>
          <AutoComplete.Option value="fart">Tom brady</AutoComplete.Option>
        </AutoComplete>
      </Form.Item>
      <Form.Item label="Running Back" name="rb" rules={[{ required: true, message: "Running back required" }]}>
        <AutoComplete>
          <AutoComplete.Option value="derrick">Derrick Henry</AutoComplete.Option>
        </AutoComplete>
      </Form.Item>
      <Form.Item label="Wide Receiver" name="wr" rules={[{ required: true, message: "Wide receiver required" }]}>
        <AutoComplete>
          <AutoComplete.Option value="wr">Odell</AutoComplete.Option>
        </AutoComplete>
      </Form.Item>
      <Form.Item label="Tight End" name="te" rules={[{ required: true, message: "Tight end required" }]}>
        <AutoComplete>
          <AutoComplete.Option value="tight">Mark andrews</AutoComplete.Option>
        </AutoComplete>
      </Form.Item>
      <Form.Item label="Defense" name="defense" rules={[{ required: true, message: "Defense required" }]}>
        <AutoComplete>
          <AutoComplete.Option value="defense">Seattle toots</AutoComplete.Option>
        </AutoComplete>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 2 }}>
        <Button type="primary" htmlType="submit">
          Submit Picks
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PickForm;
