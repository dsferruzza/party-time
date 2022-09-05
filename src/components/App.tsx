/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Bar from '../components/Bar';
import Config from '../components/Config';
import FutureList from '../components/FutureList';
import Home from '../components/Home';
import Menu from '../components/Menu';
import PassedList from '../components/PassedList';
import Status from '../components/Status';
import Summary from '../components/Summary';
import UpdateWarning from '../components/UpdateWarning';

const theme = createTheme();

const appName = 'Party Time';

const publicUrl = process.env.PUBLIC_URL;
function getBase(url: string): string {
  const a = document.createElement('a');
  a.href = url;
  return a.pathname;
}
const base = (typeof publicUrl === 'undefined' || publicUrl === '') ? '/' : getBase(publicUrl);

function App() {
  return (
    <StyledEngineProvider injectFirst={true}>
      <ThemeProvider theme={theme}>
        <Router basename={base}>
          <div>
            <CssBaseline />
            <Bar appName={appName} />
            <Menu />

            <div css={css`
              margin-bottom: 10px;
              margin-left: 10px;
              margin-right: 10px;
              margin-top: 70px;
            `}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/config" element={<Config />} />
                <Route path="/passed" element={<PassedList />} />
                <Route path="/coming" element={<FutureList />} />
                <Route path="/summary" element={<Summary />} />
              </Routes>
            </div>

            <Status />
            <UpdateWarning />
          </div>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
