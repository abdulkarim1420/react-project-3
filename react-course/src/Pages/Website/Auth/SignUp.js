import { useContext, useState } from "react";
import axios from "axios";
import Header from "../../../Components/Header";
import './login.css';
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const nav = useNavigate();

    // Cookie
    const cookie = new Cookies();

    // Get user
    const userNow = useContext(User);

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
                let res = await axios.post('http://127.0.0.1:8000/api/register', {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation,
                });

                const token = res.data.data.token;
                cookie.set('Bearer' , token);
                const userDetails = res.data.data.user;
                userNow.setAuth({ token, userDetails });

                nav('/dashboard');

        } catch(err) {
            if (err.response.status === 422) {
                setEmailError(true);
            }
            setAccept(true);
        }
        
      }

      return (
        <div>
        <Header />
            <div className="parent login">
                <div className="register login">
                        <form onSubmit={Submit}>
                            <label htmlFor="name">Name:</label>
                            <input id="name" type="text" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} />
                            {name === '' && accept && <p className="error">Username is Required.</p>}

                            <label htmlFor="email">Email:</label>
                            <input id="email" type="email" placeholder="Email..." required value={email} onChange={(e) => setEmail(e.target.value)} />
                            {accept && emailError && (<p className="error">Email is already been taken.</p>)}
                            

                            <label htmlFor="password">Password:</label>
                            <input id="password" type="password" placeholder="Password..." autoComplete="ture" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {password.length < 8 && accept && <p className="error">Password must be more than 8 degit.</p>}

                            <label htmlFor="repeat">Repeat password:</label>
                            <input id="repeat" type="password" placeholder="Repeat password..." autoComplete="true" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                            {passwordConfirmation !== password && accept && <p className="error">Password does not match.</p>}
                            <div style={{ textAlign: "center" }}>
                                <button type="submit">Sign Up</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
  }