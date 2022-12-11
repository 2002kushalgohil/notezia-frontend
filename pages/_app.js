import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "../Redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              borderRadiusLG: "7.5px",
              lineHeightLG: "35px",
            },
          },
          colorPrimary: "#275bc3",
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
}

export default MyApp;
