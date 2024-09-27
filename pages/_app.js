import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import i18n from '../i18n'; // Adjust the path as necessary

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
