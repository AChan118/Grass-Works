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
        <div className="page__allTop"></div>
        <div className="full_proCard">
            <section className="provider">
                <div class="provider__content">
                    <div className="front_details">
                        <h1 className="detailsBanner">YOUR PROVIDER DETAILS</h1>
                    </div>
                    <section className="back_details">
                        <div className="provider__detailsName">{provider?.user?.fullName}</div>
                        <section className="detail_body">
                            <div className="detail_property"><label className="detail_label">Email:</label> {provider?.user?.email}</div>
                            <div className="detail_property"><label className="detail_label">Address: </label>{provider?.user?.address}</div>
                            <div className="detail_property"><label className="detail_label">Location: </label>{provider?.location?.city}</div>
                            <div className="detail_property"><label className="detail_label">Phone Number: </label>{provider?.user?.phoneNumber}</div>
                            <div className="detail_property"><label className="detail_label">Rate: </label>{provider.payRate}</div>
                        </section>
                    </section>
                </div>
            </section></div>
        {
            ProviderForm()
        }
    </>
}