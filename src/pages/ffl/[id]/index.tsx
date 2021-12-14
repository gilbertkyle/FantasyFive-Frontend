import React, { useState, useEffect, Children } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { getLeagueDetail, fetchWeek } from "../../../actions/ffl";

import PickTable from "../../../components/ffl/PickTable";

const LeagueIndex = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const league = useSelector((state: any) => state.ffl.selectedLeague);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(getLeagueDetail(id));
  }, [id]);

  useEffect(() => {
    dispatch(fetchWeek());
  }, []);

  return (
    <>
      <Link href={`/ffl/${id}/admin`}>
        <a>Admin</a>
      </Link>
      {league && user && <PickTable user={user} league={league} />}
    </>
  );
};
export default LeagueIndex;
