import {Route, Routes} from 'react-router-dom';
// Auth
import SignUp from "./Pages/Website/Auth/SignUp"
import Login from './Pages/Website/Auth/Login';
// Website 
import Home from './Pages/Website/Home';
import About from './Pages/Website/About';
// Dashboard 
import Dashboard from './Pages/Dashboard/Dashboard';
// Users 
import Users from './Pages/Dashboard/Users/Users';
import CreateUser from './Pages/Dashboard/Users/CreateUser';
import UpdateUser from './Pages/Dashboard/Users/UpdateUser';
import RequireAuth from './Pages/Website/Auth/RequireAuth';
import PersistLogin from './Pages/Website/Auth/PersistLogin';
import Products from './Pages/Dashboard/Products/Products';
import NewProduct from './Pages/Dashboard/Products/NewProduct';
import UpdateProduct from './Pages/Dashboard/Products/UpdateProduct';

export default function App() {

    return (
        <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            {/* Protected Routes  */}
            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                    <Route path='/dashboard' element={<Dashboard />} >
                        <Route path='users' element={<Users />} />
                        <Route path='user/create' element={<CreateUser />} />
                        <Route path='users/:id' element={<UpdateUser />} />

                        <Route path='products' element={<Products />} />
                        <Route path='products/create' element={<NewProduct />} />
                        <Route path='products/:id' element={<UpdateProduct />} />
                    </Route>
                </Route>
            </Route>

        </Routes>
        </div>
        
    )
  }