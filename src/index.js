import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SkeletonTheme baseColor="#ebebeb"
    highlightColor="#f5f5f5"
    borderRadius="0.5rem"
    duration={2}>
    <App />
  </SkeletonTheme>
);


