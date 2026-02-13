import { Button, Form, Input, notification } from "antd";
import Title from "antd/es/typography/Title";
import { useAppStateContext } from "../context/AppStateContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/authService";
import { TUser } from "../types/auth";

export const AuthForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setLoggedUser } = useAppStateContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: authenticate,
    onSuccess: (token) => {
      localStorage.setItem('accessToken', token);
      setLoggedUser({ login: 'admin', password: 'admin' });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('/users');
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка авторизации',
        description: error.message,
        duration: 10,
      });
    },
  });

  const onFinish = (values: TUser) => {
    mutation.mutate(values);
  };

  return (
    <Form form={form} name="basic" onFinish={onFinish} autoComplete="off" style={{ maxWidth: 600 }}>
      <Title style={{ fontSize: 24, fontWeight: 'normal', marginBottom: 16, textAlign: "left" }}>
        Авторизация
      </Title>

      <Form.Item name="login" rules={[{ required: true, message: 'Введите логин!' }]}>
        <Input autoComplete="current-login" placeholder="Логин" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль!' }]}>
        <Input.Password autoComplete="current-password" placeholder="Пароль" />
      </Form.Item>

      <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          loading={mutation.isPending}
          disabled={mutation.isPending}
          type="primary"
          htmlType="submit"
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
