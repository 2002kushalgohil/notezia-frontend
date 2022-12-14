import { Col, Dropdown, Input, Menu, Row, Skeleton } from "antd";
import {
  LogoutOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CaretDownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useUserProfileQuery } from "../Redux/Services/service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../Redux/Slices/User/userSlice";
import Link from "next/link";

export default function NavBar() {
  const userData = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const router = useRouter();

  const items = [
    {
      label: (
        <Row justify="center" align="middle">
          <img
            style={{
              cursor: "pointer",
              width: 35,
              height: 35,
              objectFit: "cover",
              borderRadius: 50,
              marginRight: "var(--mpr-2)",
            }}
            src={userData?.photos?.secure_url}
          />
          <div>
            <h4>{userData?.name}</h4>
            <p className="opacity05">{userData?.email}</p>
          </div>
        </Row>
      ),
      key: "1",
      onClick: () => {
        router.push("/account");
      },
    },
    {
      type: "divider",
    },
    {
      label: "Profile",
      key: "2",
      icon: <UserOutlined />,
      onClick: () => {
        router.push("/account");
      },
    },
    {
      label: "Help & Support",
      key: "3",
      icon: <QuestionCircleOutlined />,
    },
    {
      type: "divider",
    },
    {
      label: "Log Out",
      key: "4",
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      },
    },
  ];

  const { data, isSuccess, isError, isLoading } = useUserProfileQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserProfile(data?.data));
    }
  }, [isSuccess, isError]);

  const skeleton = () => {
    return (
      <Row justify="end" align="middle" gutter={[15, 0]}>
        <Col>
          <Skeleton.Button
            active={true}
            shape="default"
            block={true}
            style={{
              width: "100px",
            }}
          />
        </Col>
        <Col>
          <Skeleton.Avatar size="large" active={true} />
        </Col>
      </Row>
    );
  };
  return (
    <Row
      style={{
        borderBottom: "1px solid var(--border-color)",
        padding: "var(--mpr-2) var(--mpr-1)",
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        top: 0,
        backdropFilter: "blur(10px)",
      }}
      justify="center"
      align="middle"
    >
      <Col {...{ xs: 7, sm: 12, md: 4, lg: 3 }}>
        <Link href="/">
          <h2
            style={{
              cursor: "pointer",
            }}
          >
            Notezia
          </h2>
        </Link>
      </Col>
      <Col {...{ xs: 0, sm: 0, md: 13, lg: 9 }}>
        <Input
          prefix={<SearchOutlined className="site-form-item-icon" />}
          size="large"
          placeholder="Search"
        />
      </Col>
      <Col {...{ xs: 17, sm: 12, md: 7, lg: 12 }}>
        {isLoading ? (
          skeleton()
        ) : (
          <Row justify="end" align="middle" gutter={[15, 0]}>
            <Col>
              <p
                style={{
                  opacity: "0.5",
                  textAlign: "end",
                }}
              >
                Welcome
              </p>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <h3
                  onClick={(e) => e.preventDefault()}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {userData?.name}
                  <CaretDownOutlined
                    style={{
                      opacity: "0.5",
                      marginLeft: "5px",
                    }}
                  />
                </h3>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <img
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    cursor: "pointer",
                    width: 45,
                    height: 45,
                    objectFit: "cover",
                    borderRadius: 50,
                    border: "1px solid var(--border-color)",
                  }}
                  src={userData?.photos?.secure_url}
                />
              </Dropdown>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}
