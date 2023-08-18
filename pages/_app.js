import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "../Redux/store";
import "../styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import cloudinary from "cloudinary/lib/cloudinary";
import Head from "next/head";
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
          <Head>
            <title>Notezia by Kushal Gohil</title>
            <meta name="title" content="Notezia by Kushal Gohil" />
            <meta
              name="description"
              content="Unlock seamless teamwork with Notezia: The collaborative note-taking app by Kushal Gohil. Effortlessly share, edit, and innovate together!"
            />
            <meta
              name="keywords"
              content="Note , Notezia , Google Keep , Kushal Gohil"
            />
            <meta name="robots" content="index, follow" />
            <meta
              http-equiv="Content-Type"
              content="text/html; charset=utf-8"
            />
            <meta name="language" content="English" />
          </Head>
          <Component {...pageProps} />
        </ConfigProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
