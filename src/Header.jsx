import React, { useEffect, useState} from "react";
import {BsSearch, BsJustify} from 'react-icons/bs';
import axios from "axios";

function Header(){

    let profileDropdownList = document.querySelector(".profile-dropdown-list");
    let btn = document.querySelector(".profile-dropdown-btn");

    const toggle = () => {
        profileDropdownList.classList.toggle("active");
        window.addEventListener("click", function(e){
            if(!btn.contains(e.target)) profileDropdownList.classList.remove("active")
        })
    }

    const handleLogout = () => {
		axios.get('http://localhost:8081/logout')
		.then( res => {
			if(res.data.Status === "Success"){
				window.location.reload(true);
			}
			else{
				alert("error");
			}
		}).catch(err => console.log(err))
	}

    return(
        <header className='header'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
            <div className="menu-icon">
                <BsJustify className="icon"/>
            </div>
            <div className="header-left">
                <BsSearch className="icon"/> 
            </div>

            <div className="profile-dropdown">
                <div className="profile-dropdown-btn " onClick={toggle}>
                    <div className="profile-img">
                        <i className="fa-solid fa-circle"> </i>
                    </div>
                    <span>
                    User
                    <i className="fa-solid fa-angle-down"></i>
                    </span>

                <ul className="profile-dropdown-list">
                    <li className="profile-dropdown-list-item">
                        <a href="/Userprofile">
                            <i className="fa-regular fa-user"></i>
                            Edit Profile
                        </a>
                    </li>

                    <li className="profile-dropdown-list-item">
                        <a href="/Inbox">
                            <i className="fa-regular fa-envelope"></i>
                            Inbox
                        </a>
                    </li>

                    <li className="profile-dropdown-list-item">
                        <a href="/Analytics">
                            <i className="fa-solid fa-chart-line"></i>
                            Analytics
                        </a>
                    </li>

                    <li className="profile-dropdown-list-item">
                        <a href="/Settings">
                            <i className="fa-solid fa-sliders"></i>
                            Settings
                        </a>
                    </li>

                    <li className="profile-dropdown-list-item">
                        <a href="/Help">
                            <i className="fa-regular fa-circle-question"></i>
                            Help & Support
                        </a>
                    </li>
                    <hr />
                    <li className="profile-dropdown-list-item">
                        <a onClick={handleLogout}>
                            <i className="fa-solid fa-arrow-right-from-bracket" ></i>
                            Log Out
                        </a>
                    </li>
                </ul>
            </div>
            </div>
        </header>
       
    )

}

export default Header;