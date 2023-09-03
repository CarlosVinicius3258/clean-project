import React from 'react';
import Styles from './login-styles.module.scss';
import Spinner from '@/presentation/components/spinner/spinner';
import Logo from '@/presentation/components/logo/logo';

const Login: React.FC = () => {
  return <div className={ Styles.login }>
    <header className={ Styles.header }>
      <Logo className={ Styles.logo } />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
    <form className={ Styles.form }>
      <h2>Login</h2>
      <div className={ Styles.inputWrap }>
        <input type="email" name="email" placeholder='Digite seu email' />
        <span className={ Styles.status }>🔴</span>
      </div>
      <div className={ Styles.inputWrap }>
        <input type="password" name="password" placeholder='Digite sua senha' />        <span className={ Styles.status }>🔴</span>
      </div>

      <button className={ Styles.submitButton } type="submit">Entrar</button>
      <span className={ Styles.createAccountLink }>Criar conta</span>
      <div className={ Styles.errorWrap }>
        <Spinner className={ Styles.spinner } />
        <span className={ Styles.error }>
          Erro
        </span>
      </div>
    </form>
    <footer className={ Styles.footer }></footer>
  </div>;
};

export default Login;