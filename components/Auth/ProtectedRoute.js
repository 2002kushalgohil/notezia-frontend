import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jwt from "jsonwebtoken";
import { setIsAuth, setToken } from "../../Redux/Slices/Auth/AuthSlice";
import { useRouter } from "next/router";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
    }
    if (Jwt.decode(token)?.id) {
      dispatch(setIsAuth(true));
      dispatch(setToken(token));
    } else {
      router.push("/login");
      dispatch(setIsAuth(false));
      dispatch(setToken(""));
    }
  }, []);

  return <>{isAuth ? <>{children}</> : <></>}</>;
}