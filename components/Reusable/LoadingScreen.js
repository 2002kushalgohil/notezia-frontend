import { Col, Row } from "antd";

export default function LoadingScreen({ isLoading }) {
  return (
    <Row
      style={{
        height: "100vh",
        zIndex: 1005,
        backdropFilter: "blur(5px)",
        position: "fixed",
        top: "0",
        width: "100%",
        display: isLoading ? "grid" : "none",
        placeItems: "center",
      }}
    >
      <div className="loadingContainer">
        <span className="loadingOne loadingTile"></span>
        <span className="loadingTwo loadingTile"></span>
        <span className="loadingThree loadingTile"></span>
        <span className="loadingFour loadingTile"></span>
      </div>
    </Row>
  );
}
