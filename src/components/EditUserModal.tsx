import React from 'react';
import { Modal, Form, Input, Button, Popconfirm, Space } from 'antd';
import { TUserData, UpdateUserData } from '../types/user';
import { userService } from '../services/userService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface EditUserModalProps {
    user: TUserData | null;
    open: boolean;
    onClose: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, open, onClose }) => {
    const [form] = Form.useForm<UpdateUserData>();
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: userService.updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            form.resetFields();
            onClose();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => userService.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            onClose();
        },
    });

    React.useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user, form]);

    const onFinish = (values: UpdateUserData) => {
        if (user) {
            updateMutation.mutate({ ...values, id: user.id });
        }
    };

    const handleDelete = () => {
        if (user) {
            deleteMutation.mutate(user.id);
        }
    };

    return (
        <Modal
            title="Редактирование пользователя"
            open={open}
            onCancel={updateMutation.isPending || deleteMutation.isPending ? undefined : onClose}
            footer={null}
            closable={!(updateMutation.isPending || deleteMutation.isPending)}
            maskClosable={!(updateMutation.isPending || deleteMutation.isPending)}
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item label="id" name="id">
                    <Input disabled placeholder={user?.id?.toString() || ''} />
                </Form.Item>

                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[
                        { min: 2, message: 'Имя должно быть не менее 2 символов' },
                    ]}
                >
                    <Input placeholder="Введите имя" />
                </Form.Item>

                <Form.Item
                    label="Ссылка на аватарку"
                    name="avatar"
                    rules={[
                        {
                            pattern: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))(?:\?.*)?$/,
                            message: 'Введите корректную ссылку на изображение',
                        },
                    ]}
                >
                    <Input placeholder="https://example.com/avatar.png" />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Popconfirm
                            title="Удалить пользователя?"
                            description="Это действие нельзя отменить"
                            onConfirm={handleDelete}
                            okText="Да"
                            cancelText="Нет"
                            disabled={deleteMutation.isPending}
                        >
                            <Button
                                type="primary"
                                loading={deleteMutation.isPending}
                                disabled={updateMutation.isPending || deleteMutation.isPending}
                            >
                                Удалить
                            </Button>
                        </Popconfirm>

                        <Space>

                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={updateMutation.isPending}
                                disabled={updateMutation.isPending || deleteMutation.isPending}
                            >
                                Сохранить
                            </Button>
                            <Button
                                type="primary"
                                onClick={onClose}
                                disabled={updateMutation.isPending || deleteMutation.isPending}
                            >
                                Отмена
                            </Button>
                        </Space>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};
