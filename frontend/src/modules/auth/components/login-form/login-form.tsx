'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useLogin } from '@/modules/auth/hooks/use-login';

import { Input } from '@/components/ui/input/input';

import { Button } from '@/components/ui/button/button';

import styles from './login-form.module.scss';

interface LoginFormData {
  email: string;

  password: string;
}

export function LoginForm() {
  const [error, setError] = useState('');

  const { signIn } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  async function onSubmit(data: LoginFormData) {
    try {
      setError('');

      await signIn(
        data.email,
        data.password,
      );
    } catch {
      setError('Credenciais inválidas');
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
        error={errors.email?.message}
        {...register('email', {
          required: 'E-mail obrigatório',
        })}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        error={errors.password?.message}
        {...register('password', {
          required: 'Senha obrigatória',
          minLength: {
            value: 6,
            message: 'Senha inválida',
          },
        })}
      />

      {error && (
        <span className={styles.error}>
          {error}
        </span>
      )}

      <Button
        type="submit"
        loading={isSubmitting}
      >
        Entrar
      </Button>
    </form>
  );
}