import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

function ProjectCard() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch("https://codewithaj-api.onrender.com/api/projects/")
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
        <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#041127] text-white text-[calc(10px+2vmin)] sm:flex-col items-center  justify-center bg-[#041127] text-white text-[calc(10px+2vmin)]">
            {projects.map(project => (
                project.id ?(
                    <Link to={`/projects/${project.id}`} key={project.id } className="card w-[300px] h-[300px] bg-[#0a1a3a] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 sm: w-10 h-[302px]  ">
                        <div className="h-48 overflow-hidden m-0 p-0 sm:h-44">
                            {project.image && (<img src={project.image} alt={project.title} />)}
                            {project.video && (<video controls> <source src={project.video} type='video/mp4' /></video>)}
                        </div>
                        <div className="p-2 mt-0" >
                            <h3 className="text-l font-bold mb-1 pl-3 mt-0 md:text-[23px] sm:text-l mt-0 p-0">{project.title}</h3>
                            <p className="text-sm text-gray-300 md:text-l sm:text-sm">{project.description.substring(0, 40)}...</p>
                            <div className="flex flex-row items-center justify-center">
                                <button className="mt-4 mb-4 px-4 py-2 bg-blue-600 text-xl rounded hover:bg-blue-700 transition sm:mt-1 px-2 py-0">view detail</button>
                            </div>
                        </div>
                    </Link>
                ) : null           
    ))}
        </div>
    )
}

export default ProjectCard