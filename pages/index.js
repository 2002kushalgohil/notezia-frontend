import ProtectedRoute from "../components/Auth/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      {/* <h1>Hello World</h1> */}
    </ProtectedRoute>
  );
}
