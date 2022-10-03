import { Link } from "react-router-dom"

export const Listing = ({ listingObject, currentUser, providers, getAllListings, assignedListings }) => {

    //Find the assigned employee for the current ticket
    let assignedProvider = null
    const myAssignedListing = assignedListings.find(assignedListing => assignedListing.listingId === listingObject.id)
    if (listingObject.assignedListings.length > 0) {
        const listingProviderRelationship = listingObject.assignedListings[0]
        assignedProvider = providers.find(provider => provider.id === listingProviderRelationship.providerId)
    }


    //find the employee profile object for current user

    const userProvider = providers.find(provider => provider.userId === currentUser.id)
    if (listingObject.assignedListings.length > 0) {


    }


    const canClose = () => {
        if (userProvider?.id === assignedProvider?.id && listingObject.dateCompleted === "") {
            return <button onClick={closeListing} className="listing__button"><span></span>Complete Listing</button>
        }
        else {
            return ""
        }
    }


    const deleteButton = () => {
        if (!currentUser.provider && listingObject.assignedListings.length === 0) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/listings/${listingObject.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllListings()
                    })

            }} className="listing__button" > <span></span>Cancel Listing</button >
        }
        else {
            return ""
        }
    }

    //updates the ticket with a date complleted

    const closeListing = () => {
        const d = new Date()
        const copy = {
            userId: listingObject.id,
            address: listingObject.address,
            description: listingObject.description,
            locationId: listingObject.locationId,
            acreage: listingObject.acreage,
            frequencyId: listingObject.frequencyId,
            dateCompleted: d.toDateString()
        }
        return fetch(`http://localhost:8088/listings/${listingObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(getAllListings)
    }
    //Claiming a ticket
    const buttonOrNoButton = () => {

        if (currentUser.provider) {
            return <button className="listing__button"
                onClick={() => {
                    fetch(`http://localhost:8088/assignedListings`, {
                        method: "Post",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            providerId: userProvider.id,
                            listingId: listingObject.id,


                        })
                    })

                        .then(response => response.json())
                        .then(getAllListings)

                }

                }
            ><span></span>Claim Listing</button>
        }
        else {
            return ""
        }
    }



    return <section className="listing" key={`listing--${listingObject.id}`} >
        <header className="listing_header">
            {
                myAssignedListing ? `My Listing` : `New Listing`
            }
        </header>
        <div className="listing_number">
            {
                currentUser.provider
                    ? `Listing# ${listingObject.id}`
                    : `Listing# ${listingObject.id}`
            }
        </div>
        <section className="listing_details">
            
            {
                myAssignedListing
                    ? <><article className="listing_object">
                        <label className="object_label">Customer's Name: </label>
                        {listingObject?.user.fullName}
                    </article>
                        <article className="listing_object">
                            <label className="object_label">Customer's Phone Number: </label>
                            {listingObject?.user.phoneNumber}
                        </article></>
                    : <>Claim for Customer Information
                    <article className="listing_object">
                        <label className="object_label">Acrage: </label>
                        {listingObject.acreage}
                    </article></>
            }

            <article className="listing_object">
                <label className="object_label">Description: </label>
                {listingObject.description}
            </article>
            <article className="listing_object">
                <label className="object_label">Address: </label>
                {listingObject.address}
            </article>
            <article className="listing_object">

                {listingObject.scheduledDate
                    ? <><label className="object_label">Scheduled For: </label> {listingObject?.scheduledDate} </>
                    : ""}
            </article>
            <article className="listing_object">
                <label className="object_label">Price: </label>
                {myAssignedListing ? `$${listingObject.acreage * myAssignedListing?.provider?.payRate}` : "Not Assigned Currently"}
            </article>
        </section>
        <footer className="listing_footer">
            {
                listingObject.assignedListings.length
                    ? listingObject.scheduledDate ? `Currently being worked on by ${assignedProvider !== null ? assignedProvider?.user.fullName : ""}` : `Completed on ${listingObject.dateCompleted}`
                    : buttonOrNoButton()
            }
            {
                currentUser.provider
                    ? canClose()
                    : ""
            }
            {
                deleteButton()
            }
        </footer>
    </section >
}



