import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "../context/AppStateContext";
import { Header } from "antd/es/layout/layout";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useCallback } from "react";

export const AppBar = () => {
    const { loggedUser, setLoggedUser } = useAppStateContext();
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        localStorage.removeItem('accessToken');
        setLoggedUser(null);
        navigate('/');
    }, [setLoggedUser, navigate])

    if (!loggedUser) return null;

    return (
        <Header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0, 21, 41, 0.08)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <UserOutlined style={{ fontSize: 24, color: '#1890ff', marginRight: 12 }} />
                <span style={{ fontSize: 16, fontWeight: 500 }}>
                    {loggedUser.login}
                </span>
            </div>

            <Space>
                <Button
                    type="primary"
                    onClick={handleLogout}
                >
                    Выход
                </Button>
            </Space>
        </Header>
    );
}