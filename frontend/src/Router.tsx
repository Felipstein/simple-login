import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Protected } from './pages/Protected';
import { SignUp } from './pages/SignUp';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuth } = useUser();

  if(!isAuth) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      {children}
    </>
  );
}

export function Router() {
  return (
    <Routes>
      <Route path='/' element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path='/protected' element={
        <PrivateRoute>
          <Protected />
        </PrivateRoute>
      } />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
}
