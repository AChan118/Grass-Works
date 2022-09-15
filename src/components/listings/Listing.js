import { Link } from "react-router-dom"

export const Listing = ({ listingObject, currentUser, providers, getAllListings,  }) => {

    //Find the assigned employee for the current ticket
    let assignedProvider = null

    if (listingObject.assignedListings.length > 0) {
        const listingProviderRelationship = listingObject.assignedListings[0]
        assignedProvider = providers.find(provider => provider.id === listingProviderRelationship.providerId)
    }

    //find the employee profile object for current user


    const userProvider = providers.find(provider => provider.userId === currentUser.id)


    const canClose = () => {
        if (userProvider?.id === assignedProvider?.id && listingObject.dateCompleted === "") {
            return <button onClick={closeListing} className="listing__finish">Finish</button>
        }
        else {
            return ""
        }
    }


    const deleteButton = () => {
        if (!currentUser.provider) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/listings/${listingObject.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllListings()
                    })

            }} className = "listing__delete" > Delete</button >
        }
        else {
    return ""
}
    }

//updates the ticket with a date complleted

const closeListing = () => {
    const copy = {
        userId: listingObject.id,
        address: listingObject.address,
        description: listingObject.description,
        scheduledDate: listingObject.scheduledDate,
        price: listingObject.price,
        dateCompleted: new Date()
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
        return <button
            onClick={() => {
                fetch(`http://localhost:8088/assignedListings`, {
                    method: "Post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        providerId: userProvider.id,
                        listingId: listingObject.id,
                        scheduledDate: new Date(),
                        price: parseFloat(userProvider.payRate*listingObject.acreage, 2)
                    })
                })
                    .then(response => response.json())
                    .then(() => {
                        getAllListings()
                    })

            }}
        >Claim</button>
    }
    else {
        return ""
    }
}



return <section className="listing" key={`listing--${listingObject.id}`} >
    <header>
        {
            currentUser.provider
                ? `Listing ${listingObject.id}`
                : <Link to={`/listings/${listingObject.id}/edit`}>Listing {listingObject.id}</Link>
        }
    </header>
    <section>{listingObject.description}{listingObject.price}</section>
    
    {/* <section>Emergency: {ticketObject.emergency ? "Yes" : "No"}</section> */}
    <footer>
        {
            listingObject.assignedListings.length
                ? `Currently being worked on by ${assignedProvider !== null ? assignedProvider?.user.fullName : ""}`
                : buttonOrNoButton()
        }
        {
            canClose()
        }
        {
            deleteButton()
        }
    </footer>
</section >
}
