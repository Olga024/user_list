import { Button, Checkbox, Form, Input } from "antd"
import Title from "antd/es/typography/Title";
import { useAppStateContext } from "../context/AppStateContext";
import useNotification from "antd/es/notification/useNotification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/authService";

type FieldType = {
  username?: string,
  password?: string,
  remember?: boolean,
};

export const AuthForm = () => {
  const navigate = useNavigate();
  const { setLoggedUser } = useAppStateContext();
  const notifyError = useNotification();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: FieldType) => await authenticate(data.username!, data.password!),
    onSuccess: (token) => {
      console.log("Полученный токен:", token);
      window.localStorage.setItem('accessToken', token);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setLoggedUser({  });//
      navigate('/users');
    },
    onError: (err) => {
      Error(err.message || 'Ошибка авторизации');
    },
  });

  const handleSubmit = (values: FieldType) => {
    mutation.mutate(values);
  };

  return <>
    <Form
      name="basic"
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={handleSubmit}
    >
      <Title
        style={{
          fontSize: 24,
          fontWeight: 'normal',
          marginBottom: 16,
          textAlign: "left",
        }}
      >Авторизация </Title>
      <Form.Item<FieldType>
        name="username"
        rules={[{ required: true, message: 'Введите логин!' }]}
      >
        <Input
          autoComplete="current-login"
          placeholder="Логин"

        />
      </Form.Item>
      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: 'Введите пароль!' }]}
      >
        <Input.Password
          autoComplete="current-password"
          placeholder="Пароль" />
      </Form.Item>
      <Form.Item
        label={null}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          loading={mutation.isSuccess}
          disabled={mutation.isSuccess}
          type="primary"
          htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  </>
}