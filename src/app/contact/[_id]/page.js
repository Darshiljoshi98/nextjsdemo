"use client"
import { React, useEffect, useState } from 'react';
import styles from "@/app/styles/contact.module.css"
import { useRouter } from 'next/navigation';

const viewContact = ({ params }) => {
    const [userData, setUserData] = useState([]);
    const router = useRouter();
    useEffect(() => {
        fetch(`/api/contact/${params._id}?id=${params._id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)           
                setUserData(data.data[0])
            })
    }, [])

    function gotoContactPage(){

        router.push('/contact')
    }

    return (
        <div>     
            <button className={styles.sendMessage} type="submit" onClick={gotoContactPage}>GoToHome</button>
            
             <ul class="list-group">
                <li class="list-group-item">{userData.username}</li>
                <li class="list-group-item">{userData.email}</li>
                <li class="list-group-item">{userData.phone}</li>
            </ul>
          
        </div>

    );
};

export default viewContact;