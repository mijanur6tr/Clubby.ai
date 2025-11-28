
import React, { useState } from 'react';
import { Sparkles, FileText, Edit3 } from 'lucide-react';



const Article = () => {
    
    const [topic, setTopic] = useState('The future of artificial intelligence');
    const [length, setLength] = useState('short'); 

    
    const wordCountMap = {
        'short': { label: 'Short (200 - 400 word)' },
        'medium': { label: 'Medium (400 - 800 word)' },
        'long': { label: 'Long (800 - 1200 word)' },
    };


    const handleGenerate = () => {
        console.log("UI Button Clicked. Topic:", topic, "Length:", length);
       
    };

   
    const ArticleDisplay = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-500 p-8 text-center">
                <Edit3 className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-lg">
                    Enter a topic and click <span className="font-semibold">"Generate article"</span> to get started.
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
                            <Sparkles className="w-6 h-6 mr-2 text-blue-500" />
                            AI Article Writer
                        </h1>

                    
                        <div className="mb-8">
                            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                                Article Topic
                            </label>
                            <input
                                id="topic"
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="The future of artificial intelligence"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                            />
                        </div>

                       
                        <div className="mb-10">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Article Length
                            </label>
                            <div className="flex space-x-4 p-1 bg-gray-100 rounded-xl">
                                {Object.entries(wordCountMap).map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => setLength(key)}
                                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out ${
                                            length === key
                                                ? 'bg-white shadow-md text-gray-800'
                                                : 'text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {value.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                    
                        <button
                            onClick={handleGenerate}
                            className={`w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-xl transition duration-300 transform active:scale-98 
                                bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/50
                            `}
                        >
                            <FileText className="w-5 h-5 mr-2" />
                            Generate article
                        </button>
                    </div>
                </div>

             
                <div className="lg:col-span-3">
                    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl min-h-[70vh] border border-gray-100">
                        <h2 className="flex items-center text-xl font-bold text-gray-800 border-b pb-4 mb-6">
                            <FileText className="w-5 h-5 mr-2 text-indigo-500" />
                            Generated article
                        </h2>
                        <ArticleDisplay />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;