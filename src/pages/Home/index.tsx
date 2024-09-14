import React from 'react';
import logo from '@/assets/logo.svg';
import './index.scss';
import {Link} from "react-router-dom";

const Index = () =>{
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/Index.tsx</code> and save to reload.
        </p>
        <Link
          className="App-link"
          to="/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          go login
        </Link>
      </header>
    </div>
  );
}

export default Index;
