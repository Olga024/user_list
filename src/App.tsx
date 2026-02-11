import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Paths } from './paths';
import { AuthPage } from './pages/AuthPage';
import { NotFound } from './pages/NotFound';
import { UserListPage } from './pages/UserListPage';
import { useAppStateContext } from './context/AppStateContext';
import { AppBar } from './components/AppBar';

function App() {
  const { loggedUser } = useAppStateContext();

  return (
    <div className="App">
      {loggedUser && <AppBar />}
      <Routes>
        <Route path={Paths.HOME} element={<Navigate to={Paths.LOGIN} replace />} />
        <Route
          path={Paths.LOGIN}
          element={!loggedUser ? <AuthPage /> : <Navigate to={Paths.USERLIST} replace />}
        />
        <Route
          path={Paths.USERLIST}
          element={loggedUser ? <UserListPage /> : <Navigate to={Paths.LOGIN} replace />}
        />
        <Route path={Paths.NOTFOUND} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
