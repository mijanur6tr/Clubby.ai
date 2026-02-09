import React, { useState } from 'react';
import { Sparkles, Image, Edit3, Loader2 } from 'lucide-react';
import toast from "react-hot-toast"
import axios from "axios";
import { useAuth } from '@clerk/clerk-react';
import UpgradeModal from '../components/UpgradeModal';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImage = () => {
    const availableStyles = ['Realistic', 'Ghibli Style', 'Pixel Art', 'Watercolor', 'Cyberpunk', 'Abstract'];

    const [description, setDescription] = useState('');
    const [style, setStyle] = useState(availableStyles[0]);
    const [publish, setPublish] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const { getToken } = useAuth();
    const { has } = useAuth();

    const handleGenerating = async () => {

const canUseGenerateImage = has({ feature: "image_generation" }); 
if (!canUseGenerateImage) {
    setShowUpgradeModal(true);
    return;
}

        setIsLoading(true)

        try {

            const prompt = `generate an image of ${description} regarding the ${style} style`

            const { data } = await axios.post("/api/ai/generate-image", { prompt, publish }, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            if (data.success) {
                setGeneratedImageUrl(data.secure_url);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error in generating image", error)
            toast.error(error.response?.data?.message || "An unexpected error occurred.")
        } finally {
            setIsLoading(false)
        }


        // console.log("UI Button Clicked. Description:", description, "Style:", style, "Publish:", publish); 
        // setIsLoading(true);
        // setGeneratedImageUrl(null);
        // setTimeout(() => {
        //     setIsLoading(false);

        // }, 2000);
    };

    const ImageDisplay = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-slate-300">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-4" />
                    <p className="text-lg font-medium">Generating image...</p>
                    <p className="text-sm">This may take a few moments.</p>
                </div>
            );
        }

        if (generatedImageUrl) {
            return (
                <div className="flex flex-col items-center justify-center h-full">
                    <img
                        src={generatedImageUrl}
                        alt="Generated"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                    />

                    <a
                        href={generatedImageUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium shadow hover:from-cyan-600 hover:to-purple-600 transition"
                    >
                        Download Image
                    </a>
                </div>
            );
        }


        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-slate-400 p-8 text-center">
                <Image className="w-12 h-12 text-slate-600 mb-4" />
                <p className="text-lg">
                    Describe an image and click <span className="font-semibold text-cyan-400">"Generate image"</span> to get started
                </p>
            </div>
        );
    };


    return (
        <div className="min-h-screen p-4 sm:p-6 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">


                <div className="lg:col-span-2">
                    <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl shadow-xl h-fit border border-slate-700 backdrop-blur-sm">

                        <h1 className="flex items-center text-2xl font-bold text-white mb-2 lg:mb-8">
                            <Sparkles className="w-6 h-6 mr-2 text-cyan-400" />
                            AI Image Generator
                        </h1>


                        <div className="mb-2 lg:mb-6">
                            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                                Describe Your Image
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what you want to see in the image..."
                                rows="5"
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 shadow-sm resize-none text-white placeholder-slate-500"
                            ></textarea>
                        </div>


                        <div className="mb-2 lg:mb-6">
                            <label className="block text-sm font-medium text-slate-300 mb-3">
                                Style
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {availableStyles.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setStyle(s)}
                                        className={`px-5 py-2 rounded-lg text-sm font-medium transition duration-200 ease-in-out border ${style === s
                                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-transparent shadow-md'
                                                : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <div className="mb-2 lg:mb-8 flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-600">
                            <label htmlFor="publish-toggle" className="text-sm font-medium text-slate-300">
                                Publish to Gallery
                                <p className="text-xs text-slate-500 mt-0.5">Allow others to see your generated image.</p>
                            </label>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input
                                    type="checkbox"
                                    name="toggle"
                                    id="publish-toggle"
                                    checked={publish}
                                    onChange={(e) => setPublish(e.target.checked)}
                                    className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition duration-300 ease-in-out ${publish ? 'translate-x-full border-cyan-500' : 'border-slate-400'
                                        }`}
                                    style={{ left: publish ? '45%' : '0' }}
                                />
                                <label
                                    htmlFor="publish-toggle"
                                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition duration-200 ease-in ${publish ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-slate-600'
                                        }`}
                                ></label>
                            </div>
                        </div>




                        <button
                            onClick={handleGenerating}
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-xl transition duration-300 transform active:scale-98 ${isLoading
                                    ? 'bg-slate-700 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg shadow-purple-500/25'
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
                    <div className="bg-slate-800/50 p-6 sm:p-10 rounded-2xl shadow-xl min-h-[50vh] lg:min-h-[70vh] border border-slate-700 backdrop-blur-sm">
                        <h2 className="flex items-center text-xl font-bold text-white border-b border-slate-700 pb-4 mb-6">
                            <Image className="w-5 h-5 mr-2 text-cyan-400" />
                            Generated image
                        </h2>
                        <ImageDisplay />
                    </div>
                </div>
            </div>

            <UpgradeModal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />


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
                    background-color: #475569; /* slate-600 */
                }
                .toggle-checkbox:checked + .toggle-label {
                    background: linear-gradient(to right, #06b6d4, #a855f7); /* cyan-500 to purple-500 */
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
