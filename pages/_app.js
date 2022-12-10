import { ConfigProvider } from "antd";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
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
  );
}

export default MyApp;
