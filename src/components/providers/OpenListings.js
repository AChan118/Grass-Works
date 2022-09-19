// import { useEffect, useState } from "react"


// import { Listing } from "../listings/Listing"
// export const OpenListings = () => {
//     const [listings, setlistings] = useState([])
//     const [providers, setProviders] = useState([])
//     const [filteredListings, setFiltered] = useState([])
    


//     const localGrassUser = localStorage.getItem("grass_user")
//     const grassUserObject = JSON.parse(localGrassUser)

  
//         const getAllListings = () => {
//             fetch(`http://localhost:8088/listings?_embed=assignedListings`)
//                 .then(response => response.json())
//                 .then((listingArray) => {
//                     setlistings(listingArray)
//                 })
//         }

//     useEffect(
//         () => {
//             getAllListings()

//                 fetch(`http://localhost:8088/providers?_expand=user`)
//                 .then(response => response.json())
//                 .then((providerArray) => {
//                     setProviders(providerArray)
//                 })
//         },
//         [] // When this array is empty, you are observing initial component state
//     )
    


//     useEffect(
//         () => {
//             let openListings = null
//             for(assignedListing in listingArray )
//                 if (listings.assignedListing.length === 0) {
                
//                 setFiltered(listings)

//             }
            
//         },
//         [listings]
//     )

//     return <>
        

//         <h2>List of Listings</h2>
//         <article className="listings">
//             {
//                 filteredListings.map(
//                     (listing) => <Listing providers={providers} 
//                     getAllListings={getAllListings}
//                     currentUser={grassUserObject} 
//                     listingObject={listing}/>
//                 )
//             }
//         </article>
//     </>
// }