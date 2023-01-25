import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useUser } from '../contexts/AuthContext';
import { someValueIsNullish } from '../utils/Validate';
import './Login.css';

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { isAuth, signup } = useUser();

  if(isAuth) {
    return <Navigate to='/' />;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if(someValueIsNullish(name, email, password, confirmPassword)) {
      setError('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    const result = await signup(name, email, password, confirmPassword);
    setIsLoading(false);

    if(result.errorMessage) {
      setError(result.errorMessage);
      return;
    }

    alert('Você está autenticado agora');
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 id="status">
        {isLoading && 'Carregando...'}
        {!isLoading && error}
      </h3>
      <input
        value={name}
        type="text"
        placeholder='Nome'
        onChange={(event) => setName(event.target.value)}
      />
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
      <input
        value={confirmPassword}
        type="password"
        placeholder='*********'
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      <Button type='submit'>Fazer cadastro</Button>
      <Link to='/login'>Já tenho uma conta</Link>
    </form>
  );
}
