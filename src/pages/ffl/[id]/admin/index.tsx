import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminIndex = () => {
  const teams = useSelector((state: any) => state.ffl.selectedLeague?.teams);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {});
  return (
    <section>
      {teams && teams.map((team: any) => <Link href={`/ffl/${id}/admin/${team.pk}`}>{team.name}</Link>)}
    </section>
  );
};

export default AdminIndex;
