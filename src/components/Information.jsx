import React, { useState } from "react";
import { FaBattleNet } from "react-icons/fa";
import PredictionResult from "./PredictionResult";
import usePredictionService from './PredictionAPIService';
import useInterfaceService from './InterfaceService';
import { Interface_ENDPOINT } from "../assets/Config";


const Information = ({ formData, onFormDataChange, onPredictionResult }) => {
    const [fines, setFines] = useState('');
    const [bulk, setBulk] = useState('');
    const { getPrediction } = usePredictionService();
    const { register, login, sendPayload } = useInterfaceService();
    const [predictionResult, setPredictionResult] = useState({
        sandPredictValue: 'Calculating...',
        totalSandValue: 'Calculating...',
    });
    const [statusMessage, setStatusMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(`Input change - Name: ${name}, Value: ${value}`);
        if (name === 'fines') {
            setFines(value);
        } else if (name === 'bulk') {
            setBulk(value);
        } else {
            onFormDataChange(name, value);
        }
    };

    const handleInputBlur = (event) => {
        const { name, value } = event.target;
        console.log(`Input blur - Name: ${event.target.name}, Value: ${event.target.value}`);
        if (name === 'fines') {
            setFines(validateFines(value));
        } else if (name === 'bulk') {
            setBulk(validateBulk(value));
        }
    };

    const validateFines = (value) => {
        let num = parseFloat(value);
        if (!isNaN(num) && num <= 100) {
            return num.toFixed(1);
        }
        return fines;
    };

    const validateBulk = (value) => {
        let num = parseFloat(value);
        if (!isNaN(num) && num >= 0.30 && num <= 0.70) {
            return num.toFixed(2);
        }
        return bulk;
    };

    const handleCalculateClick = async (e) => {
        e.preventDefault();
        setStatusMessage('Calculating...'); // Update status message
        try {
            const result = await getPrediction({ fines, bulk, ...formData });
            setPredictionResult({
                sandPredictValue: result.sand_predict_value.toFixed(2),
                totalSandValue: result.total_sand_value.toFixed(2),
            });
            setStatusMessage('Calculation complete.'); // Update on success

        } catch (error) {
            console.error('Prediction error:', error);
            setStatusMessage('Error during calculation.'); // Update on error
            setPredictionResult({
                sandPredictValue: 'Error',
                totalSandValue: 'Error',
            });
        }
    };   

    const handleInterfaceClick = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (predictionResult.totalSandValue === 'Calculating...') {
            setStatusMessage("Total Sand Value is still calculating. Cannot send payload.");
            return;
        }
        const username = Interface_ENDPOINT.username;
        const password = Interface_ENDPOINT.password;

        setStatusMessage('Sending data to interface...');
        try {
            await login(username, password);
            setStatusMessage("Logged in successfully...");
            const micCodes = {
                'PHYS0001': fines,
                'CHEM0010': bulk,
                'CHEM0013': predictionResult.totalSandValue
            };
    
            for (const [micCode, result] of Object.entries(micCodes)) {
                const payload = {
                    "inspecLotNo": formData.inspectionlot,
                    "operationNo": formData.operationno,
                    "micCode": micCode,
                    "result": result
                };
                try {
                    await sendPayload(payload);
                    console.log("Payload sent successfully:", payload);
                } catch (error) {
                    console.error("Error sending payload:", payload, error);
                }
            }
            setStatusMessage('Data sent successfully...');
            setPredictionResult({
                sandPredictValue: '',
                totalSandValue: '', 
            });
            setFines(''); // Reset fines state to empty
            setBulk(''); // Reset bulk state to empty
        } catch (error) {
            console.error("Login or interface operation failed:", error);
            setStatusMessage('Failed to send data...');
        }
    };

    return (
        <>
            <div>
                <div className="container mx-auto max-w-4xl w-full mt-4 bg-white font-custom font-bold">
                    <form>
                        <div className="grid gap-4 mb-2 md:grid-cols-2 font-bold">
                            <div className="">
                                <label 
                                htmlFor="queue" 
                                className="w- text-sm font-medium text-gray-900 dark:text-black">Queue:</label>
                                <input 
                                type="text"
                                id="queue"
                                name="queue"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                value={formData.queue || ''}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <label 
                                htmlFor="inspectionlot" 
                                className="w-20 text-sm font-medium text-gray-900 dark:text-black ">Inspection Lot:</label>
                                <input 
                                type="text"
                                id="inspectionlot"
                                name="inspectionlot"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                value={formData.inspectionlot || ''}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <label 
                                htmlFor="date_receive" 
                                className="w-20 text-sm font-medium text-gray-900 dark:text-black ">Date_receive:</label>
                                <input 
                                type="text"
                                id="date_receive"
                                name="date_receive"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                value={formData.date_receive || ''}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <label 
                                htmlFor="batch" 
                                className="w-20 text-sm font-medium text-gray-900 dark:text-black ">Batch:</label>
                                <input 
                                type="text"
                                id="batch"
                                name="batch"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                value={formData.batch || ''}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <label 
                                htmlFor="plant" 
                                className="w-20 text-sm font-medium text-gray-900 dark:text-black ">Plant:</label>
                                <input 
                                type="text"
                                id="plant"
                                name="plant"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                value={formData.plant || ''}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <label 
                                htmlFor="material" 
                                className="w-20 text-sm font-medium text-gray-900 dark:text-black ">Material:</label>
                                <input 
                                type="text"
                                id="material"
                                name="material"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                value={formData.material || ''}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <label 
                                htmlFor="vendor" 
                                className="w-20 text-sm font-medium text-gray-900 dark:text-black ">Vendor:</label>
                                <input 
                                type="text"
                                id="vendor"
                                name="vendor"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                value={formData.vendor || ''}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <label 
                                htmlFor="vendorname" 
                                className="w-20 text-sm font-medium text-gray-900 dark:text-black ">Vendor Name:</label>
                                <input 
                                type="text"
                                id="vendorname"
                                name="vendorname"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                value={formData.vendorname || ''}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <label 
                                htmlFor="fines" 
                                className="w-20 text-sm font-medium text-gray-900 dark:text-black ">Fines(%):</label>
                                <input 
                                type="text"
                                id="fines"
                                name="fines"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                placeholder=">>Input Fines...."
                                value={fines}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                onInvalid={e => e.target.setCustomValidity('Fines percentage is required')}
                                onInput={e => e.target.setCustomValidity('')}
                                required
                                />
                            </div>
                            <div className="">
                                <label 
                                htmlFor="bulk" 
                                className="w-20 text-sm font-medium text-gray-900 dark:text-black ">Bulk(kg/l):</label>
                                <input 
                                type="text"
                                id="bulk"
                                name="bulk"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                placeholder=">>Input Bulk...."
                                value={bulk}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                onInvalid={e => e.target.setCustomValidity('Bulk density is required')}
                                onInput={e => e.target.setCustomValidity('')}
                                required
                                /> 
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container mx-auto max-w-4xl w-full mt-4 bg-white font-custom font-bold">
                    <div className="flex justify-end mt-4">
                        <button type="button" className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 w-1/4 rounded-xl text-input-section" onClick={handleCalculateClick}>
                        <FaBattleNet className="inline-block mr-2" />Calculate</button>
                    </div>
                </div>
            </div>
            <div>
                <PredictionResult
                    sandPredictValue={predictionResult.sandPredictValue}
                    totalSandValue={predictionResult.totalSandValue}
                    onInterfaceClick={handleInterfaceClick}
                />
            </div>
            <div className="status-message text-blue-500">
                {statusMessage && <p>{statusMessage}</p>}
            </div>
        </>
    );
};

export default Information;