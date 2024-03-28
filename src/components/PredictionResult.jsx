import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const PredictionResult = ({ sandPredictValue, totalSandValue, onInterfaceClick }) => {  
    return (
        <>
            <div className="container mx-auto max-w-4xl w-full mt-4 bg-white font-custom font-bold">
                <form>
                    <div className="grid gap-4 mb-2 font-bold">
                        <div className="flex">
                            <label htmlFor="sand_predict_value" className="font-custom mr-2">Sand in Fines(%):</label>
                            <input 
                                type="text"
                                id="sand_predict_value"
                                name="sand_predict_value"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full mr-2 h-12"
                                placeholder="Sand Predict Value Calculate..."
                                value={sandPredictValue}
                                readOnly
                            />
                            <label htmlFor="total_sand_value" className="font-custom mr-2">Total Sand(%):</label>
                            <input 
                                type="text"
                                id="total_sand_value"
                                name="total_sand_value"
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full mr-2 h-12"
                                placeholder="Total Sand Value Calculate..."
                                value={totalSandValue}
                                readOnly
                            />
                            {totalSandValue !== "Calculating..." && (
                                <button className="bg-teal-700 hover:bg-teal-500 text-white rounded-lg py-2 px-4 w-2/4 mr-2 h-12 font-custom" onClick={onInterfaceClick}>
                                    <FaExternalLinkAlt className="inline-block mr-2" />Interface
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );     
}

export default PredictionResult;
