import axios from 'axios';
import { Predict_ENDPOINT } from "../assets/Config";

const usePredictionService = () => {
    const getAuthToken = async () => {
        const getTokenUrl = `${Predict_ENDPOINT.apiEndpoint}/login`;
        const loginData = new URLSearchParams({
            username: Predict_ENDPOINT.username,
            password: Predict_ENDPOINT.password,
        });

        try {
            const response = await axios.post(getTokenUrl, loginData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.status === 200 && response.data.access_token) {
                return response.data.access_token;
            } else {
                throw new Error('Failed to get token');
            }
        } catch (error) {
            console.error('Error in getAuthToken:', error);
            throw error;
        }
    };

    const getPrediction = async (formData) => {
        const token = await getAuthToken();
        const predictUrl = `${Predict_ENDPOINT.apiEndpoint}/upload`;
        const information = new URLSearchParams({
            date_receive: formData.date_receive,
            plant: formData.plant,
            vendor: formData.vendor,
            fines: formData.fines || '0',
            bulk: formData.bulk || '0',
        });

        try {
            const response = await axios.post(predictUrl, information.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200 && response.data) {
                return response.data;
            } else {
                throw new Error('Failed to get prediction');
            }
        } catch (error) {
            console.error('Error in getPrediction:', error);
            throw error;
        }
    };

    return { getPrediction };
};

export default usePredictionService;
