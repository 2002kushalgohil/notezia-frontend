import { Carousel } from "antd";
import styles from "../../styles/Auth.module.css";
export default function Sidebar() {
  return (
    <div
      style={{
        backgroundColor: "var(--primary-color)",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--mpr-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/etc/blob 1.svg"
        className={`${styles.bgEtc} ${styles.blobAnimation1}`}
        style={{
          left: "-100px",
          width: "300px",
        }}
      />

      <img
        src="/etc/blob 7.svg"
        className={styles.bgEtc}
        style={{
          top: "10px",
          left: "30%",
          width: "50px",
        }}
      />

      <img
        src="/etc/blob 2.svg"
        className={styles.bgEtc}
        style={{
          top: "40px",
          right: "30%",
          width: "50px",
        }}
      />

      <img
        src="/etc/blob 3.svg"
        className={`${styles.bgEtc} ${styles.blobAnimation2}`}
        style={{
          right: "-100px",
          width: "300px",
        }}
      />

      <div
        style={{
          width: "80%",
          zIndex: "1",
        }}
      >
        <Carousel autoplay autoplaySpeed={2500} dots={false} effect="scrollx">
          {["/sidebar 1.png", "/sidebar 2.png"].map((data, index) => {
            return <img key={index} src={data} />;
          })}
        </Carousel>
      </div>

      <div
        className="whiteBlob"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.2,
          zIndex: 0,
        }}
      ></div>

      <img
        src="/etc/blob 2.svg"
        className={`${styles.bgEtc} ${styles.blobAnimation3}`}
        style={{
          left: "-100px",
          width: "300px",
        }}
      />

      <img
        src="/etc/blob 3.svg"
        className={styles.bgEtc}
        style={{
          bottom: "10px",
          left: "30%",
          width: "50px",
        }}
      />

      <img
        src="/etc/blob 5.svg"
        className={styles.bgEtc}
        style={{
          bottom: "40px",
          right: "30%",
          width: "50px",
        }}
      />

      <img
        src="/etc/blob 7.svg"
        className={`${styles.bgEtc} ${styles.blobAnimation4} `}
        style={{
          right: "-100px",
          width: "300px",
        }}
      />
    </div>
  );
}
