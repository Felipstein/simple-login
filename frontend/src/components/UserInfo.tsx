import { useUser } from '../contexts/AuthContext';
import './UserInfo.css';

export function UserInfo() {
  const { isAuth, user } = useUser();

  return (
    <div className="container">
      <h3 className="title">User Info</h3>
      {!isAuth && (
        <h5 style={{ color: 'red', fontWeight: 600 }}>Não autenticado</h5>
      )}
      {user && (
        <div className="user-info">
          <span>Nome: {user.name}</span>
          <span>E-mail: {user.email}</span>
          <span>Criado em: {user.createdAt.toString()}</span>
          <small>ID: {user.id}</small>
        </div>
      )}
    </div>
  );
}
