import React, {useState, useEffect, useContext} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    Redirect,
    useParams
  } from "react-router-dom";
import AdminNavbar from './AdminNavbar';
import { UserContext } from './Navbar';
import M from 'materialize-css'

function AdminCourses(props) {

    const context = useContext(UserContext);

    const [name, setName] = useState("");
    const [newId, setNewId] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [courses, setCourses] = useState([]);
    const [course,setCourse] = useState({id:0,name:""});

    

    const handleNameChange = event =>{
        setName(event.target.value)
      }

    const handleCourseDataChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setCourse((prevalue) => {
          return {
            ...prevalue,            
            [name]: value
          }
        })
      }

    useEffect (()=>{
        context.profile();
        var elems = document.querySelector('.sidenav');
        var instances = M.Sidenav.init(elems,{});

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});

        M.updateTextFields();

        loadCourses(searchText);
    },[newId]);

    M.updateTextFields();

    async function loadCourses(text){
        console.log(context)
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/courses/read/all?searchString="+text,{
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
            let listCourses = await response.json();
            setCourses(listCourses);
        }
    }

    const addCourseSubmit = event =>{
        const data = {name:name};
        addCourse(data);
        event.preventDefault();
    }

    const editCourseSubmit = event =>{
      editCourse(course);
      event.preventDefault();
    }

    const deleteCourseSubmit = event =>{
      deleteCourse(course);
      event.preventDefault();
    }

    async function editCourse(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/v1/public/courses/savecourse", {
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
            setName("");
            setNewId(newId+1);
        }
       
    }

    async function deleteCourse(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/v1/public/courses/deletecourse", {
          method: "DELETE",
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
            setCourse({id:0,name:""});
            setNewId(newId+1);
        }
       
    }

    async function addCourse(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/v1/public/courses/addcourse", {
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
            let Data = await response.json();
            setName("");
            setNewId(Data.id);
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
                            <h5 className="brand-logo" style={{color: "black", paddingLeft:"15px"}}>Courses</h5>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><button data-target="modal1" className=" btn modal-trigger" style={{marginRight:"15px"}}>Add New</button></li>
                            </ul>
                        </div>
                    </nav>
                    
                    <table className="table striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th width="20%">Details</th>
                            </tr>
                        </thead>

                        <tbody>
                        {courses?.map(course=>(
                            <tr>
                                <td>{course.id}</td>
                                <td>{course.name}</td>
                                <td width="23%">
                                    <button data-target="modal2" className="btn small modal-trigger" onClick={()=>setCourse(course)}>Edit</button>
                                    <button data-target="modal3"  className="btn red  modal-trigger" onClick={()=>setCourse(course)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>


                    <div id="modal1" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
                        <form onSubmit={addCourseSubmit}>
                            <div class="modal-content">
                                <h4>Add Course</h4>
                                <br/>
                                <div className="input-field">
                                <input id="name" type="text" value={name} onChange={handleNameChange} className="validate"/>
                                <label className="active" for="name">Name</label>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button  class="modal-close waves-effect waves-green btn green">Add New</button>
                            </div>
                        </form>
                    </div>

                    <div id="modal2" style={{width:"500px",height:"300px"}}  class="modal modal-fixed-footer">
                        <form onSubmit={editCourseSubmit}>
                            <div class="modal-content">
                                <h4>Edit Course</h4>
                                <br/>
                                <div className="input-field">
                                    <input id="name2" type="text" name="name" value={course.name} onChange={handleCourseDataChange} className="validate"/>
                                    <label className="active" for="name2">Name</label>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button  class="modal-close waves-effect waves-green btn green">Edit</button>
                            </div>
                        </form>
                    </div>

                    <div id="modal3" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
                        <form onSubmit={deleteCourseSubmit}>
                            <div class="modal-content">
                                <h4>Delete Course</h4>
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
export default AdminCourses;