import axios from 'axios';

const apiUrl = 'https://api-testing.diagna.icu/mimic/api';

class Api {
	getAllStays = async (params = {}) => {
		const query = [];
		Object.entries(params).forEach(([key, value]) => {
			query.push(`${key}=${value}`);
		});
		const res = await axios.get(`${apiUrl}/misc/allStays?${query.join('&')}`);
		return res.data;
	};

	getVentilationStays = async (params = {}) => {
		const query = [];
		Object.entries(params).forEach(([key, value]) => {
			if (value) {
				query.push(`${key}=${value}`);
			}
		});
		const res = await axios.get(`${apiUrl}/ventilation?${query.join('&')}`);
		return res.data;
	};

	getNeurologyStays = async (params = {}) => {
		const query = [];
		Object.entries(params).forEach(([key, value]) => {
			if (value) {
				query.push(`${key}=${value}`);
			}
		});
		const res = await axios.get(`${apiUrl}/neurology?${query.join('&')}`);
		return res.data;
	};

	getLabsStays = async (params = {}) => {
		const query = [];
		Object.entries(params).forEach(([key, value]) => {
			if (value) {
				query.push(`${key}=${value}`);
			}
		});
		const res = await axios.get(`${apiUrl}/labs?${query.join('&')}`);
		return res.data;
	};
}

const ApiService = new Api();

export default ApiService;
