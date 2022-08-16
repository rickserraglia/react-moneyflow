import { ThemeProvider } from 'styled-components';
import { Transactions } from './pages/Transactions';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

export const App = () => {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyle />
			<Transactions />
		</ThemeProvider>
	);
};
