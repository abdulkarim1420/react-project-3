import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function Users() {

    const [users, setUsers] = useState([]);
    const [usersUpdatePage, setRun] = useState(1);

    const context = useContext(User);
    const token = context.auth.token;

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user/show', {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
        .then((data) => setUsers(data.data))
        .catch((err) => console.log(err))
    }, [usersUpdatePage]);


    async function deleteUser(id) {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            })
            if ((res.status) === 200) {
                setRun((prev) => prev + 1);
            }
        } catch {
            console.log('None');
        }
    }


    const userShow = users.map((user, index) => 

        <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
            <Link to={`${user.id}`}>
            <i className="fa-solid fa-pen-to-square" style={{ marginRight: "10px", color: "lightskyblue", cursor: "pointer" }}></i>
            </Link>
            <i className="fa-solid fa-trash" style={{ color: "red", cursor: "pointer" }} onClick={() => deleteUser(user.id)}></i>
            </td>
        </tr>
    )

    return (
        <div style={{  padding: '20px' }}>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userShow}
                </tbody>
            </table>
        </div>
    )
}