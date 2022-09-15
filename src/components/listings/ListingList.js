import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "./Listings.css"
import { Listing } from "./Listing"
export const ListingList = () => {
    const [listings, setlistings] = useState([])
    const [providers, setProviders] = useState([])
    const [filteredListings, setFiltered] = useState([])
    
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()



    const localGrassUser = localStorage.getItem("grass_user")
    const grassUserObject = JSON.parse(localGrassUser)

  
        const getAllListings = () => {
            fetch(`http://localhost:8088/listings?_embed=assignedListings`)
                .then(response => response.json())
                .then((listingArray) => {
                    setlistings(listingArray)
                })
        }

    useEffect(
        () => {
            getAllListings()

                fetch(`http://localhost:8088/providers?_expand=user`)
                .then(response => response.json())
                .then((providerArray) => {
                    setProviders(providerArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )
    


    useEffect(
        () => {
            if (grassUserObject.provider) {
                //for employees
                setFiltered(listings)

            }
            else {
                //for customers
                const myListings = listings.filter(listing => listing.userId === grassUserObject.id)
                setFiltered(myListings)
            }
        },
        [listings]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openListingsArray = listings.filter(listing => {
                    return listing.userId === grassUserObject.id && listing.scheduledDate === ""
                })
                setFiltered(openListingsArray)
            }
            else {
                const myListings = listings.filter(listing => listing.userId === grassUserObject.id)
                setFiltered(myListings)
            }

        },
        [openOnly]

    )

    return <>
        {
            grassUserObject.provider
                ? <>
                     
                </>
                : <>
                   <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
        }


        <h2>List of Listings</h2>
        <article className="listings">
            {
                filteredListings.map(
                    (listing) => <Listing providers={providers} 
                    getAllListings={getAllListings}
                    currentUser={grassUserObject} 
                    listingObject={listing}/>
                )
            }
        </article>
    </>
}

