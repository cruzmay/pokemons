import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import LayOut from './components/Layout/LayOut';
import { CardLists } from './components/cards/ CardLists';
import { ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Theme } from './theme/Theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
    <BrowserRouter>
      <Routes>
          <Route element={<LayOut />}>
            <Route path="/" element={<CardLists />} />
          </Route>
      </Routes>
  </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
  