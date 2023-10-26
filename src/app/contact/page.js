"use client"
import React, { useEffect } from 'react'
import styles from '../styles/contact.module.css'
import { useState } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencilSquare,
    faTrash
} from "@fortawesome/free-solid-svg-icons";


export default function Contact() {
    
    useEffect(() => {
        getList();
    }, [])

    const [status, setStatus] = useState(null);
    const [deleteStatus, setDeleteStatus] = useState(null);
    const [userData, SetUserData] = useState([]);
    const [showNoDataMessage, setshowNoDataMessage] = useState(false);
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",

    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user.username)
        console.log(user.email)
        console.log(user.phone)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { "Content_Type": "application/json" },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    phone: user.phone
                })
            })
            // Set the status based on the response from the API route
            if (response.status === 200) {
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    message: ""
                })
                getList();
                setStatus('success');
            } else {
                setStatus('error');
            }

        } catch (e) {
            console.log(e)
        }
    }
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
    const getList = async (e) => {
        const response = await fetch('/api/contact').then((res) => res.json()).catch(error => { console.log(error) });
        if (response.data.length === 0) {
            setshowNoDataMessage(true)
        } else {
            setshowNoDataMessage(false)
            SetUserData(response.data)
        }

    }
    const OnDelete = async (_id) => {
        try {
            const response = await fetch(`/api/contact?id=${_id}`, {
                method: 'DELETE',
                headers: { "Content_Type": "application/json" },
                body: JSON.stringify({
                    id: _id
                })
            })
            // Set the status based on the response from the API route
            if (response.status === 200) {
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    message: ""
                })
                getList();
                setDeleteStatus('success');
            } else {
                setDeleteStatus('error');
            }

        } catch (e) {
            console.log(e)
        }
    }
    return (

        <div class="container text-center">
            <div class="row">
                <div class="col">
                    <span class="navbar-brand mb-0 h1">Add User</span>
                    <form className={styles.contact_form} onSubmit={handleSubmit}>
                        <div className={styles.input_field}>
                            <label htmlFor="username" className={styles.label}>
                                Enter your name
                                <input type="text" name="username" id="username"
                                    placeholder="Enter your name"
                                    value={user.username}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>

                        <div className={styles.input_field}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                                <input type="text" name="email" id="email"
                                    placeholder="Enter your email"

                                    value={user.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                />
                            </label>
                        </div>

                        <div className={styles.input_field}>
                            <label htmlFor="phone" className={styles.label}>
                                Phone Number
                                <input type="number" name="phone" id="phone"
                                    placeholder="Enter your phone"

                                    value={user.phone}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                />
                            </label>
                        </div>

                        <div>
                            {status === 'success' && <p className={styles.success_msg}>User Add Sucessfully!</p>}
                            {status === 'error' && <p className={styles.error_msg}>There was an error submitting your message. Please try again.</p>}
                            <button className={styles.sendMessage} type="submit" >Send Message</button>
                        </div>


                    </form>
                </div>
                <div class="col">
                    <span class="navbar-brand mb-0 h1">User List</span>
                    {/* <button className={styles.sendMessage} type="submit" onClick={getList}>Show UserData</button> */}
                    {showNoDataMessage ? <p className={styles.error_msg}>There was an error submitting your message. Please try again.</p> : ''}
                    {
                        userData.map((currentData => {
                            return <ul class="list-group"  key={currentData._id}>
                                <div class="row">
                                    <div class="col">
                                        <Link href={`/contact/${currentData._id}`} >
                                            <li class="list-group-item">{currentData.username} </li>
                                            <div></div>
                                        </Link></div>
                                    <div class="col">
                                        <Link href={`/contact/Edit/${currentData._id}`} >
                                            <FontAwesomeIcon icon={faPencilSquare}></FontAwesomeIcon>
                                        </Link>
                                        <button onClick={() => OnDelete(currentData._id)} >
                                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                        </button>

                                    </div>
                                </div>
                                {deleteStatus === 'success' && <p className={styles.success_msg}>User Remove Sucessfully!</p>}
                                {deleteStatus === 'error' && <p className={styles.error_msg}>There was an error submitting your message. Please try again.</p>}

                            </ul>

                        }))
                    }
                </div>
            </div>
        </div>

    )
}
