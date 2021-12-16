import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import WithAuth from "../../components/HOCs/AuthGuard";

import { getLeagues } from "../../actions/ffl";

const FFLDashboard = (props: any) => {
  const { leagues } = useSelector((state: any) => state.ffl);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeagues());
  }, []);

  return (
    <div>
      <h3>FFL dashboard</h3>
      <ul>
        {leagues ? (
          leagues.map((league: any, key: number) => (
            <li key={key}>
              <Link key={key} href={`/ffl/${league.pk}`}>
                <a>{league.name}</a>
              </Link>
            </li>
          ))
        ) : (
          <h2>No leagues joined</h2>
        )}
        <div>
          <Link href="/ffl/create">Create a new league</Link>
        </div>
        <div>
          <Link href="/ffl/join">Join a League</Link>
        </div>
      </ul>
    </div>
  );
};

export default WithAuth(FFLDashboard);
