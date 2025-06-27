import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

function ProjectCard() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_BASE_URL=process.env.REACT_APP_API_URL;
// ... then use it like: fetch(`${API_BASE_URL}/api/projects/`)

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/projects/`)
            .then(response =>{
                if (!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                } 
                return response.json();
            })
            .then(data => {
                console.log("recieved data:", data);
                setProjects(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Fetch error:", error);
                setError(error.message);
                setLoading(false);
            })
    }, [])
    if (loading) return <div>Loading...!</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#041127] text-white text-[calc(10px+2vmin)]">
            {projects.map(project => (
                project.id ?(
                    <Link to={`/projects/${project.id}`} key={project.id } className="card bg-[#0a1a3a] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="h-48 overflow-hidden">
                            {project.image && (<img src={project.image} alt={project.title} />)}
                            {project.video && (<video controls> <source src={project.video} type='video/mp4' /></video>)}
                        </div>
                        <div className="p-6" >
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-300">{project.description.substring(0, 40)}...</p>
                            <button className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">view detail</button>
                        </div>
                    </Link>
                ) : null           
    ))}
        </div>
    )
}

export default ProjectCard
