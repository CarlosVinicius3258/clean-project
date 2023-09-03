import React, { memo } from 'react';
import Styles from './login-header-styles.module.scss';
import Logo from '../logo/logo';
interface LoginHeaderProps extends React.HTMLAttributes<HTMLElement> { }

const LoginHeader: React.FC<LoginHeaderProps> = (props) => {
  return (
    <header className={ Styles.header }>
      <Logo className={ Styles.logo } />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  );
};

export default memo(LoginHeader);