import _toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (type, message) => {
	switch (type) {
		case 'success':
			return _toast.success(message);
		case 'success-center':
			return _toast.success(message, {
				position: 'top-center',
			});
		case 'error':
			return _toast.error(message);
		case 'info':
			return _toast(message, {
				duration: 4000,
				position: 'top-center',

				// Styling
				style: {
					fontWeight: 'bold',
					color: '#4db6eb',
				},
				className: '',

				// Custom Icon
				icon: 'ℹ',
			});
		case 'warn':
			return _toast(message, {
				duration: 4000,
				position: 'top-center',

				// Styling
				style: {
					fontWeight: 'bold',
					color: '#fec852',
				},
				className: '',

				// Custom Icon
				icon: '⚠',
			});
		default:
			return _toast.success(message);
	}
};

export const notifyPromise = _toast.promise;
export const toast = _toast;
