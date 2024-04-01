"use client";

import {
  ForwardFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Image, notification, Grid } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const { Header, Sider, Content } = Layout;

const { useBreakpoint } = Grid;

export default function UserLayout({ children }) {
  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (
      (screens.xs || screens.sm || screens.md) &&
      (!screens.lg || !screens.xl)
    ) {
      setCollapsed(true);
    }
  }, [screens]);

  const logoutClick = () => {
    notification.success({
      message: "Success",
      description: "Log Out Successfully",
    });
    router.push("/auth");
  };

  return (
    <Layout className="min-h-[100vh] ">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? (
          <div className="flex justify-center my-5">
            <Image
              width={50}
              height={50}
              alt="logo"
              //   className="demo-logo-vertical "
              src="https://cdn.bandmix.com/bandmix_us/media/11/11092/26015-p.jpg"
            />
          </div>
        ) : (
          <div className="text-transparent bg-gradient-to-r from-[#4e54c8] to-[#8f94fb] bg-clip-text text-4xl text-center my-5 font-bold">
            SCRAPE🎭
          </div>
        )}

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "user",
            },
            {
              key: "2",
              icon: <MenuUnfoldOutlined />,
              label: "settings",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="flex items-center justify-between"
          style={{
            padding: 0,
            background: "#8f94fb",
          }}
        >
          <Button
            size="large"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button
            onClick={logoutClick}
            className="text-[1.3rem] me-10 bg-[#4e54c8] text-white rounded-md py-0  px-4 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            size="large"
            icon={<ForwardFilled />}
            // type="primary"
          >
            Log Out
          </Button>
        </Header>
        <Content
          // theme="dark"
          style={{
            // margin: "24px 16px",
            // padding: 24,
            minHeight: 280,
            background: "#000000", //colorBgContainer
            // borderRadius: borderRadiusLG,
          }}
          className="overflow-auto xl:p-24"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
