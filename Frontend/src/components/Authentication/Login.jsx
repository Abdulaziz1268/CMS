import photo from './google-icon.png'
import React, {useEffect, useState} from 'react'
import Register from './Register';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import api from './request'


function Login(props) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

        const togglePasswordVisibility = () => {
            setShowPassword((prevState) => !prevState);
        }

    const handleChange = (event) => {
        setFormData(prevData => {
            return ({
                ...prevData,
                [event.target.name]: event.target.value
            })
        })
    }
    
    const handleClick = () => {
        navigate("/Register")
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        api.post('/login', formData)
            .then(result => {
                setIsLoading(true)
                const token = result.data.token
                const email = result.data.email
                const fname = result.data.fname
                const role = result.data.role
                localStorage.setItem('token', token)
                localStorage.setItem('email', email)
                localStorage.setItem('fname', fname)
                localStorage.setItem('role', role)
                props.handleIsLoged()
                if(result.data.role === 'admin'){
                    navigate('/admin')
                } else {
                    navigate('/')
                }             
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data.message)
            })
    }
    
   
    return (
        <div className="apps-container">
            <Toaster richColors expand={false} position='bottom-center' />
            <div className="login-container">
                <h2>Welcome Back!</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" >User Name</label>
                    <input type="email" id="username" onChange={handleChange}  required placeholder="john@example.com" className="inputs em-pas" name="email" value={formData.email} />
                    <label htmlFor="password">Password</label>
                    <input type={showPassword ? "text" : "password"} onChange={handleChange} required placeholder="password" id="password" className="inputs em-pas" value={formData.password} name="password" />
                    <div className="passwordVisibility">
                    <input type="checkbox" id="passwordVisibility" onClick={togglePasswordVisibility} name="passwordVisibility" />
                        <label htmlFor="passwordVisibility" className="showPasswordLabel">  {showPassword ? "Hide password" : "Show password"}</label>
                        <Link to={"/ForgetPassword"} className="forget-password">forget password?</Link>
                    </div>
                    
                    <input type="submit" className="inputs btn btn1" name="Login" disabled={isLoading} value={isLoading ? "Processing..." : "Login"} />
                
                </form>
                <h4><span>or</span></h4>
                <div className="login-options">
                    {/* <button className="btn button" ><img src={photo} alt="google icon" className="google-icon" /><p>Login with Gmail</p></button> */}
                    <button className="btn create-account button" onClick={handleClick} >Create a new account</button>
                </div>
            </div>
        </div>
    )
}

export default Login;