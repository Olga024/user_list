import React, { useState } from 'react';
import {
  Table, Button, Avatar, Tag, Space, Typography, Card,
} from 'antd';
import { useQuery } from '@tanstack/react-query';
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

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });

  const handleEditUser = (user: TUserData) => {
    setEditUser(user);
    setEditModalVisible(true);
  };

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string, record: TUserData) => <Avatar
        src={avatar}
        size={48}
        onClick={() => handleEditUser(record)}
      />,
    },
    {
      title: '',
      key: 'info',
      render: (_text: string, record: TUserData) => (
        <Space direction="vertical" size="small">
          <Text
            strong
            onClick={() => handleEditUser(record)}
            style={{ cursor: 'pointer' }}
          >
            {record.name}
          </Text>
          <Text type='secondary' >
            Зарегистрирован {dayjs(record.createdAt).format('DD.MM.YYYY')}
          </Text>
        </Space>
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
        </div>
        <Table
          columns={columns}
          dataSource={users || []}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
          size="middle"
          showHeader={false}
        />
        <Space style={{
          display: 'flex',
        }}>
          <Button
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            Создать пользователя
          </Button>
        </Space>
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
