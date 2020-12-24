import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <p>Hello world!!</p>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}