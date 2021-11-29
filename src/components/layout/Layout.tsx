import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import styles from "../../../styles/Layout.module.css";
import Link from "next/link";

import { request_refresh } from "../../actions/auth";

const { Header, Content, Footer } = Layout;

const AppLayout = (props: any) => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(request_refresh());
    }
  }, [dispatch]);

  return (
    <Layout className="layout">
      <Header className={styles.header}>
        <div className="logo" />
        <Menu mode="horizontal" theme="dark" style={{ maxWidth: "100%", minWidth: "20%" }} selectable={false}>
          <Menu.Item key="ffl">
            <Link href="/ffl">FFL</Link>
          </Menu.Item>
          <Menu.Item key="login">{user ? user.username : <Link href="/enter">Login</Link>}</Menu.Item>
        </Menu>
      </Header>
      <Content>{props.children}</Content>
      <Footer></Footer>
    </Layout>
  );
};

export default AppLayout;
