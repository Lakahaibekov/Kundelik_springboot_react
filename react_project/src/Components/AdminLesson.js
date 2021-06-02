import React, {useState, useEffect, useContext} from 'react';
import AdminNavbar from './AdminNavbar';
import { UserContext } from './Navbar';
import M from 'materialize-css'

function AdminLesson(props) {
    const context = useContext(UserContext);
    const [lessons,setLessons] = useState([]);
    const [groups,setGroups] = useState([]);
    const [courses,setCourses] = useState([]);
    const [newId,setNewId] = useState(0);
    const [searchText, setSearchText] = useState("");

    const [users,setUsers] = useState([]);
    const [lesson,setLesson] = useState([{id:0,name:"",group:1,teacher:1,course:1}]);

    const handleLessonChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setLesson((prevalue) => {
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
        loadLessons(searchText);
        loadCourses(searchText);
        loadUsers(searchText);
    }, [newId]);

    M.updateTextFields();

    async function loadCourses(){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/courses/read/all",{
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
        });
        let tableCourses = await response.json();
        setCourses(tableCourses);
        console.log(tableCourses)
    }

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

    function setLesson2(data){
        setLesson({
            id:data.id,
            name:data.name,
            group:data.group.id,
            teacher:data.teacher.id,
            course:data.course.id
        })
        console.log(lesson);
    }

    function setLesson3(){
        setLesson({
            id:0,
            name:"",
            group:1,
            teacher:1,
            course:1
        });
        console.log(lesson);
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

    async function loadLessons() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/lessons/read/all",{
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
        setLessons(Data);
        }
    }

    const addLessonSubmit = event =>{
        const data = {
            name:lesson.name,
            groupId:lesson.group,
            teacherId:lesson.teacher,
            courseId:lesson.course,
        };
        addLesson(data);
        event.preventDefault();
    }

    const editLessonSubmit = event =>{
        console.log(lesson);
        const data = {
            id:lesson.id,
            name:lesson.name,
            groupId:lesson.group,
            teacherId:lesson.teacher,
            courseId:lesson.course,
        };
        addLesson(data);
        event.preventDefault();
    }

    const deleteLessonSubmit = event =>{
        deleteLesson(lesson);
        event.preventDefault();
    }

    async function deleteLesson(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/v1/public/lessons/delete/one/"+ data.id, {
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
            setLesson({
                id:0,
                name:"",
                group:1,
                teacher:1,
                course:1
            });
            setNewId(newId+1);
        }
    }

    async function addLesson(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/v1/public/lessons/save/one", {
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
            setLesson({
                id:0,
                name:"",
                group:1,
                teacher:1,
                course:1
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
                            <h5 className="brand-logo" style={{color: "black", paddingLeft:"15px"}}>Lessons</h5>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><button data-target="modal1" onClick={()=>setLesson3()} className=" btn blue modal-trigger" style={{marginRight:"15px"}}>Add New</button></li>
                            </ul>
                        </div>
                    </nav>
                    
                    <table className="table striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Group</th>
                                <th>Teacher</th>
                                <th>Course</th>
                                <th>Task</th>
                                <th width="20%">Details</th>
                            </tr>
                        </thead>

                        <tbody>
                        {lessons?.map(lesson=>(
                            <tr>
                                <td>{lesson.id}</td>
                                <td>{lesson.group.name}</td>
                                <td>{lesson.teacher.fullName}</td>
                                <td>{lesson.course.name}</td>
                                <td>{lesson.name}</td>
                                <td width="23%">
                                    <button data-target="modal2" className="btn green modal-trigger" onClick={()=>setLesson2(lesson)}>Edit</button>
                                    <button data-target="modal3"  className="btn red  modal-trigger" onClick={()=>setLesson(lesson)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>


                    <div id="modal1" style={{width:"500px",height:"400px"}} class="modal modal-fixed-footer">
                        <form onSubmit={addLessonSubmit}>
                            <div class="modal-content">
                                <h4>Add Lesson</h4>
                                <br/>
                                <div className="input-field">
                                    <input id="name" type="text" name="name" value={lesson.name} onChange={handleLessonChange} className="validate"/>
                                    <label className="active" for="name">Task</label>
                                </div>
                                <div className="input-field">
                                    <select className="browser-default" value={lesson.course} onChange={handleLessonChange} name="course">
                                        {courses?.map(course=>
                                            <option value={course.id}>{course.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="input-field">
                                    <select className="browser-default" value={lesson.group} onChange={handleLessonChange} name="group">
                                        {groups?.map(group=>
                                            <option value={group.id}>{group.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="input-field">
                                    <select className="browser-default" value={lesson.teacher} onChange={handleLessonChange} name="teacher">
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
                        <form onSubmit={editLessonSubmit}>
                            <div class="modal-content">
                                <h4>Edit Lesson</h4>
                                <br/>
                                <div className="input-field">
                                    <input id="name" type="text" name="name" value={lesson.name} onChange={handleLessonChange} className="validate"/>
                                    <label className="active" for="name">Task</label>
                                </div>
                                <div className="input-field">
                                    <select className="browser-default" value={lesson.course} onChange={handleLessonChange} name="course">
                                        {courses?.map(course=>
                                            <option value={course.id}>{course.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="input-field">
                                    <select className="browser-default" value={lesson.group} onChange={handleLessonChange} name="group">
                                        {groups?.map(group=>
                                            <option value={group.id}>{group.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="input-field">
                                    <select className="browser-default" value={lesson.teacher} onChange={handleLessonChange} name="teacher">
                                        {users?.map(user=>
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
                        <form onSubmit={deleteLessonSubmit}>
                            <div class="modal-content">
                                <h4>Delete Lesson</h4>
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

export default AdminLesson;