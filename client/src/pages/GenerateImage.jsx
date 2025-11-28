import React, { useState } from 'react';
import { Sparkles, Image, Edit3, Loader2 } from 'lucide-react';

const GenerateImage = () => {
    const availableStyles = ['Realistic', 'Ghibli Style', 'Pixel Art', 'Watercolor', 'Cyberpunk', 'Abstract'];

    const [description, setDescription] = useState('');
    const [style, setStyle] = useState(availableStyles[0]); 
    const [publish, setPublish] = useState(false); 
    const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = () => {
       
        console.log("UI Button Clicked. Description:", description, "Style:", style, "Publish:", publish); 
        setIsLoading(true);
        setGeneratedImageUrl(null);
        setTimeout(() => {
            setIsLoading(false);
           
        }, 2000);
    };

    const ImageDisplay = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin text-green-500 mb-4" />
                    <p className="text-lg font-medium">Generating image...</p>
                    <p className="text-sm">This may take a few moments.</p>
                </div>
            );
        }

        if (generatedImageUrl) {
            return (
                <div className="flex items-center justify-center h-full">
                    <img src={generatedImageUrl} alt="Generated" className="max-w-full max-h-full object-contain rounded-lg shadow-md" />
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-500 p-8 text-center">
                <Image className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-lg">
                    Describe an image and click <span className="font-semibold">"Generate image"</span> to get started
                </p>
            </div>
        );
    };


    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
                
             
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl h-fit border border-gray-100">
                        
                        <h1 className="flex items-center text-2xl font-bold text-gray-800 mb-8">
                            <Sparkles className="w-6 h-6 mr-2 text-green-500" />
                            AI Image Generator
                        </h1>

                     
                        <div className="mb-6">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Describe Your Image
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what you want to see in the image..."
                                rows="5"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-150 shadow-sm resize-none"
                            ></textarea>
                        </div>

                      
                        <div className="mb-6"> 
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Style
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {availableStyles.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setStyle(s)}
                                        className={`px-5 py-2 rounded-lg text-sm font-medium transition duration-200 ease-in-out border ${
                                            style === s
                                                ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                   
                        <div className="mb-8 flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <label htmlFor="publish-toggle" className="text-sm font-medium text-gray-700">
                                Publish to Gallery
                                <p className="text-xs text-gray-500 mt-0.5">Allow others to see your generated image.</p>
                            </label>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input
                                    type="checkbox"
                                    name="toggle"
                                    id="publish-toggle"
                                    checked={publish}
                                    onChange={(e) => setPublish(e.target.checked)}
                                    className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition duration-300 ease-in-out ${
                                        publish ? 'translate-x-full border-green-500' : 'border-gray-300'
                                    }`}
                                    style={{ left: publish ? '45%' : '0' }} 
                                />
                                <label 
                                    htmlFor="publish-toggle" 
                                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition duration-200 ease-in ${
                                        publish ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                                ></label>
                            </div>
                        </div>

                        
                
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-xl transition duration-300 transform active:scale-98 ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/50'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Image className="w-5 h-5 mr-2" />
                                    Generate image
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl min-h-[70vh] border border-gray-100">
                        <h2 className="flex items-center text-xl font-bold text-gray-800 border-b pb-4 mb-6">
                            <Image className="w-5 h-5 mr-2 text-green-500" />
                            Generated image
                        </h2>
                        <ImageDisplay />
                    </div>
                </div>
            </div>
           
            <style jsx="true">{`
                .toggle-checkbox {
                    top: 0;
                    height: 100%;
                    width: 50%;
                    left: 0;
                }
                .toggle-checkbox:checked {
                    left: 50%;
                }
                .toggle-checkbox + .toggle-label {
                    background-color: #d1d5db; /* gray-300 */
                }
                .toggle-checkbox:checked + .toggle-label {
                    background-color: #10b981; /* green-500 */
                }
                /* Hide the default checkbox */
                .toggle-checkbox {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    z-index: 10;
                }
                .toggle-label {
                    display: block;
                    cursor: pointer;
                    height: 24px; /* h-6 */
                }
            `}</style>
        </div>
    );
};

export default GenerateImage;