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


    const handleGenerating = async (e) => {
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
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-slate-300">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-4" />
                    <p className="text-lg font-medium">Generating Ideas...</p>
                    <p className="text-sm">This may take a few moments.</p>
                </div>
            );
        }
        return (
            <div>

                {content ? (
                    <div className='h-[60vh] overflow-y-auto pr-4'>
                        <div className='reset-tw prose prose-invert max-w-none'>
                            <Markdown>
                                {content}
                            </Markdown>
                        </div>

                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-slate-400 p-8 text-center">
                        <Hash className="w-12 h-12 text-slate-600 mb-4 font-bold" />
                        <p className="text-lg">
                            Enter keywords and click <span className="font-semibold text-cyan-400">"Generate Ideas"</span> for your contents
                        </p>
                    </div>
                )
                }
            </div>

        );
    };


    return (
        <div className="min-h-screen p-4  font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">


                <div className="lg:col-span-2">
                    <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl shadow-xl h-fit border border-slate-700 backdrop-blur-sm">

                        <h1 className="flex items-center text-2xl font-bold text-white mb-2 lg:mb-8">
                            <Sparkles className="w-6 h-6 mr-2 text-cyan-400" />
                            Generate Content Idea
                        </h1>

                        <div className="mb-2 lg:mb-8">
                            <label htmlFor="keyword" className="block text-sm font-medium text-slate-300 mb-2">
                                Keyword
                            </label>
                            <input
                                id="keyword"
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="The future of artificial intelligence"
                                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 shadow-sm text-white placeholder-slate-500"
                            />
                        </div>


                        <div className="mb-2 lg:mb-8">
                            <label className="block text-sm font-medium text-slate-300 mb-3">
                                Category
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`px-3 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out border ${category === cat
                                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-transparent shadow-md'
                                                : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <button
                            onClick={handleGenerating}
                            disabled={loading}
                            className={`w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-xl transition duration-300 transform active:scale-98 
                                bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg shadow-purple-500/25
                            `}
                        >
                            {loading ? <Loader className="w-5 h-5 mr-2"/>  : <Hash className="w-5 h-5 mr-2" />}
                            Generate Ideas
                        </button>
                    </div>
                </div>


                <div className="lg:col-span-3">
                    <div className="bg-slate-800/50 p-6 sm:p-10 rounded-2xl shadow-xl min-h-[50vh] lg:min-h-[70vh] border border-slate-700 backdrop-blur-sm">
                        <h2 className="flex items-center text-xl font-bold text-white border-b border-slate-700 pb-4 mb-6">
                            <Hash className="w-5 h-5 mr-2 text-cyan-400" />
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
