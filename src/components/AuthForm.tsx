import { Button, Checkbox, Form, Input } from "antd"
import Title from "antd/es/typography/Title";
import styled from "styled-components";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const AuthForm = () => {
  return <>
    <CenteredContainer>
      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
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
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            placeholder="Логин" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Пароль" />
        </Form.Item>
        <Form.Item
          label={null}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </CenteredContainer>
  </>
}