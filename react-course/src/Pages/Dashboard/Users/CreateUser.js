import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie";
import { User } from "../../Website/Context/UserContext";

export default function CreateUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const nav = useNavigate();

    // Worked by Cookies
        // const cookie = new Cookies();
        // const token = cookie.get("Bearer");

    const context = useContext(User);
    const token = context.auth.token;

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
                let res = await axios.post('http://127.0.0.1:8000/api/user/create', {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation,
                }, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

                nav('/dashboard/users');

        } catch(err) {
            if (err.response.status === 422) {
                setEmailError(true);
            }
            setAccept(true);
        }
        
      }

      return (
        <div>
            <div className="parent">
                <div className="register">
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
                                <button type="submit">Create User</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
  }