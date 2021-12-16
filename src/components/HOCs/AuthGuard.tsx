import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import user from "../../pages/api/accounts/user";

const WithAuth = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const { user } = useSelector((state: any) => state.auth);

    if (user) {
      return <Component {...props} />;
    }
    router.push(`/enter`);

    return null;
  };
};

export default WithAuth;
