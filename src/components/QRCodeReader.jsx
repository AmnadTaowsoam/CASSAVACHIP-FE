import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { VendorDict, PlantDict } from "../assets/MasterData" ;
import Information from "./Information";
import PredictionResult from "./PredictionResult";

const QRCodeReader = () => {
    const [inputText, setInputText] = useState("");
    const [predictionResult, setPredictionResult] = useState(null);
    const [formData, setFormData] = useState({
        queue: "",
        date_receive: "",
        inspectionlot: "",
        batch: "",
        plant: "",
        material: "",
        vendor: "",
        vendorname: "",
        operationno:""
    });

    const updateFormData = (newData) => {
        setFormData(newData);
    };

    const handleAddClick = (e) => {
        e.preventDefault();
        const parts = inputText.split(",");
        const data = {
            queue: parts[0] || "",
            date_receive: parts[1] || "",
            inspectionlot: parts[2] || "",
            batch: parts[3] || "",
            plant: PlantDict[parts[4]] || "",
            material: parts[5] || "",
            vendor: parts[6] || "",
            vendorname: VendorDict[parts[6]] || "",
            operationno:parts[7] || ""
        };

        console.log("Data from input:", data);
        updateFormData(data);
        setInputText("");
    };
    
    const handleClearClick = (e) => {
        e.preventDefault();
        setInputText("");
    };

    const handleFormDataChange = (key, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: value,
        }));
    };

    const setPredictionData = (data) => {
        setPredictionResult(data);
    };

    return (
        <>
            <div className="container mx-auto max-w-4xl w-full mt-2 bg-white font-custom font-bold">
                <div className="flex flex-col items-center mb-4 mt-6">
                        <span className="text-xl text-black-500 font-custom">
                            <h1 className="text-5xl font-bold text-black-500">Sand in Fines Calculator</h1>
                        </span>
                    </div>
                <form>
                    <div className="grid gap-4 mb-2 font-bold">
                        <div className="flex">
                            <input 
                                type="text"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full mr-2 h-10"
                                placeholder=">>>Scan QRCode "
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button className="bg-teal-700  hover:bg-teal-500 text-white rounded-lg py-2 px-4 w-1/4 mr-2 h-10 font-custom" onClick={handleAddClick}>
                                <FaPlus className="inline-block mr-2" />Add</button>
                            {/* <button className="bg-red-500  hover:bg-red-900 text-white rounded-lg py-2 px-4 w-1/4 h-10 font-custom" onClick={handleClearClick}>
                                <FaTrash className="inline-block mr-2" />Clear</button> */}
                        </div>
                    </div>
                </form>
                <div>
                    <Information formData={formData} onFormDataChange={handleFormDataChange} onPredictionResult={setPredictionData} />
                    <div>
                        {predictionResult && (
                            <PredictionResult 
                                sandPredictValue={predictionResult.sand_predict_value} 
                                totalSandValue={predictionResult.total_sand_value}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
    
export default QRCodeReader;
