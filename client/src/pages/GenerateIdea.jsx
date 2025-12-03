import React, { useState } from 'react';
import { Sparkles, Hash, Loader, Loader2 } from 'lucide-react';
import axios from "axios";
import { useAuth } from '@clerk/clerk-react';
import toast from "react-hot-toast"
import Markdown from "react-markdown"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateIdea = () => {

    const [prompt, setPrompt] = useState('');
    const [category, setCategory] = useState('General');
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState()

    const { getToken } = useAuth();


    const categories = [
        'General', 'Technology', 'Business',
        'Health', 'Lifestyle', 'Education',
        'Travel', 'Food'
    ];


    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const { data } = await axios.post("/api/ai/generate-idea", {prompt, category}, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            if (data.success) {
                setContent(data.content);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Error in generating the article", error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    };


    const TitleDisplay = () => {
              if (loading) {
            return (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin text-green-500 mb-4" />
                    <p className="text-lg font-medium">Generating Ideas...</p>
                    <p className="text-sm">This may take a few moments.</p>
                </div>
            );
        }
        return (
            <div>

                {content ? (
                    <div className='h-[60vh] overflow-y-auto pr-4'>
                        <div className='reset-tw'>
                            <Markdown>
                                {content}
                            </Markdown>
                        </div>

                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-500 p-8 text-center">
                        <Hash className="w-12 h-12 text-gray-300 mb-4 font-bold" />
                        <p className="text-lg">
                            Enter keywords and click <span className="font-semibold">"Generate Ideas"</span> for your contents
                        </p>
                    </div>
                )
                }
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
                            Generate Content Idea
                        </h1>

                        <div className="mb-8">
                            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
                                Keyword
                            </label>
                            <input
                                id="keyword"
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="The future of artificial intelligence"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 transition duration-150 shadow-sm"
                            />
                        </div>


                        <div className="mb-10">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Category
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`px-3 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out border ${category === cat
                                                ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className={`w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-xl transition duration-300 transform active:scale-98 
                                bg-linear-to-r from-fuchsia-600 to-purple-700 hover:from-fuchsia-700 hover:to-purple-800 shadow-lg shadow-purple-500/50
                            `}
                        >
                            {loading ? <Loader className="w-5 h-5 mr-2"/>  : <Hash className="w-5 h-5 mr-2" />}
                            Generate Ideas
                        </button>
                    </div>
                </div>


                <div className="lg:col-span-3">
                    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl min-h-[70vh] border border-gray-100">
                        <h2 className="flex items-center text-xl font-bold text-gray-800 border-b pb-4 mb-6">
                            <Hash className="w-5 h-5 mr-2 text-purple-500" />
                            Generated Ideas
                        </h2>
                        <TitleDisplay />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateIdea;