import React, { useState } from 'react';
import { Sparkles, Scissors, Loader2 } from 'lucide-react';
import axios from "axios";
import { useAuth } from '@clerk/clerk-react';
import toast from "react-hot-toast"
import UpgradeModal from '../components/UpgradeModal';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {

    const [file, setFile] = useState('');
    const [objectDescription, setObjectDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);


    const handleFileChange = (e) => {
        const input = e.target.files[0];
        setFile(input);

        if (input) {
            const url = URL.createObjectURL(input);
            setPreviewUrl(url);
        }
    };

    const { getToken } = useAuth();
    const { has } = useAuth();

    const handleRemoveObject = async () => {

        const canUseGenerateImage = has({ feature: "image_generation" }); 
        if (!canUseGenerateImage) {
            setShowUpgradeModal(true);
            return;
        }
       
        setIsLoading(true);

        try {

            const formData = new FormData();
            formData.append("image", file);
            formData.append("object", objectDescription);

            const { data } = await axios.post("/api/ai/remove-object", formData, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (data.success) {
                setGeneratedImageUrl(data.imageUrl);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log("Error removing object", error);
            toast.error(error.response?.data?.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };


    const ProcessedImageDisplay = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-slate-300">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-4" />
                    <p className="text-lg font-medium">Processing image...</p>
                    <p className="text-sm">Removing object now.</p>
                </div>
            );
        }

        if (!generatedImageUrl && previewUrl) {
            return (
                <div className="flex flex-col items-center justify-center h-full">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                    />

                    <p className="mt-4 text-sm text-slate-400">
                        This is the preview of your uploaded image.
                    </p>
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
            <div className="flex flex-col items-center justify-center h-full min-h-[70vh] text-slate-400 p-8 text-center">
                <Scissors className="w-12 h-12 text-slate-600 mb-4" />
                <p className="text-lg">
                    Upload an image and describe what to remove
                </p>
            </div>
        );
    };

    return (
        <div className="min-h-screen p-4 sm:p-8 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">


                <div className="lg:col-span-2">
                    <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl shadow-xl h-fit border border-slate-700 backdrop-blur-sm">


                        <h1 className="flex items-center text-2xl font-bold text-white mb-8">
                            <Sparkles className="w-6 h-6 mr-2 text-cyan-400" />
                            Object Removal
                        </h1>


                        <div className="mb-8">
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Upload image
                            </label>


                            <div className="relative border border-slate-600 rounded-xl px-4 py-3 shadow-sm flex items-center justify-between overflow-hidden bg-slate-900">
                                <span className="text-sm text-slate-400 truncate mr-4">
                                    {file?.name || 'No file chosen'}
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
                                    className="bg-slate-700 text-slate-200 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-slate-600 transition duration-150 cursor-pointer"
                                >
                                    Choose File
                                </label>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label htmlFor="object-description" className="block text-sm font-medium text-slate-300 mb-2">
                                 Object name to remove
                            </label>
                            <textarea
                                id="object-description"
                                value={objectDescription}
                                onChange={(e) => {

                                    const firstWord = e.target.value.trim().split(/\s+/)[0] || "";
                                    setObjectDescription(firstWord);
                                }}
                                placeholder="e.g., car"
                                rows="1"
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 shadow-sm resize-none text-white placeholder-slate-500"
                            />
                            <p className="mt-2 text-xs text-slate-500">
                                * Only one word is allowed
                            </p>

                        </div>

                        <button
                            onClick={handleRemoveObject}
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-xl transition duration-300 transform active:scale-98 
                                bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg shadow-purple-500/25`}
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
                    <div className="bg-slate-800/50 p-6 sm:p-10 rounded-2xl shadow-xl min-h-[40vh] lg:min-h-[70vh] border border-slate-700 backdrop-blur-sm">
                        <h2 className="flex items-center text-xl font-bold text-white border-b border-slate-700 pb-4 mb-6">
                            <Scissors className="w-5 h-5 mr-2 text-cyan-400" />
                            {generatedImageUrl ? "Processed Image" : "Image"}
                        </h2>
                        <ProcessedImageDisplay />
                    </div>
                </div>
                <UpgradeModal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
            </div>
        </div>
    );
};

export default RemoveObject;
