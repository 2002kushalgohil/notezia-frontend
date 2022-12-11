import { Col, Dropdown, Input, Menu, Row } from "antd";
import {
  LogoutOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
export default function NavBar() {
  const items = [
    {
      label: (
        <Row>
          <img
            style={{
              cursor: "pointer",
              width: 35,
              height: 35,
              objectFit: "cover",
              borderRadius: 50,
              marginRight: "var(--mpr-2)",
            }}
            src="https://res.cloudinary.com/dryviglqd/image/upload/v1670610093/users/avataaars_odsvbg.png"
          />
          <div>
            <h4>Kushal</h4>
            <p className="opacity05">kushalgohil12@gmail.com</p>
          </div>
        </Row>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "Profile",
      key: "2",
      icon: <UserOutlined />,
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

  return (
    <Row
      style={{
        borderBottom: "1px solid var(--border-color)",
        padding: "var(--mpr-2) var(--mpr-1)",
      }}
      justify="center"
      align="middle"
    >
      <Col {...{ xs: 12, sm: 12, md: 4, lg: 3 }}>
        <h2>Notezia</h2>
      </Col>
      <Col {...{ xs: 0, sm: 0, md: 15, lg: 9 }}>
        <Input
          prefix={<SearchOutlined className="site-form-item-icon" />}
          size="large"
          placeholder="Search"
        />
      </Col>
      <Col {...{ xs: 12, sm: 12, md: 5, lg: 12 }}>
        <Row justify="end" align="middle">
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
              src="https://res.cloudinary.com/dryviglqd/image/upload/v1670610093/users/avataaars_odsvbg.png"
            />
          </Dropdown>
        </Row>
      </Col>
    </Row>
  );
}
