import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "../Redux/store";
import "../styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import cloudinary from "cloudinary/lib/cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_API_SECRET,
});

function MyApp({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId="922861341468-7k0nmpi57pa0v3uise7a6l9833101btn.apps.googleusercontent.com">
      <Provider store={store}>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                lineHeightLG: "35px",
              },
              Form: {
                marginLG: "10px",
              },
            },
            token: {
              colorPrimary: "#275bc3",
              colorInfo: "#275bc3",
              colorTextBase: "#1a1a1a",
              borderRadius: 7.5,
            },
          }}
        >
          <Component {...pageProps} />
        </ConfigProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
