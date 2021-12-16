import React, { useEffect } from "react";
import type { NextComponentType } from "next";
import { useSelector } from "react-redux";
import Router from "next/router";

function withAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const { isAuthenticated } = useSelector((state: any) => state.auth);

    useEffect(() => {
      if (!isAuthenticated) {
        Router.push("/enter");
      }
    }, []);

    return <Component {...props} />;
  };
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }
  return Auth;
}

export default withAuth;
