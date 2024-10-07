import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie";
import { User } from "../../Website/Context/UserContext";

export default function UpdateProduct() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState("");
    const [accept, setAccept] = useState(false);

    const id = window.location.pathname.split('/').slice(-1)[0];
    const nav = useNavigate();

    // Worked by Cookies
        // const cookie = new Cookies();
        // const token = cookie.get("Bearer");

    const context = useContext(User);
    const token = context.auth.token;

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
        .then((data) => {
            setTitle(data.data[0].title);
            setDescription(data.data[0].description);
        })
        .catch((err) => console.log(err))
    }, []);

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image);
                let res = await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`,
                    formData,
                 {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

                nav('/dashboard/products');

        } catch(err) {
            setAccept(true);
            console.log(err)
        }
        
      }

      return (
        <div>
            <div className="parent">
                <div className="register">
                        <form onSubmit={Submit}>
                            <label htmlFor="title">Title:</label>
                            <input id="title" type="text" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} />
                            {title === '' && accept && <p className="error">Title is Required.</p>}

                            <label htmlFor="description">Description:</label>
                            <input id="description" type="Text" placeholder="Description..." required value={description} onChange={(e) => setDescription(e.target.value)} />
                            {description === '' && accept && <p className="error">Description is Required.</p>}
                            

                            <label htmlFor="image">Image:</label>
                            <input id="image" type="file" onChange={(e) => setImage(e.target.files.item(0))} />
                            {/* {password.length < 8 && accept && <p className="error">Password must be more than 8 degit.</p>} */}


                            <div style={{ textAlign: "center" }}>
                                <button type="submit">Update Product</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
  }