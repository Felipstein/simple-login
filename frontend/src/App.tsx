import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import './App.css';
import { Header } from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import { UserInfo } from './components/UserInfo';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Router />
        <UserInfo />
      </BrowserRouter>
    </AuthProvider>
  );
}
