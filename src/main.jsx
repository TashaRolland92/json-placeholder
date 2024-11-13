import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // swap for styled components
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>,
	</React.StrictMode>
);