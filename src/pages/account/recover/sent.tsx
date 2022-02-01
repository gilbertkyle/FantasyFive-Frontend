import React from "react";
import { useRouter } from "next/router";

const RecoverySentPage = () => {
  const router = useRouter();
  const { email } = router.query;
  return (
    <section>
      <p>An email has been sent to {email}.</p>
    </section>
  );
};

export default RecoverySentPage;
