import React, { useState, useEffect, Children } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeagueDetail, updatePick } from "../../../actions/ffl";
import { useRouter } from "next/router";
import { Table, Popconfirm, Typography, Form, AutoComplete } from "antd";
import PickTable from "../../../components/ffl/PickTable";

const LeagueIndex = () => {
  return <PickTable />;
};
export default LeagueIndex;
