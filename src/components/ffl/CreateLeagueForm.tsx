import React, { useState, useEffect, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLeague } from "../../actions/ffl";
import { useRouter } from "next/router";
import { Form, Input, Button } from "antd";

import type { NextRouter } from "next/router";

const CreateLeagueForm = () => {
  const { creatingLeague } = useSelector((state: any) => state.ffl || false);
  const dispatch = useDispatch();
  const router: NextRouter = useRouter();

  const onFinish = (values: any) => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      const { name, password } = values;
      dispatch(createLeague(name, password));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="create league"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 2 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="name" name="name" rules={[{ required: true, message: "Please enter a league name" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="password" name="password" rules={[{ required: true, message: "Please input a password." }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 2 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateLeagueForm;
