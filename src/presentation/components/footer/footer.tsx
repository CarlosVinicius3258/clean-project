import React, { memo } from 'react';
import Styles from './footer-styles.module.scss';
interface FooterProps extends React.HTMLAttributes<HTMLElement> { }

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className={ Styles.footer }></footer>
  );
};

export default memo(Footer);