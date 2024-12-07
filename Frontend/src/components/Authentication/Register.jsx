import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import * as Yup from "yup"

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({})
    const [userData, setUserData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate()

    // Validation schema
    const schema = Yup.object().shape({
        fname: Yup.string().required('Name is required'),
        lname: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
      });


    const handleChange = (event) => {
        setUserData(prevUser => {
            return ({
                ...prevUser,
                [event.target.name]: event.target.value
            })
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError({})
        try {
            //validating form data
            await schema.validate(userData, {abortEarly: false})

            //call an api if valid
            axios.post('https://cms-hwdq.onrender.com/users', userData)
            .then(response => console.log(response))
            .catch(error => console.log(error.message))
            console.log("success")
            navigate('/login')
        } catch (err) {
            const newErrors = {};
            err.inner.forEach((error) => {
              newErrors[error.path] = error.message;
            });
            setError(newErrors);
            toast.error(newErrors.confirmPassword)
        }
    }

    return (
        <div className="apps-container">
            <Toaster richColors expand={false} position="bottom-center" />
            <div className="register-container">
                <form onSubmit={handleSubmit} >
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" className="inputs em-pas" minLength={3} required name="fname" onChange={handleChange} />
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" className="inputs em-pas" minLength={2} required name="lname" onChange={handleChange} />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required placeholder="john@example.com" className="inputs em-pas" name="email" onChange={handleChange} />
                        <label htmlFor="password">Password</label>
                        <input type={showPassword ? "text" : "password"} required placeholder="password" id="password" className="inputs em-pas" name="password" onChange={handleChange} />
                        <div className="passwordVisibility">
                        <input type="checkbox" id="passwordVisibility" onClick={togglePasswordVisibility} name="passwordVisibility" />
                            <label htmlFor="passwordVisibility" className="showPasswordLabel">  {showPassword ? "Hide password" : "Show password"}</label>
                        </div>
                    <label htmlFor="#confirm-password">Confirm Password</label>
                    <input type={showPassword ? "text" : "password"} id="confirm-password" className="inputs em-pas" required placeholder="Confirm password" onChange={handleChange} name="confirmPassword" />
                    <input type="submit" className="btn1 inputs" name="create-account" value="Create account" />
                </form>
            </div>
        </div>
    )
}

export default Register