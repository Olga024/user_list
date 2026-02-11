import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStateContext } from "../context/AppStateContext";

export const UserListPage = () => {
  const navigate = useNavigate();
  const { loggedUser } = useAppStateContext();

  useEffect(() => {
    if (!loggedUser) {
      navigate('/auth', { replace: true });
    }
  }, [loggedUser, navigate]);

  return <div>Список пользователей (только для авторизованных)</div>;
};
