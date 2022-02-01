import React from "react";
import { useRouter } from "next/router";
import PasswordSetForm from "../../../components/auth/PasswordSetForm";

const index = (props: any) => {
  const router = useRouter();
  const { token, username } = router.query;
  return (
    <section>
      <h2>Password change for {username}</h2>
      <PasswordSetForm token={token} />
    </section>
  );
};

export default index;
