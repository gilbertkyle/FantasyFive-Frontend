import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { useStore } from "../store";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />{" "}
        </Layout>
      </Provider>
    </>
  );
}
export default MyApp;
