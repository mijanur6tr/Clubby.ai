import React, { useState } from 'react';
import { Sparkles, Scissors, Loader2 } from 'lucide-react';

const RemoveObject = () => {
    const [fileName, setFileName] = useState('');
    const [objectDescription, setObjectDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : '');
    };

    const handleRemoveObject = () => {
        console.log("Remove Object Clicked. File:", fileName, "Object:", objectDescription);
        if (fileName && objectDescription) {
            setIsLoading(true);

            setTimeout(() => {
                setIsLoading(false);
            }, 2500);
        }
    };

    const ProcessedImageDisplay = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500 mb-4" />
                    <p className="text-lg font-medium">Processing image...</p>
                    <p className="text-sm">Removing object now.</p>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[70vh] text-gray-500 p-8 text-center">
                <Scissors className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-lg">
                    Upload an image and describe what to remove
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
                            <Sparkles className="w-6 h-6 mr-2 text-purple-500" />
                            Object Removal
                        </h1>

    
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload image
                            </label>
                            
            
                            <div className="relative border border-gray-300 rounded-xl px-4 py-3 shadow-sm flex items-center justify-between overflow-hidden">
                                <span className="text-sm text-gray-500 truncate mr-4">
                                    {fileName || 'No file chosen'}
                                </span>

                                <input
                                    id="file-upload-object"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept="image/jpeg, image/png, image/jpg, image/webp"
                                />
                                
                   
                                <label 
                                    htmlFor="file-upload-object" 
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-gray-200 transition duration-150 cursor-pointer"
                                >
                                    Choose File
                                </label>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label htmlFor="object-description" className="block text-sm font-medium text-gray-700 mb-2">
                                Describe object to remove
                            </label>
                            <textarea
                                id="object-description"
                                value={objectDescription}
                                onChange={(e) => setObjectDescription(e.target.value)}
                                placeholder="e.g., car in background, tree from the image"
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 transition duration-150 shadow-sm resize-none"
                            ></textarea>
                            <p className="mt-2 text-xs text-gray-500">
                                Be specific about what you want to remove
                            </p>
                        </div>

                        <button
                            onClick={handleRemoveObject}
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-xl transition duration-300 transform active:scale-98 
                                bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-purple-500/50
                            `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Scissors className="w-5 h-5 mr-2" />
                                    Remove object
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl min-h-[70vh] border border-gray-100">
                        <h2 className="flex items-center text-xl font-bold text-gray-800 border-b pb-4 mb-6">
                            <Scissors className="w-5 h-5 mr-2 text-purple-500" />
                            Processed Image
                        </h2>
                        <ProcessedImageDisplay />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveObject;