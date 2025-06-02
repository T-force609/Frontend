import { useState, useEffect } from "react";

function Skills() {
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8000/api/skills/")
            .then(response =>{
                if (!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                } 
                return response.json();
            })
            .then(data => {
                console.log("recieved data:", data);
                setSkills(data);
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
        <div>
            {skills.map(skill => (
                <div key={skill.id}>
                    <h3>{skill.name}</h3>
                    <p>{skill.category}</p>
                </div>
            ))}
        </div>
    )
}

export default Skills