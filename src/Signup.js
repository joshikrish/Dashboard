import React, {useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import valid from './SignupValidation';
import axios  from 'axios';
import './styles.css';

function Signup(){
    const [values, setValues] = useState({
            name: '',
            email: '',
            password: ''
        })

    const navigate =  useNavigate();
    const [errors, setErrors] = useState({})

    const [showBtn, setShowBtn] = useState(false)
    
    useEffect(() => {
        if(values.name && values.name.length && values.email && values.email.length && values.password && values.password.length){
            setShowBtn(true);
        }else{
            return;
        }
    },[values.name,values.email,values.password]);

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]:event.target.value}))
    }

    const handleSubmit  = (event) => {    
            event.preventDefault();
            const err = valid(values);
            setErrors(err)
            if(err.name === "" && err.email === "" && err.password ===""){
                axios.post('http://localhost:8081/signup',values)
                .then(res => {
                    console.log(res);
                    if(res.data === "Error" && res.data === "Account already created"){
                        alert("Failed! Seems you already have a account. Try logging in !!")
                    }
                    else{
                        alert("Account created successfully!!");
                        navigate('/');
                    }
                })  
                .catch(e => console.log(e));
            }
    }

    return (
        <div className= "back d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className='bg-white p-3 rounded w-25'>
            <Link to='/'>
                <span>Back</span>
            </Link>
                <h2 className='pb-4'>Create your Account</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="pb-4">
                        <label className="sc-dCFHLb gxHIdr"> Your Name </label>
                        <div className="sc-eeDRCY hapxVj">
                            <div className="sc-koXPp cKXuiA eui-input-container">
                                <div className="sc-cWSHoV dDXBTB">
                                    <input type="name" placeholder="Enter Your Name" name="name"
                                    onChange={handleInput} className="sc-bmzYkS eUhKiq"/>
                                    {errors.name && <span className="text-danger">{errors.name}</span>}
                                </div>
                            </div>
                            <div className="sc-dtBdUo hHvdph">
                                <div className="sc-kOHTFB dZoPQT"></div>
                            </div>
                        </div>
                    </div>
                    <div className="pb-4">
                        <label className="sc-dCFHLb gxHIdr"> Your Work Email </label>
                        <div className="sc-eeDRCY hapxVj">
                            <div className="sc-koXPp cKXuiA eui-input-container">
                                <div className="sc-cWSHoV dDXBTB">
                                    <input type="email" placeholder="Enter Work Email" name="email"
                                    onChange={handleInput} className="sc-bmzYkS eUhKiq"/>
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </div>
                            </div>
                            <div className="sc-dtBdUo hHvdph">
                                <div className="sc-kOHTFB dZoPQT"></div>
                            </div>
                        </div>
                    </div>

                    <div className="pb-4">
                        <label className="sc-dCFHLb gxHIdr"> Your Password </label>
                        <div className="sc-eeDRCY hapxVj">
                            <div className="sc-koXPp cKXuiA eui-input-container">
                                <div className="sc-cWSHoV dDXBTB">
                                    <input type="password" placeholder="Enter Password" name="password"
                                    onChange={handleInput} className="sc-bmzYkS eUhKiq"/>
                                    {errors.password && <span className="text-danger">{errors.password}</span>}
                                </div>
                            </div>
                            <div className="sc-dtBdUo hHvdph">
                                <div className="sc-kOHTFB dZoPQT"></div>
                            </div>
                        </div>
                    </div>

                    <div className=" mt-3 text-center">
                        <button type='submit' className={!showBtn ? "": "abc"} disabled={!showBtn} color="primary">
                            <span > Create Your Account </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;