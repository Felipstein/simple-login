import { useEffect, useState } from 'react';
import { api } from '../api';
import { User } from '../types/User';
import './Home.css';

export function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      setIsLoading(true);
      setError(null);
      setUsers([]);

      try {
        const users = await api.get('/users');

        setUsers(users.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: Error | any) {
        setError(err.response?.data?.message || err.message || 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <main>
      <h2>Usuários ({users.length})</h2>
      <div className="users">
        {isLoading && (
          <p>Carregando...</p>
        )}

        {!isLoading && error && (
          <p id='error-status'>{error}</p>
        )}

        <ul>
          {!isLoading && !error && users.map(user => (
            <li
              className="user-info"
              key={user.id}
            >
              <p>
                ID: {user.id}
              </p>
              <p>
                Nome: {user.name}
              </p>
              <p>
                E-mail: {user.email}
              </p>
              <p>
                Criado em: {user.createdAt.toString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
