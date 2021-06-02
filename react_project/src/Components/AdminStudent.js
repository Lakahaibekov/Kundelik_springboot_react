import React, {useState, useEffect, useContext} from 'react';
import AdminNavbar from './AdminNavbar';
import { UserContext } from './Navbar';
import M from 'materialize-css'


function AdminStudent(props) {
    const context = useContext(UserContext);
    const [groupAndStudents,setGroupAndStudents] = useState([]);
    const [groups,setGroups] = useState([]);
    const [newId,setNewId] = useState(0);
    const [searchText, setSearchText] = useState("");

    const [users,setUsers] = useState([]);
    const [groupAndStudent,setGroupAndStudent] = useState([{id:0,group:1,student:1}]);

    const handleGroupAndStudentDataChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setGroupAndStudent((prevalue) => {
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
        loadGroupAndStudents(searchText);
        loadUsers(searchText);
    }, [newId]);

    M.updateTextFields();

    async function loadUsers() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/v1/public/students/read/all",{
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

    function setGroupAndStudent2(data){
        setGroupAndStudent({
            id:data.id,
            group:data.group.id,
            student:data.student.id
        })
        console.log(groupAndStudent);
    }

    function setGroupAndStudent3(){
        setGroupAndStudent({
            id:0,
            group:1,
            student:1
        });
        console.log(groupAndStudent);
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

    async function loadGroupAndStudents() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/groups/read/all/groupandstudents",{
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
        setGroupAndStudents(Data);
        }
    }

    const addGroupAndStudentSubmit = event =>{
        const data = {
            groupId:groupAndStudent.group,
            studentId:groupAndStudent.student
        };
        addGroupAndStudent(data);
        event.preventDefault();
    }

    const editGroupAndStudentSubmit = event =>{
        console.log(groupAndStudent);
        const data = {
          id:groupAndStudent.id,
          groupId:groupAndStudent.group,
          studentId:groupAndStudent.student
        };
        addGroupAndStudent(data);
        event.preventDefault();
    }

    const deleteGroupAndStudentSubmit = event =>{
        deleteGroupAndStudent(groupAndStudent);
        event.preventDefault();
    }

    async function deleteGroupAndStudent(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/v1/public/groups/delete/one/groupandstudents/"+ data.id, {
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
        if(response.status==500){
            setGroupAndStudent({
                id:0,
                group:1,
                student:1
            });
            setNewId(newId+1);
        }
    }

    async function addGroupAndStudent(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/v1/public/groups/addgroupandstudents", {
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
            setGroupAndStudent({
                id:0,
                group:1,
                student:1
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
                            <h5 className="brand-logo" style={{color: "black", paddingLeft:"15px"}}>Students</h5>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><button data-target="modal1" onClick={()=>setGroupAndStudent3()} className=" btn blue modal-trigger" style={{marginRight:"15px"}}>Add New</button></li>
                            </ul>
                        </div>
                    </nav>
                    
                    <table className="table striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Group</th>
                                <th>Student</th>
                                <th width="20%">Details</th>
                            </tr>
                        </thead>

                        <tbody>
                        {groupAndStudents?.map(groupAndStudent=>(
                            <tr>
                                <td>{groupAndStudent.id}</td>
                                <td>{groupAndStudent.group.name}</td>
                                <td>{groupAndStudent.student.fullName}</td>
                                <td width="23%">
                                    <button data-target="modal2" className="btn green modal-trigger" onClick={()=>setGroupAndStudent2(groupAndStudent)}>Edit</button>
                                    <button data-target="modal3"  className="btn red  modal-trigger" onClick={()=>setGroupAndStudent(groupAndStudent)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>


                    <div id="modal1" style={{width:"500px",height:"400px"}} class="modal modal-fixed-footer">
                        <form onSubmit={addGroupAndStudentSubmit}>
                            <div class="modal-content">
                                <h4>Add Student to group</h4>
                                <br/>
                                {/* <div className="input-field">
                                    <input id="name" type="text" name="name" value={group.name} onChange={handleGroupDataChange} className="validate"/>
                                    <label className="active" for="name">Name</label>
                                </div> */}
                                <div className="input-field">
                                    <select className="browser-default" value={groupAndStudent.student} onChange={handleGroupAndStudentDataChange} name="student">
                                        {users?.map(user=>
                                            <option value={user.id}>{user.fullName}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="input-field">
                                    <select className="browser-default" value={groupAndStudent.group} onChange={handleGroupAndStudentDataChange} name="group">
                                        {groups?.map(group=>
                                            <option value={group.id}>{group.name}</option>
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
                        <form onSubmit={editGroupAndStudentSubmit}>
                            <div class="modal-content">
                                <h4>Edit Student to group</h4>
                                <br/>
                                {/* <div className="input-field">
                                    <input id="name" type="text" name="name" value={group.name} onChange={handleGroupDataChange} className="validate"/>
                                    <label className="active" for="name">Name</label>
                                </div> */}
                                {/* <div className="input-field">
                                    <select className="browser-default" value={group.adviser} onChange={handleGroupDataChange} name="adviser">
                                        {users.map(user=>
                                            <option value={user.id}>{user.fullName}</option>
                                        )}
                                    </select>
                                </div> */}
                                <div className="input-field">
                                    <select className="browser-default" value={groupAndStudent.student} onChange={handleGroupAndStudentDataChange} name="student">
                                        {users?.map(user=>
                                            <option value={user.id}>{user.fullName}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="input-field">
                                    <select className="browser-default" value={groupAndStudent.group} onChange={handleGroupAndStudentDataChange} name="group">
                                        {groups?.map(group=>
                                            <option value={group.id}>{group.name}</option>
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
                        <form onSubmit={deleteGroupAndStudentSubmit}>
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

export default AdminStudent;