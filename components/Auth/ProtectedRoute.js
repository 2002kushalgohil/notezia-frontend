import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jwt from "jsonwebtoken";
import { setIsAuth, setToken } from "../../Redux/Slices/Auth/AuthSlice";
import { useRouter } from "next/router";
import NavBar from "../NavBar/NavBar";
import SideBar from "../NavBar/SideBar";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuth);

  // -------------------- Is Authenticated checker --------------------
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login");
    }
    if (Jwt.decode(accessToken)?.id) {
      dispatch(setIsAuth(true));
      dispatch(setToken(accessToken));
    } else {
      router.push("/login");
      dispatch(setIsAuth(false));
      dispatch(setToken(""));
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);
  return (
    <>
      {isAuth ? (
        <>
          <section className="layoutParent">
            <div className="layoutMain">
              {!(router.asPath == "/account") && (
                <>
                  <NavBar />
                  <SideBar />
                </>
              )}
              {children}
            </div>
          </section>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
