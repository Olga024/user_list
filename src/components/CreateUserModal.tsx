import React from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import { CreateUserData } from '../types/user';
import { userService } from '../services/userService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateUserModalProps {
    open: boolean;
    onClose: () => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose }) => {
    const [form] = Form.useForm<CreateUserData>();
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: userService.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            form.resetFields();
            onClose();
        },
    });

    const onFinish = (values: CreateUserData) => {
        createMutation.mutate(values);
    };

    return (
        <Modal
            title="Создание пользователя"
            open={open}
            onCancel={createMutation.isPending ? undefined : onClose}
            footer={null}
            closable={!createMutation.isPending}
            maskClosable={!createMutation.isPending}
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
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
                <Form.Item style={{ marginBottom: 0, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <Space size={8}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={createMutation.isPending}
                            disabled={createMutation.isPending}
                        >
                            Создать
                        </Button>
                        <Button
                            onClick={onClose}
                            disabled={createMutation.isPending}
                            type="primary"
                        >
                            Отмена
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};
