import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { CreateUserData } from '../types/user';
import { userService } from '../services/userService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

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
            title="Создать пользователя"
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
                        { required: true, message: 'Введите имя!' },
                        { min: 2, message: 'Имя должно быть не менее 2 символов' },
                    ]}
                >
                    <Input placeholder="Введите имя" />
                </Form.Item>

                <Form.Item
                    label="Ссылка на аватар"
                    name="avatar"
                    rules={[
                        { required: true, message: 'Введите ссылку на аватар!' },
                        {
                            pattern: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))(?:\?.*)?$/,
                            message: 'Введите корректную ссылку на изображение',
                        },
                    ]}
                >
                    <Input placeholder="https://example.com/avatar.png" />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <Button onClick={onClose} disabled={createMutation.isPending}>
                        Отмена
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={createMutation.isPending}
                        disabled={createMutation.isPending}
                    >
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
