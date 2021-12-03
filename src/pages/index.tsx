import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWeek } from "../actions/ffl";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeek());
  }, []);
  return <h1>Dashboard</h1>;
};

export default Home;
