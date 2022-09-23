import { useEffect, useState } from "react"


export const UserForm =() => {
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: 0,
        userId: 0
    })
    const localGrassUser = localStorage.getItem("grass_user")
    const grassUserObject = JSON.parse(localGrassUser)

    

    // TODO: Get customer profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${grassUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                    const userObject = data[0]
                    updateProfile(userObject)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
    
        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
           return fetch(`http://localhost:8088/users/${profile.id}` ,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Account details successfully saved")
            })
    
    }
    const [feedback, setFeedback] = useState("")

useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
}, [feedback])

    return (
        <>
        <form className="profile">
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
        
            <h2 className="profile__title">Edit Your Profile</h2>
            <fieldset className="edit_field">
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="imput"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="listing__button">
                <span></span>Save Profile
            </button>
        </form></>
    )
}