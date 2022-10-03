import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "./Listings.css"
import { Listing } from "./Listing"
export const ListingList = () => {
    const [listings, setlistings] = useState([])
    const [providers, setProviders] = useState([])
    const [assignedListings, setAssignedListings] = useState([])

    const [filteredListings, setFiltered] = useState([])

    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()



    const localGrassUser = localStorage.getItem("grass_user")
    const grassUserObject = JSON.parse(localGrassUser)


    const getAllListings = () => {
        fetch(`http://localhost:8088/listings?_expand=user&_embed=assignedListings`)
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
            getAllListings()

            fetch(`http://localhost:8088/assignedListings?_expand=provider`)
                .then(response => response.json())
                .then((assignedArray) => {
                    setAssignedListings(assignedArray)
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
                    return listing.dateCompleted === ""
                })
                setFiltered(openListingsArray)
            }
            else {

                setFiltered(listings)
            }

        },
        [openOnly]

    )

    return <>
        <div className="page__allTop"></div>
        <div className="listings_top">
            <h1 className="listings_title">ALL MY LISTINGS</h1>
            <div className="provider_buttons">
                {
                    grassUserObject.provider
                        ? <>
                            <button className="provider_button"
                                onClick={() => updateOpenOnly(true)}>
                                <span></span>
                                Open Tickets
                            </button>
                            <button className="provider_button"
                                onClick={() => updateOpenOnly(false)}>
                                <span></span>
                                All My Listings
                            </button>
                        </>
                        : <>
                            <button className="createButton_listings"
                                onClick={() => navigate("/ticket/create")}>
                                <span></span>
                                Create A New Listing
                            </button>

                            {/* <button onClick={() => updateOpenOnly(false)}>All My Tickets</button> */}
                        </>
                }
            </div>


        </div>
        <article className="listings">
            {
                filteredListings.map(
                    (listing) => <Listing providers={providers}
                        getAllListings={getAllListings}
                        currentUser={grassUserObject}
                        assignedListings={assignedListings}
                        listingObject={listing} />
                )
            }
        </article>
    </>
}

