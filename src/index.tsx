import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';

const root = document.getElementById('root');
if (root) {
	createRoot(root).render(
		<ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
			<App />
		</ConfigProvider>,
	);
}
