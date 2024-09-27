import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export const getStaticProps = async ({ locale = 'en' }) => {
	const translations = await serverSideTranslations(locale, ['common']);

	return {
		props: {
			...translations,
		},
	};
};

const Chat = () => {
	const [message, setMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [chat, setChat] = useState([]);
	const { t, i18n } = useTranslation('common');
	// console.log('natija i18', i18n);
	const router = useRouter();

	const sendMessageToBackend = async () => {
		if (!message.trim()) {
			setErrorMessage(t('error.emptyMessage'));
			return;
		}
		// console.log('Sending message:', message);
		setErrorMessage(''); // Reset error message
		try {
			const response = await axios.post('http://localhost:3000/api/message', { message });
			setChat([...chat, { type: 'sent', text: message }, { type: 'received', text: response.data.response }]);
			console.log(response.data.response);
			setMessage(''); // Clear the input field after sending
		} catch (error) {
			// console.error('Error sending message:', error);
			setErrorMessage(t('error.sendFailed'));
		}
	};

	/** LIFECYCLES **/
	useEffect(() => {
		const storedLocale = localStorage.getItem('locale');
		if (storedLocale) {
			i18n.changeLanguage(storedLocale);
		} else {
			localStorage.setItem('locale', 'en');
			i18n.changeLanguage('en');
		}
	}, [i18n, router]);

	/** HANDLERS **/

	const getKeyHandler = (e) => {
		if (e.key === 'Enter') sendMessageToBackend();
	};

	const handleLanguageChange = (lang) => {
		i18n.changeLanguage(lang);
		localStorage.setItem('locale', lang);
	};

	return (
		<div className="flex flex-col min-h-screen bg-grey-100">
			<header className="bg-white shadow-md p-4">
				<div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto flex justify-between items-center">
					<h1 className="text-xl font-bold text-black">{t('header.title')}</h1>
					<div>
						<button
							className={`mr-2 px-3 py-1 ${i18n.language === 'ko' ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded`}
							onClick={() => handleLanguageChange('ko')}
						>
							한국어
						</button>
						<button
							className={`mr-2 px-3 py-1 ${i18n.language === 'en' ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded`}
							onClick={() => handleLanguageChange('en')}
						>
							English
						</button>
						<button
							className={`mr-2 px-3 py-1 ${i18n.language === 'ru' ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded`}
							onClick={() => handleLanguageChange('ru')}
						>
							Rus
						</button>
					</div>
				</div>
			</header>
			<div className="flex-grow flex items-center justify-center p-4">
				<div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[600px] md:h-[700px] bg-white rounded-lg shadow-lg flex flex-col">
					<div className="flex-1 overflow-y-auto p-4 space-y-4">
						{chat.map((msg, index) => (
							<div key={index} className={`chat ${msg.type === 'sent' ? 'chat-end' : 'chat-start'}`}>
								<div className={`chat-bubble ${msg.type === 'sent' ? 'chat-bubble-primary' : ''}`}>{msg.text}</div>
							</div>
						))}
					</div>

					<div className=" bg-gray-50 p-4 rounded-b-lg sticky bottom-0">
						{errorMessage && <div className="text-red-500">{errorMessage}</div>}
						<div className="join w-full">
							<input
								type={'text'}
								name={'message'}
								className={'input input-bordered join-item flex-grow bg-white text-black'}
								placeholder={t('placeholder.enterMessage')}
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								onKeyDown={getKeyHandler}
							/>
							<button className="btn btn-secondary join-item text-white " onClick={sendMessageToBackend}>
								{t('button.send')}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
