import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ListingForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [listing, update] = useState({
            address: "",
            description: "",
            locationId: (0),
            acreage: (0),
            frequencyId: (0)
    })

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

        const [frequencies, updateFrequencies] = useState([])

        useEffect(
            () => {
                fetch(`http://localhost:8088/serviceFrequencies`)
                    .then(response => response.json())
                    .then((frequenciesArray) => {
                        updateFrequencies(frequenciesArray)
                    })
            },
            [] // When this array is empty, you are observing initial component state
        )

     const navigate = useNavigate()

     const localGrassUser = localStorage.getItem("grass_user")
     const grassUserObject = JSON.parse(localGrassUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        // {
        //     "id": 1,
        //     "userId": 5,
        //     "address": "918 Washington Center",
        //     "description": "Just need a basic yard mowing, and weedeating",
        //     "locationId": 1,
        //     "acreage": 0.5,
        //     "frequencyId": 1
        //   }
        
        const listingToSendToAPI = {
            userId: grassUserObject.id,
            address: listing.address,
            description: listing.description,
            locationId: listing.locationId,
            acreage: listing.acreage,
            frequencyId: listing.frequencyId

            
        }
        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/listings`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listingToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }

    return (
        <form className="listingForm">
            <h2 className="listingForm__title">New Service Listing</h2>
           <div className="full_form">
            <fieldset className="textFieldset_form">
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Address where service is needed"
                        value={listing.address}
                        onChange={
                            (evt) => {
                                const copy = {...listing}
                                copy.address = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of work to be done"
                        value={listing.description}
                        onChange={
                            (evt) => {
                                const copy = {...listing}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                <label htmlFor="serviceAcre">Acreage:</label>
                <input
                    required autoFocus
                    type="number"
                    className="form-control"
                    placeholder="Approximate acreage"
                    value={listing.acreage}
                    onChange={
                        (evt) => {
                            const copy = {...listing}
                            copy.acreage = parseFloat(evt.target.value , 2)
                            update(copy)
                        }
                    } />
            </div>
            </fieldset>

            <fieldset className="select__formGroup"><div className="selectLocation"> 
            <label class="locationLabel" htmlFor="location">City:</label>
            {
                locations.map(
                    (location) => {
                        return <div className="form-group">
               
                <input 
                   className="locationInput"
                    onChange={
                        (evt) => {
                            const copy = {...listing}
                            copy.locationId = parseInt(evt.target.value)
                            
                            update(copy)
                        }
                    } type="radio" name="location" value={location.id}/> {location.city}
            </div>
                    }
                )
            
            
            }
        </div>
        <div class="selectFrequency"> 
            <label class="locationLabel" htmlFor="frequency">How Often:</label>
            {
                frequencies.map(
                    (frequency) => {
                        return <div className="form-group">
               
                <input 
                   className="frequencyInput"
                    onChange={
                        (evt) => {
                            const copy = {...listing}
                            copy.frequencyId = parseInt(evt.target.value)
                            
                            update(copy)
                        }
                    } type="radio" name="frequency" value={frequency.id}/> {frequency.frequency}
            </div>
                    }
                )
            
            
            }
        </div></fieldset></div>
            
            <button href="#"
            onClick = {(clickEvent)=> handleSaveButtonClick(clickEvent)}
            className="form__button">
                Submit Listing
            </button>
        </form>
    )
}