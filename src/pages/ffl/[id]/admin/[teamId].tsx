import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import PickTable from "../../../../components/ffl/PickTable";

const AdminTeamIndex = () => {
  const router = useRouter();
  const { teamId } = router.query;
  const league = useSelector((state: any) => state.ffl.selectedLeague);
  const team = league?.teams.find((team: any) => team.pk == teamId);
  const user = team?.owner;

  return (
    <>
      <PickTable admin user={user} />
    </>
  );
};

export default AdminTeamIndex;
