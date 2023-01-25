import { useUser } from '../contexts/AuthContext';
import { Button } from './Button';
import './Header.css';

export function Header() {
  const { isAuth, logout } = useUser();

  return (
    <header>
      <h1>Simple Login</h1>
      {isAuth && (
        <div className="actions">
          <Button type='button' onClick={logout}>Sair</Button>
        </div>
      )}
    </header>
  );
}
