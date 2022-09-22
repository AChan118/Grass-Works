import { useEffect, useState } from "react"

import { UserForm } from "./UserForm"


export const UserDetails = () => {
    const [user, updateUser] = useState({})

    const localGrassUser = localStorage.getItem("grass_user")
    const grassUserObject = JSON.parse(localGrassUser)
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${grassUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    const singleUser = data[0]
                    updateUser(singleUser)
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
                <h1 className="detailsBanner">YOUR ACCOUNT DETAILS</h1>
            </div>
            <section className="back_details">
                <div className="provider__detailsName">{user?.fullName}</div>
                <section className="detail_body">
                    <div className="detail_property"><label className="detail_label">Email:</label> {user.email}</div>
                    <div className="detail_property"><label className="detail_label">Address: </label>{user.address}</div>
                    <div className="detail_property"><label className="detail_label">Phone Number: </label>{user.phoneNumber}</div>
                    
                </section>
            </section>
        </div>
    </section></div>
            
                {
                    UserForm()
                }
            </>
}