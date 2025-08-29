import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Header2 from './Header2';

const HeaderWrapper = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Header2 /> : <Header />;
};

export default HeaderWrapper; 