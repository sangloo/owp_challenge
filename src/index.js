import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import './index.css';
import App from './App';
import stores from './stores';
import * as serviceWorker from './serviceWorker';

render(
	<Provider {...stores}>
		<App />
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
