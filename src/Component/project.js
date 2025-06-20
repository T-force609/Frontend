import { useState, useEffect } from "react";

function ProjectCard() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8000/api/projects/")
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
        <div className="container">
            {projects.map(project => (
                <div className="card" key={project.id}>
                    {project.image && (<img src={project.image} alt={project.title} />)}
                    {project.video && (<video controls> <source src={project.video} type='video/mp4' /></video>)}
                    <h3>{project.title}</h3>
                    <p>{project.description.substring(0, 40)}...</p>

                </div>
            ))}
        </div>
    )
}

export default ProjectCard