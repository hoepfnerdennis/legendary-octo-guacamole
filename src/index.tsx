import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { css } from './stitches.config';

css.global({
    body: {
        margin: '0',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgb(0,0,0)'
    },
    '*': {
        boxSizing: 'border-box'
    },
    '#root': {
        height: '100vh',
        width: '100vw',
        maxWidth: '800px',
        margin: '0 auto'
    }
});

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
