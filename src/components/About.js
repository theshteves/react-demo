import { Link } from 'react-router-dom'


const About = () => {
    const isThicc = true
    const thiccStyle = {
        textAlign: "center",
        padding: "1.5rem 0px"
    }

    return (
        <div>
            <p style={thiccStyle}>&gt;40KBs? don&rsquo;t lie... {isThicc ? "react.js dummy thicc 👌" : "I lied." }</p>
        
            <h4>Version 1.0.0</h4>
            <Link to="/">Go Back</Link>
        </div>
    )
}

export default About
