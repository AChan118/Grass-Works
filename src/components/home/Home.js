

import { useNavigate } from 'react-router-dom'
import videoBg from '../assets/videoBg.mp4'

import "./Home.css"

export const HomeHTML = () => {
    const navigate = useNavigate()
    return <>
        <div className="aboutUs">
            <div className='home_overlay'></div>
            {/* <img src="https://media.istockphoto.com/photos/majestic-sunset-seen-in-late-spring-showing-a-recently-cut-and-well-picture-id667107666?k=20&m=667107666&s=612x612&w=0&h=KfIQgX3xP5z-BBJT3LM8Hebd8zV1fLLLCWOj-aaxc-o="></img> */}
            <video src={videoBg} autoPlay loop muted/>
            <div className='home_content'>
                    <h1 className='home_title'>GRASSWORKS</h1>
                    <p className='home_text'>A Simple Way To Hire Yard Proffessionals</p>
                    <button className='createListing_home' onClick={() => navigate("/ticket/create")}>Create A Listing</button>
            </div>
        </div>
    </>
}