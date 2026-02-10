import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Paths } from './paths';
import { AuthPage } from './pages/AuthPage';
import { NotFound } from './pages/NotFound';
import { UserListPage } from './pages/UserListPage';
import { useAppStateContext } from './context/AppStateContext';

function App() {
  const { loggedUser } = useAppStateContext();
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={Paths.HOME} replace />} />
        <Route path={Paths.HOME} element={<AuthPage />} />
        <Route path={Paths.NOTFOUND} element={<NotFound />} />
        <Route path={Paths.USERLIST} element={<UserListPage />} />
      </Routes>
    </div>
  );
}

export default App;
