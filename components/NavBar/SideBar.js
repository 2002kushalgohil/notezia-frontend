import { PieChartOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";

export default function SideBar() {
  const [isMenuCollapse, setIsMenuCollapse] = useState(true);
  const menu = [
    {
      label: "Option 1",
      key: 1,
      icon: <PieChartOutlined />,
    },
    {
      label: "Option 2",
      key: 2,
      icon: <PieChartOutlined />,
      children: [
        {
          label: "Sub Option 1",
          key: 3,
          icon: <PieChartOutlined />,
        },
        {
          label: "Sub Option 2",
          key: 4,
          icon: <PieChartOutlined />,
        },
      ],
    },
  ];
  return (
    <div
      style={{
        position: "fixed",
        top: "75px",
        left: 0,
        height: "100vh",
        zIndex: 1000,
      }}
    >
      <Menu
        mode="inline"
        inlineCollapsed={isMenuCollapse}
        items={menu}
        style={{
          height: "100%",
          border: "none",
        }}
        onMouseEnter={() => {
          setIsMenuCollapse(false);
        }}
        onMouseLeave={() => {
          setIsMenuCollapse(true);
        }}
      />
    </div>
  );
}
