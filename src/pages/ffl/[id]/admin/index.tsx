import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card } from "antd";

const AdminIndex = () => {
  const teams = useSelector((state: any) => state.ffl.selectedLeague?.teams);
  const router = useRouter();
  const { id } = router.query;

  return (
    <section>
      {teams &&
        teams.map((team: any) => (
          <Card
            title={<Link href={`/ffl/${id}/admin/${team.pk}`}>{team.name}</Link>}
            style={{ width: 300, margin: "1rem" }}
          >
            <p>Owner: {team.owner?.username}</p>
          </Card>
        ))}
    </section>
  );
};

export default AdminIndex;
