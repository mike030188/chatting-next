import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
	.use(initReactI18next) // Passes i18n down to react-i18next
	.init({
		resources: {
			en: {
				common: {
					header: {
						title: 'Coding Test',
					},
					error: {
						emptyMessage: 'Message cannot be empty.',
						sendFailed: 'Failed to send message. Please try again.',
					},
					placeholder: {
						enterMessage: 'Enter your message...',
					},
					button: {
						send: 'Send',
					},
				},
			},
			ko: {
				common: {
					header: {
						title: '코딩 테스트',
					},
					error: {
						emptyMessage: '메시지를 비울 수 없습니다.',
						sendFailed: '메시지를 보내는 데 실패했습니다. 다시 시도해 주세요.',
					},
					placeholder: {
						enterMessage: '메시지를 입력하세요...',
					},
					button: {
						send: '보내기',
					},
				},
			},
			ru: {
				common: {
					header: {
						title: 'Тест Кодирование',
					},
					error: {
						emptyMessage: 'Сообщение не должно быть пустым.',
						sendFailed: 'Ошибка отправки сообщения. Попробуйте еще раз.',
					},
					placeholder: {
						enterMessage: 'Введите сообщение...',
					},
					button: {
						send: 'Отправить',
					},
				},
			},
		},
		lng: 'en', // Default language
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false, // React already safe from XSS
		},
	});

export default i18n;
