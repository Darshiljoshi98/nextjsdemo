"use client"
import React, { useEffect, useState } from 'react'
import styles from '../../../styles/contact.module.css'
import { Router, useRouter } from 'next/navigation'
const EditPage = ({ params }) => {
  if(params._id === null || params._id === undefined){
    params._id = 1
  }
  // const [userData, setUserData] = useState([]);
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",

})

const route= useRouter();
const [status, setStatus] = useState(null);
  useEffect(() => {
    fetch(`/api/contact/${params._id}?id=${params._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUser(data.data[0])
      })
  }, [params._id])

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    console.log(user.username)
    console.log(user.email)
    console.log(user.phone)

    try {
        const response = await fetch(`/api/contact?id=${params._id}`, {
            method: 'PUT',
            headers: { "Content_Type": "application/json" },
            body: JSON.stringify({
                username: user.username,
                email: user.email,
                phone: user.phone
            })
        })
        // Set the status based on the response from the API route
        if (response.status === 200) {
          setStatus('success');
          setTimeout(goToMainPage, 5000);
          
        } else {
            setStatus('error');
        }

    } catch (e) {
        console.log(e)
    }
}

function goToMainPage( ){
  route.push('/contact')
}

function handleChange(e) {
  const name = e.target.name;
  const value = e.target.value;

  setUser((prevUser) => ({ ...prevUser, [name]: value }));
}

  return (
    <div>EditPage
     
      <form className={styles.contact_form} onSubmit={handleSubmit}>
                <div className={styles.input_field}>
                    <label htmlFor="username" className={styles.label}>
                        Enter your name
                        <input type="text" name="username" id="username"
                            placeholder="Enter your name"
                            value={user.username}
                            onChange={handleChange}
                            required
                            disabled
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
                            autoComplete="off"
                        />
                    </label>
                </div>
                <div>
                            {status === 'success' && <p className={styles.success_msg}>User Update Sucessfully!</p>}
                            {status === 'error' && <p className={styles.error_msg}>There was an error submitting your message. Please try again.</p>}

                            <button className={styles.sendMessage} type="submit" >Send Message</button>
                        </div>
            </form>
          
    </div>
  )
}
export default EditPage;