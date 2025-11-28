import React, { useState } from 'react';
import { Sparkles, FileText, Loader2, BarChart3 } from 'lucide-react';

const ReviewResume = () => {
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : '');
    };

    const handleReviewResume = () => {
        console.log("Review Resume Clicked. File:", fileName);
        if (fileName) {
            setIsLoading(true);
        
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }
    };

    const AnalysisResultsDisplay = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-500 mb-4" />
                    <p className="text-lg font-medium">Analyzing resume...</p>
                    <p className="text-sm">This may take a few moments.</p>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[70vh] text-gray-500 p-8 text-center">
                <FileText className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-lg">
                    Upload your resume and click "Review Resume" to get started
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
                            <Sparkles className="w-6 h-6 mr-2 text-teal-500" />
                            Resume Review
                        </h1>

               
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Resume
                            </label>
                            
                      
                            <div className="relative border border-gray-300 rounded-xl px-4 py-3 shadow-sm flex items-center justify-between overflow-hidden">
                                <span className="text-sm text-gray-500 truncate mr-4">
                                    {fileName || 'No file chosen'}
                                </span>
                                
                           
                                <input
                                    id="file-upload-resume"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".pdf, .png, .jpg, .jpeg"
                                />
                                
                   
                                <label 
                                    htmlFor="file-upload-resume" 
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-gray-200 transition duration-150 cursor-pointer"
                                >
                                    Choose File
                                </label>
                            </div>

                            <p className="mt-2 text-xs text-gray-500">
                                Supports PDF, PNG, JPG formats
                            </p>
                        </div>


                        <button
                            onClick={handleReviewResume}
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-xl transition duration-300 transform active:scale-98 ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-linear-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 shadow-lg shadow-teal-500/50'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Reviewing...
                                </>
                            ) : (
                                <>
                                    <BarChart3 className="w-5 h-5 mr-2" />
                                    Review Resume
                                </>
                            )}
                        </button>
                    </div>
                </div>

       
                <div className="lg:col-span-3">
                    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl min-h-[70vh] border border-gray-100">
                        <h2 className="flex items-center text-xl font-bold text-gray-800 border-b pb-4 mb-6">
                            <BarChart3 className="w-5 h-5 mr-2 text-teal-500" />
                            Analysis Results
                        </h2>
                        <AnalysisResultsDisplay />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewResume;