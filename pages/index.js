import ProtectedRoute from "../components/Auth/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <button
        onClick={() => {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }}
      >
        Log out
      </button>
    </ProtectedRoute>
  );
}
