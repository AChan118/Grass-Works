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
            <section className="provider">
                <h1 className="detailsBanner">YOUR ACCOUNT DETAILS</h1>
                    <header className="provider__header">{user.fullName}</header>
                        <div>Email: {user.email}</div>
                        <div>Address: {user.address}</div>
                        <div>Phone Number: {user.phoneNumber}</div>
                        

            </section>
                {
                    UserForm()
                }
            </>
}