import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function ProjectCard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check cache first
        const cacheKey = 'projectsCache';
        const cachedData = localStorage.getItem(cacheKey);
        const now = new Date();

        if (cachedData) {
            try {
                const parsedCache = JSON.parse(cachedData);
                // Check if cache is fresh (e.g., less than 5 minutes old)
                const isCacheFresh = (now - new Date(parsedCache.timestamp)) < (5 * 60 * 1000);
                if (isCacheFresh) {
                    setProjects(parsedCache.data);
                    setLoading(false);
                }
            } catch (e) {
                console.error('Error parsing cache', e);
                // If cache is corrupted, remove it.
                localStorage.removeItem(cacheKey);
            }
        }

        fetch("https://codewithajdev-api.onrender.com/api/projects/")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("received data:", data);
                setProjects(data);
                setLoading(false);
                // Update cache
                const cacheData = {
                    data: data,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            })
            .catch(error => {
                console.error("Fetch error:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (error) return <div>Error: {error}</div>;

    // Skeleton loading
    if (loading) {
        return (
            <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#041127] text-white text-[calc(10px+2vmin)]">
                {/* We'll show 3 skeleton cards */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="card w-[300px] h-[300px] bg-[#0a1a3a] rounded-lg overflow-hidden shadow-lg m-4">
                        <div className="h-48 overflow-hidden m-0 p-0 bg-gray-700 animate-pulse"></div>
                        <div className="p-2 mt-0">
                            <h3 className="text-l font-bold mb-1 pl-3 mt-0 md:text-[23px] bg-gray-700 h-6 w-3/4 animate-pulse"></h3>
                            <p className="text-sm text-gray-300 md:text-l bg-gray-700 h-4 w-full animate-pulse mt-2"></p>
                            <div className="flex flex-row items-center justify-center mt-4">
                                <button className="mt-4 mb-4 px-4 py-2 bg-blue-600 text-xl rounded sm:mt-1 px-2 py-0 bg-gray-700 h-10 w-32 animate-pulse"></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-wrap justify-center bg-[#041127] text-white text-[calc(10px+2vmin)]">
            {projects.map(project => (
                project.id ? (
                    <Link to={`/projects/${project.id}`} key={project.id} className="card w-[300px] h-[300px] bg-[#0a1a3a] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 m-4">
                        <div className="h-48 overflow-hidden m-0 p-0">
                            {project.image ? (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            ) : project.video ? (
                                // We are not preloading the video and we remove controls to avoid loading until interaction
                                // Instead, we can show a play icon and load on click? But the requirement might be to show the video.
                                // Alternatively, we can use a thumbnail for the video and then load the video on hover.
                                // For now, we change to preload="none" and without controls until the user clicks (we can add controls on the detail page)
                                // Since the card is a link to the detail page, we don't want the user to interact with the video here.
                                // So we can just show a static image for the video? Or the first frame? 
                                // We don't have that from the API. So we can use a placeholder image and then the video will be in the detail page.
                                // Therefore, we might not want to show the video in the card at all? Or we can show a thumbnail if provided?
                                // Let's change: if there's a video, we show a play icon image and a text that says "Video Project"
                                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                    <span className="text-4xl">▶</span>
                                </div>
                            ) : null}
                        </div>
                        <div className="p-2 mt-0" >
                            <h3 className="text-l font-bold mb-1 pl-3 mt-0 md:text-[23px]">{project.title}</h3>
                            <p className="text-sm text-gray-300 md:text-l">{project.description.substring(0, 40)}...</p>
                            <div className="flex flex-row items-center justify-center">
                                <button className="mt-4 mb-4 px-4 py-2 bg-blue-600 text-xl rounded hover:bg-blue-700 transition sm:mt-1">view detail</button>
                            </div>
                        </div>
                    </Link>
                ) : null
            ))}
        </div>
    );
}

export default ProjectCard;
