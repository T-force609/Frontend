import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id || isNaN(id)) {
            setError('Invalid project ID');
            setLoading(false);
            return;
        }

        fetch(`https://codewithajdev-api.onrender.com/api/projects/${id}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setProject(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Fetch error:", error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-white text-center py-20">Loading project details...</div>;
    if (error) return <div className="text-red-500 text-center py-20">Error: {error}</div>;
    if (!project) return <div className="text-white text-center py-20">Project not found</div>;

    return (
        <div className="min-h-screen py-10 px-4 bg-[#041127] text-white">
            <div className="max-w-4xl mx-auto">
                <Link 
                    to="/project" 
                    className="mb-6 inline-flex items-center text-blue-400 hover:text-blue-300"
                >
                    ← Back to Projects
                </Link>

                <div className="bg-[#0a1a3a] rounded-lg overflow-hidden shadow-xl">
                    <div className="h-96 overflow-hidden">
                        {project.image && (
                            <img 
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                        {project.video && (
                            <video controls className="w-full h-full object-cover">
                                <source 
                                    src={`https://codewithajdev-api.onrender.com${project.video}`} 
                                    type="video/mp4" 
                                />
                            </video>
                        )}
                    </div>

                    <div className="p-8">
                        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                                {project.category}
                            </span>
                            {project.technologies && project.technologies.split(',').map((tech, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                                    {tech.trim()}
                                </span>
                            ))}
                        </div>
                        <p className="text-lg text-gray-400 mb-6">{project.description}</p>
                        
                        {project.additional_details && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">Project Details</h2>
                                <p className="whitespace-pre-line">{project.additional_details}</p>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-4">
                            {project.demo_url && (
                                <a 
                                    href={project.demo_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 transition"
                                >
                                    Live Demo
                                </a>
                            )}
                            {project.source_code_url && (
                                <a 
                                    href={project.source_code_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
                                >
                                    Source Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;
