// internal import
import { useState } from "react";

// external import
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");
    const navigate = useNavigate();
    let dispatch = useDispatch();

    const handleClick = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    const handleLogout = () => {
        let auth = getAuth();
        try {
            signOut(auth).then(() => {
                dispatch({
                    type: "LOGOUT",
                    payload: null,
                });
                toast.success("Logout Successful");
                navigate("login");
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            // items={items}
        >
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            <SubMenu icon={<SettingOutlined />} title="Username" key="Username">
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
                <Item
                    key="logout"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                >
                    Logout
                </Item>
            </SubMenu>

            <Item key="login" icon={<UserOutlined />}>
                <Link to="/login">Login</Link>
            </Item>

            <Item key="register" icon={<UserAddOutlined />}>
                <Link to="/register">Register</Link>
            </Item>
        </Menu>
    );
};

export default Header;

// const items = [
//     {
//         label: "Home",
//         key: "home",
//         icon: <AppstoreOutlined />,
//     },
//     {
//         label: "Login",
//         key: "login",
//         icon: <UserOutlined />,
//     },
//     {
//         label: "Register",
//         key: "register",
//         marginLeft: "20rem",
//         icon: <UserAddOutlined />,
//     },
//     {
//         label: "Username",
//         key: "SubMenu",
//         icon: <SettingOutlined />,
//         children: [
//             {
//                 label: "Option 1",
//                 key: "setting:1",
//             },
//             {
//                 label: "Option 2",
//                 key: "setting:2",
//             },
//         ],
//     },
// ];
