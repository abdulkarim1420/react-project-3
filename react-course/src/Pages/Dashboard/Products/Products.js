import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function Products() {

    const [products, setProducts] = useState([]);
    const [usersUpdatePage, setRun] = useState(1);

    const context = useContext(User);
    const token = context.auth.token;

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/product/show', {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
        .then((data) => setProducts(data.data))
        .catch((err) => console.log(err))
    }, [usersUpdatePage]);


    async function deleteProduct(id) {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            })
            if ((res.status) === 200) {
                setRun((prev) => prev + 1);
            }
        } catch(err) {
            console.log(err);
        }
    }


    const productShow = products.map((product, index) => 

        <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td><img src={product.image} alt="product-image" width="100" height="100" /></td>
            <td>
            <Link to={`${product.id}`}>
            <i className="fa-solid fa-pen-to-square" style={{ marginRight: "10px", color: "lightskyblue", cursor: "pointer" }}></i>
            </Link>
            <i className="fa-solid fa-trash" style={{ color: "red", cursor: "pointer" }} onClick={() => deleteProduct(product.id)}></i>
            </td>
        </tr>
    )

    return (
        <div style={{  padding: '20px' }}>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {productShow}
                </tbody>
            </table>
        </div>
    )
}