/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useUser } from '../contexts/AuthContext';
import { someValueIsNullish } from '../utils/Validate';
import './Login.css';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { isAuth, login } = useUser();

  if(isAuth) {
    return <Navigate to='/' />;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if(someValueIsNullish(email, password)) {
      setError('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    console.log(result);

    if(result.errorMessage) {
      setError(result.errorMessage);
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 id="status">
        {isLoading && 'Carregando...'}
        {!isLoading && error}
      </h3>
      <input
        value={email}
        type="email"
        placeholder='E-mail'
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        value={password}
        type="password"
        placeholder='*********'
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type='submit'>Fazer login</Button>
      <Link to='/signup'>Não tenho uma conta</Link>
    </form>
  );
}
