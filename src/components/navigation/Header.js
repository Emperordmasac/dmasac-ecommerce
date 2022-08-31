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
import firebase from "firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let { user } = useSelector((state) => ({ ...state }));

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    const handleLogout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        toast.success("Logout Successful");
        navigate("login");
    };

    return (
        <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            //items={}
        >
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            {user && (
                <SubMenu
                    icon={<SettingOutlined />}
                    title={user.email && user.email.split("@")[0]}
                    key="Username"
                    className="float-right"
                >
                    {user && user.role === "subscriber" && (
                        <Item key="user-dashboard">
                            <Link to="/user/history">Dashboard</Link>
                        </Item>
                    )}
                    {user && user.role === "admin" && (
                        <Item key="admin-dashboard">
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Item>
                    )}

                    <Item
                        key="logout"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Item>
                </SubMenu>
            )}
            {!user && (
                <Item key="login" icon={<UserOutlined />}>
                    <Link to="/login">Login</Link>
                </Item>
            )}

            {!user && (
                <Item key="register" icon={<UserAddOutlined />}>
                    <Link to="/register">Register</Link>
                </Item>
            )}
        </Menu>
    );
};

export default Header;
