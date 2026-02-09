import { useState } from 'react';
import { Sparkles, FileText, Edit3, Loader, Loader2 } from 'lucide-react';
import axios from "axios"
import { useAuth } from '@clerk/clerk-react';
import toast from "react-hot-toast"
import Markdown from "react-markdown"


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Article = () => {

    const [topic, setTopic] = useState('');
    const [length, setLength] = useState();
    const [platform, setPlatform] = useState();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState()

    const { getToken } = useAuth();


    const wordCountMap = {
        'short': { label: 'Short', maxLength: 1200 },
        'medium': { label: 'Medium', maxLength: 1800 },
        'long': { label: 'Long', maxLength: 2500 },
    };

    const typeObj = {
        'linkedin': { label: 'Linkedin Post', value: 'LinkeIn Post' },
        'youtube': { label: 'Youtube Script', value: 'Youtube Script' },
        'reels': { label: 'Shorts/Reels Script', value: 'Reels Script' },
        'article': { label: 'Article', value: 'Article' },

    };



    const handleGenerating = async (e) => {

        e.preventDefault();
        setLoading(true);
        
        try {

            const prompt = `Write an article on ${topic} within the max token length of ${length}`
         
            const { data } = await axios.post("/api/ai/generate-article", { prompt, length, platform }, {
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


    const ArticleDisplay = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-slate-300">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-4" />
                    <p className="text-lg font-medium">Generating {platform}...</p>
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
                ) :
                    (<div className="flex flex-col items-center justify-center h-full min-h-[300px] text-slate-400 p-8 text-center">
                        <Edit3 className="w-12 h-12 text-slate-600 mb-4" />
                        <p className="text-lg">
                            Enter a topic and click <span className="font-semibold text-cyan-400">"Generate Content"</span> to get started.
                        </p>
                    </div>)}
            </div>

        );
    };


    return (
       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 p-4">

    {/* LEFT SECTION — form */}
    <div className="lg:col-span-2 ">
        <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl shadow-xl h-fit border border-slate-700 backdrop-blur-sm">

            <h1 className="flex items-center text-2xl font-bold text-white mb-3 lg:mb-8">
                <Sparkles className="w-6 h-6 mr-2 text-cyan-400" />
                AI Content Writer
            </h1>

           <div className=" mb-3 lg:mb-8">
    <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-2">
        Content Topic
    </label>

    <textarea
        id="topic"
        value={topic}
        onChange={(e) => {
            setTopic(e.target.value);
            e.target.style.height = "auto";      
            e.target.style.height = e.target.scrollHeight + "px";
        }}
        placeholder="The future of artificial intelligence"
        rows={3}
        className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 shadow-sm resize-none overflow-hidden text-white placeholder-slate-500"
    />
</div>

       <div className="mb-3 lg:mb-10">
    <label className="block text-sm font-medium text-slate-300 mb-3">
        Content Type
    </label>

    <div className="flex flex-wrap gap-3">
        {Object.entries(typeObj).map(([key, value]) => (
            <button
                key={key}
                type="button"
                onClick={() => setPlatform(value.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 
                    ${
                        platform === value.value
                            ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-transparent shadow-md"
                            : "bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700"
                    }
                `}
            >
                {value.label}
            </button>
        ))}
    </div>
</div>


            <div className="mb-3 lg:mb-10">
                <label className="block text-sm font-medium  text-slate-300 mb-3">
                    Content Length
                </label>
                <div className="flex flex-wrap gap-2 p-1  rounded-xl">
                    {Object.entries(wordCountMap).map(([key, value]) => (
                        <button
                            key={key}
                            onClick={() => setLength(value.maxLength)}
                            className={`px-4 py-2  rounded-xl text-sm font-medium border transition-all duration-200 
                    ${
                        length=== value.maxLength
                            ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-transparent shadow-md"
                            : "bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700"
                    }
                `}
                        >
                            {value.label}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleGenerating}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-xl transition duration-300 transform active:scale-98
                bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg shadow-purple-500/50"
            >
                {loading ? <Loader className="w-5 h-5 mr-2" /> : <FileText className="w-5 h-5 mr-2" />}
                Generate Content
            </button>

        </div>
    </div>

    {/* RIGHT SECTION — preview */}
    <div className="lg:col-span-3 ">
        <div className="bg-slate-800/50 p-6 sm:p-10 rounded-2xl shadow-xl min-h-[50vh] lg:min-h-[70vh] border border-slate-700 backdrop-blur-sm">
            <h2 className="flex items-center text-xl font-bold text-white border-b border-slate-700 pb-4 mb-6">
                <FileText className="w-5 h-5 mr-2 text-cyan-400" />
                Generated Content
            </h2>

            {/* Inside preview stays same */}
            <ArticleDisplay />
        </div>
    </div>

</div>

    );
};

export default Article;
