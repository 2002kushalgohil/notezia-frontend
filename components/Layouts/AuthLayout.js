import { Col, Row } from "antd";
import Sidebar from "../Auth/Sidebar";
import styles from "../../styles/Auth.module.css";
export default function AuthLayout({ children }) {
  return (
    <div className={styles.parent}>
      <img
        src="/etc/blob 4.svg"
        className={styles.bgEtc}
        style={{
          top: "-300px",
          left: "-200px",
          width: "700px",
        }}
      />
      <Row className={`${styles.card} boxShadow`}>
        <Col {...{ xs: 0, sm: 0, md: 12, lg: 13, xl: 13 }}>
          <Sidebar />
        </Col>
        <Col
          {...{ xs: 24, sm: 24, md: 12, lg: 11, xl: 11 }}
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src="/etc/blob 1.svg"
            className={`${styles.bgEtc} ${styles.blobAnimation1} ${styles.responsoveBlob}`}
            style={{
              top: "-120px",
              left: "-100px",
              width: "350px",
              opacity: 0.15,
            }}
          />
          <div className={styles.authMainDiv}>{children}</div>
          <img
            src="/etc/blob 7.svg"
            className={`${styles.bgEtc} ${styles.blobAnimation4} ${styles.responsoveBlob}`}
            style={{
              bottom: "-120px",
              right: "-100px",
              width: "350px",
              opacity: 0.15,
            }}
          />
        </Col>
      </Row>
      <img
        src="/etc/blob 6.svg"
        className={styles.bgEtc}
        style={{
          top: "20%",
          right: "-200px",
          width: "700px",
        }}
      />
    </div>
  );
}
