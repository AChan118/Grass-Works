import { useEffect, useState } from "react"


export const ProviderForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        locationId: 0,
        payRate: 0,
        userId: 0
    })
    const localGrassUser = localStorage.getItem("grass_user")
    const grassUserObject = JSON.parse(localGrassUser)

    const [locations, updateLocations] = useState([])

        useEffect(
            () => {
                fetch(`http://localhost:8088/locations`)
                    .then(response => response.json())
                    .then((locationArray) => {
                        updateLocations(locationArray)
                    })
            },
            [] // When this array is empty, you are observing initial component state
        )

    // TODO: Get provider profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/providers?userId=${grassUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                    const providerObject = data[0]
                    updateProfile(providerObject)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
    
        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
           return fetch(`http://localhost:8088/providers/${profile.id}` ,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Employee profile successfully saved")
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
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
       
        <form className="profile">
            <h2 className="profile__title">Update Your Provider Details</h2>
           
            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Acrage Rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.payRate}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.payRate = parseFloat(evt.target.value, 2)
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset> 
            <fieldset className="selectLocation"> 
            <label class="locationLabel" htmlFor="location">City:</label>
            {
                locations.map(
                    (location) => {
                        return <div className="form-group">
               
                <input 
                    className="locationInput"
                    onChange={
                        (evt) => {
                            const copy = {...profile}
                            copy.locationId = parseInt(evt.target.value)
                            
                            updateProfile(copy)
                        }
                    } type="radio" name="location" value={location.id}/> {location.city}
            </div>
                    }
                )
            
            
            }
        </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form></>
    )
}