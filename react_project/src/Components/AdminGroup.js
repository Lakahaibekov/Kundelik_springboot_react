import React, {useState, useEffect, useContext} from 'react';
import AdminNavbar from './AdminNavbar';
import { UserContext } from './Navbar';
import M from 'materialize-css'

function AdminGroup(props) {
    const context = useContext(UserContext);
    const [groups,setGroups] = useState([]);
    const [newId,setNewId] = useState(0);
    const [searchText, setSearchText] = useState("");

    const [users,setUsers] = useState([]);
    const [group,setGroup] = useState([{id:0,name:"",adviser:1}]);

    const handleGroupDataChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setGroup((prevalue) => {
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

        loadGroups(searchText);
        loadUsers(searchText);
    }, [newId]);

    M.updateTextFields();

    async function loadUsers() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/v1/public/teachers/read/all",{
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
            console.log(Data)
            setUsers(Data);
        }
    }

    function setGroup2(data){
        setGroup({
            id:data.id,
            name:data.name,
            adviser:data.adviser.id
        })
        console.log(group);
    }

    function setGroup3(){
        setGroup({
            id:0,
            name:"",
            adviser:1
        });
        console.log(group);
    }

    async function loadGroups() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/groups/read/all",{
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
        setGroups(Data);
        }
    }

    const addGroupSubmit = event =>{
        const data = {name:group.name,
        adviser:{id:group.adviser,email:"",password:"",fullName:""}
        };
        addGroup(data);
        event.preventDefault();
    }

    const editGroupSubmit = event =>{
        console.log(group);
        const data = {
          id:group.id,
          name:group.name,
          adviser:{id:group.adviser,email:"",password:"",fullName:""}
          };
        editGroup(data);
        event.preventDefault();
    }

    const deleteGroupSubmit = event =>{
        deleteGroup(group);
        event.preventDefault();
    }

    async function editGroup(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/v1/public/groups/savegroup", {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Authorization":bearer,
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        });
        if(response.status==200){
            let Data = await response.json();
            setGroup({
              id:0,
              name:"",
              adviser:1
            });
            console.log(Data);
            setNewId(newId+1);
        }
    }

    async function deleteGroup(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/v1/public/groups/delete/one/"+ data.id, {
          method: "DELETE",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Authorization":bearer,
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer"
        });
        if(response.status==200){
          setGroup({
            id:0,
            name:"",
            adviser:1
          });
            setNewId(newId+1);
        }
    }

    async function addGroup(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/v1/public/groups/addgroup", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Authorization":bearer,
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        });
        if(response.status==200){
           // let Data = await response.json();
            setGroup({
              id:0,
              name:"",
              adviser:1
            });
            setNewId(newId+1);
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
                            <h5 className="brand-logo" style={{color: "black", paddingLeft:"15px"}}>Groups</h5>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><button data-target="modal1" onClick={()=>setGroup3()} className=" btn blue modal-trigger" style={{marginRight:"15px"}}>Add New</button></li>
                            </ul>
                        </div>
                    </nav>
                    
                    <table className="table striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Adviser</th>
                                <th width="20%">Details</th>
                            </tr>
                        </thead>

                        <tbody>
                        {groups?.map(group=>(
                            <tr>
                                <td>{group.id}</td>
                                <td>{group.name}</td>
                                <td>{group.adviser.fullName}</td>
                                <td width="23%">
                                    <button data-target="modal2" className="btn green modal-trigger" onClick={()=>setGroup2(group)}>Edit</button>
                                    <button data-target="modal3"  className="btn red  modal-trigger" onClick={()=>setGroup(group)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>


                    <div id="modal1" style={{width:"500px",height:"400px"}} class="modal modal-fixed-footer">
                        <form onSubmit={addGroupSubmit}>
                            <div class="modal-content">
                                <h4>Add Group</h4>
                                <br/>
                                <div className="input-field">
                                    <input id="name" type="text" name="name" value={group.name} onChange={handleGroupDataChange} className="validate"/>
                                    <label className="active" for="name">Name</label>
                                </div>
                                <div className="input-field">
                                    <select className="browser-default" value={group.adviser} onChange={handleGroupDataChange} name="adviser">
                                        {users?.map(user=>
                                            <option value={user.id}>{user.fullName}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button  class="modal-close waves-effect waves-green btn green">Add New</button>
                            </div>
                        </form>
                    </div>

                    <div id="modal2" style={{width:"500px",height:"300px"}}  class="modal modal-fixed-footer">
                        <form onSubmit={editGroupSubmit}>
                            <div class="modal-content">
                                <h4>Edit Group</h4>
                                <br/>
                                <div className="input-field">
                                    <input id="name" type="text" name="name" value={group.name} onChange={handleGroupDataChange} className="validate"/>
                                    <label className="active" for="name">Name</label>
                                </div>
                                <div className="input-field">
                                    <select className="browser-default" value={group.adviser} onChange={handleGroupDataChange} name="adviser">
                                        {users.map(user=>
                                            <option value={user.id}>{user.fullName}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button  class="modal-close waves-effect waves-green btn green">Edit</button>
                            </div>
                        </form>
                    </div>

                    <div id="modal3" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
                        <form onSubmit={deleteGroupSubmit}>
                            <div class="modal-content">
                                <h4>Delete Group</h4>
                                <br/>
                                <h5>Are you sure?</h5>  
                            </div>
                            <div class="modal-footer">
                                <button  class="modal-close waves-effect waves-green btn red">Delete</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminGroup;