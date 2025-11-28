import React, { useState } from 'react';
import { Sparkles, Eraser, Loader2 } from 'lucide-react';

const RemoveBackground = () => {
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : '');
    };

    const handleRemoveBackground = () => {
        console.log("Remove Background Clicked.");
        if (fileName) {
            setIsLoading(true);
            // Simulate processing time for UI demonstration
            setTimeout(() => {
                setIsLoading(false);
            }, 2500);
        }
    };

    const ProcessedImageDisplay = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin text-red-500 mb-4" />
                    <p className="text-lg font-medium">Processing image...</p>
                    <p className="text-sm">Removing background now.</p>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-500 p-8 text-center">
                <Eraser className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-lg">
                    Upload an image and click "Remove Background" to get started
                </p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
                
         
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl h-fit border border-gray-100">
                        
                
                        <h1 className="flex items-center text-2xl font-bold text-gray-800 mb-8">
                            <Sparkles className="w-6 h-6 mr-2 text-red-500" />
                            Background Removal
                        </h1>

                     
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Image
                            </label>
                            
                           
                            <div className="relative border border-gray-300 rounded-xl px-4 py-3 shadow-sm flex items-center justify-between overflow-hidden">
                                <span className="text-sm text-gray-500 truncate mr-4">
                                    {fileName || 'No file chosen'}
                                </span>
                                
                      
                                <input
                                    id="file-upload"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept="image/jpeg, image/png, image/jpg, image/webp"
                                />
                                
                             
                                <label 
                                    htmlFor="file-upload" 
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-gray-200 transition duration-150 cursor-pointer"
                                >
                                    Choose File
                                </label>
                            </div>

                            <p className="mt-2 text-xs text-blue-500">
                                Supports JPG, PNG, and other image formats
                            </p>
                        </div>

                     
                        <button
                            onClick={handleRemoveBackground}
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-xl transition duration-300 transform active:scale-98 ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-red-500/50'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Eraser className="w-5 h-5 mr-2" />
                                    Remove background
                                </>
                            )}
                        </button>
                    </div>
                </div>

          
                <div className="lg:col-span-3">
                    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl min-h-[70vh] border border-gray-100">
                        <h2 className="flex items-center text-xl font-bold text-gray-800 border-b pb-4 mb-6">
                            <Sparkles className="w-5 h-5 mr-2 text-red-500" />
                            Processed Image
                        </h2>
                        <ProcessedImageDisplay />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveBackground;