import React, { useState } from 'react';
import {
  Table, Button, Avatar, Tag, Space, Typography, Card,
} from 'antd';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useAppStateContext } from '../context/AppStateContext';
import { TUserData } from '../types/user';
import { userService } from '../services/userService';
import { CreateUserModal } from '../components/CreateUserModal';
import { EditUserModal } from '../components/EditUserModal';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const { Text } = Typography;

export const UserListPage: React.FC = () => {

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editUser, setEditUser] = useState<TUserData | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const { setLoggedUser } = useAppStateContext();

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setLoggedUser(null);
  };

  const handleEditUser = (user: TUserData) => {
    setEditUser(user);
    setEditModalVisible(true);
  };

  const columns = [
    {
      title: 'Аватар',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string) => <Avatar src={avatar} size={48} />,
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (_text: string, record: TUserData) => (
        <Space>
          <Text
            strong
            onClick={() => handleEditUser(record)}
            style={{ cursor: 'pointer' }}
          >
            {record.name}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Зарегистрирован',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <Tag color="blue">
          {dayjs(date).format('DD.MM.YYYY')}
        </Tag>
      ),
    },
  ];

  if (error) {
    return <div style={{ padding: 24 }}>Ошибка загрузки пользователей</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
        }}>
          <h2 style={{ margin: 0 }}>Список пользователей</h2>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateModalVisible(true)}
            >
              Создать пользователя
            </Button>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
              Выход
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={users || []}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
          size="middle"
        />
      </Card>

      <CreateUserModal open={createModalVisible} onClose={() => setCreateModalVisible(false)} />
      <EditUserModal
        user={editUser}
        open={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
          setEditUser(null);
        }}
      />
    </div>
  );
};
