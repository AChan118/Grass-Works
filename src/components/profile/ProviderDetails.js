import { useEffect, useState } from "react"
import { ProviderForm } from "./ProviderForm"


export const ProviderDetails = () => {
    const [provider, updateProvider] = useState({})

    const localGrassUser = localStorage.getItem("grass_user")
    const grassUserObject = JSON.parse(localGrassUser)
    useEffect(
        () => {
            fetch(`http://localhost:8088/providers?_expand=user&_expand=location&userId=${grassUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    const singleProvider = data[0]
                    updateProvider(singleProvider)
                })
        },
        []
    )
    return <>
            <section className="provider">
                <h1 className="detailsBanner">YOUR PROVIDER DETAILS</h1>
                    <header className="provider__header">{provider?.user?.fullName}</header>
                        <div>Email: {provider?.user?.email}</div>
                        <div>Address: {provider?.user?.address}</div>
                        <div>Location: {provider?.location?.city}</div>
                        <div>Phone Number: {provider?.user?.phoneNumber}</div>
                        <div>Rate: {provider.payRate}</div>

            </section>
                {
                    ProviderForm()
                }
            </>
}