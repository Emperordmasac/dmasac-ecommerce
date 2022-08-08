// internal import
import { useState } from "react";

// external import
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const items = [
    {
        label: "Home",
        key: "mail",
        icon: <MailOutlined />,
    },
    {
        label: "Register",
        key: "SubMenu",
        icon: <SettingOutlined />,
        children: [
            {
                label: "Option 1",
                key: "setting:1",
            },
            {
                label: "Option 2",
                key: "setting:2",
            },
        ],
    },
];

const Header = () => {
    const [current, setCurrent] = useState("");

    const handleClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

export default Header;
