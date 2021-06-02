import React, {useState, useEffect, useContext} from 'react';
import AdminNavbar from './AdminNavbar';
import { UserContext } from './Navbar';
import M from 'materialize-css'

function AdminUser(props) {
    const context = useContext(UserContext);
    const [roles,setRoles] = useState([]);
    const [users,setUsers] = useState([]);
    const [newId,setNewId] = useState(0);
    const [name,setName] = useState("");
    const [role,setRole] = useState({id:0,role:""});
    const [user,setUser] = useState({id:0,role:""});


    const handleNameChange = event =>{
        setName(event.target.value);
    }

    const handleRoleDataChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setRole((prevalue) => {
          return {
            ...prevalue,            
            [name]: value
          }
        })
    }


    useEffect(() => {
    
        context.profile();
        var elems = document.querySelector('.sidenav');
        var instances = M.Sidenav.init(elems,{});

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});

        M.updateTextFields();

        loadUsers();
    }, [newId]);

    M.updateTextFields();

    async function loadUsers() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/read/all",{
          method:"GET",
        withCredentials: true,
        cache: "no-cache",
        credentials:"same-origin",
        mode:"cors",
        headers: {
          "Authorization":bearer,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
         redirect: "follow",
        referrerPolicy: "no-referrer",
           }
        );
        if(response.status==200){
        let Data = await response.json();
        setUsers(Data);
        }
    }

    return (
        <div className="container">
            <div className="row">

                <div className="col-3">
                    <AdminNavbar />
                </div>
                
                <div className="container-fluid card" style={{width:"770px"}}>

                    <nav style={{backgroundColor: "white", marginTop:"10px"}}>
                        <div className="nav-wrapper">
                            <h5 className="brand-logo" style={{color: "black", paddingLeft:"15px"}}>Users</h5>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><button data-target="modal1" className=" btn modal-trigger" style={{marginRight:"15px"}}>Add New</button></li>
                            </ul>
                        </div>
                    </nav>
                    
                    <table className="table striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th width="20%">Details</th>
                            </tr>
                        </thead>

                        <tbody>
                        {users?.map(user=>(
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.fullName}</td>
                                <td width="23%">
                                    <a className="btn small" href={`/user_details/${user.id}`}>Details</a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default AdminUser;