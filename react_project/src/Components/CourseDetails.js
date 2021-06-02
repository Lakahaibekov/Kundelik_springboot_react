import React, {useState, useEffect, useContext} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import { UserContext } from './Navbar';
import M from 'materialize-css'

function CourseDetails(props) {
    const context = useContext(UserContext);

    let {lessonId} = useParams();

    const [lesson,setLesson] = useState([{id:0,name:"",course:1,teacher:1,group:1}]);
    const [course,setCourse] = useState([{id:0,name:""}]);
    const [group,setGroup] = useState([{id:0,name:"",adviser:1}]);
    const [grades,setGrades] = useState([]);
    const [students,setStudents] = useState([]);
    const [id, setId] = useState(lessonId);
    const [name, setName] = useState("");
    const [addedDate, setAddedDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const [newId, setNewId] = useState(0);
    const [users,setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [groupId, setGroupId] = useState(0);
    const [courseId, setCourseId] = useState(0);
    const [grade,setGrade] = useState([{id:0,value:0,student:1,lesson:1}]);

    const handleGradeDataChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setGrade((prevalue) => {
          return {
            ...prevalue,            
            [name]: value
          }
        })
    }

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

    useEffect (()=>{
        context.profile();
        getLesson(lessonId);
        loadGrades(lessonId);
        loadUsers(searchText);

        var elems = document.querySelector('.sidenav');
        var instances = M.Sidenav.init(elems,{});

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});

        M.updateTextFields();

        console.log(students)
    },[newId]);

    async function setData(data) {
        setId(data.id);
        setName(data.name);
        setAddedDate(new Date());
    }

    function setGrade2(data){
        setGrade({
            id:data.id,
            value:data.value,
            student:data.student,
            lesson:data.lesson
        })
        console.log(group);
    }

    function setGrade3(data){
        setGrade({
            id:0,
            value:0,
            student:data,
            lesson:1
        });
        console.log(grade);
    }

    const addGradeSubmit = event =>{
        const data = {value:grade.value,
        studentId:grade.student,
        lessonId:lessonId
        };
        addGrade(data);
        event.preventDefault();
    }

    const editGradeSubmit = event =>{
        console.log(grade);
        const data = {
          id:grade.id,
          value:grade.value,
          studentId:grade.student.id,
          lessonId:lessonId
        };
        addGrade(data);
        event.preventDefault();
    }

    const deleteGradeSubmit = event =>{
        deleteGrade(grade);
        event.preventDefault();
    }

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

    async function getLesson(lessonId) {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/lessons/read/one/"+lessonId,{
            method:"GET",
            headers:{
              "Authorization":bearer
            }
          });
        if(response.status == 200){
            let data = await response.json();
            setLesson({
                id:data.id,
                name:data.name,
                course:data.course.id,
                teacher:data.teacher.id,
                group:data.group.id
            });
            getCourse(data.course.id);
            getGroup(data.group.id);
            getStudents(data.group.id);
            console.log(data)
        }
    }

    function setLesson3(){
        setLesson({
            id:0,
            name:"",
            course:course.id,
            teacher:context.id,
            group:group.id
        });
        console.log(lesson);
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
            getLesson(lessonId);
            setNewId(newId+1);
        }
    }

    async function getCourse(courseId) {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/courses/read/one/"+courseId,{
            method:"GET",
            headers:{
              "Authorization":bearer
            }
          });
        if(response.status == 200){
            let data = await response.json();
            setCourse({
                id:data.id,
                name:data.name
            });
            console.log(data)
        }
    }

    async function getGroup(courseId) {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/groups/read/one/"+courseId,{
            method:"GET",
            headers:{
              "Authorization":bearer
            }
          });
        if(response.status == 200){
            let data = await response.json();
            setGroup({
                id:data.id,
                name:data.name,
                adviser:data.adviser
            });
            console.log(data)
        }
    }

    async function loadGrades(lessonId){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/grades/read/all/lesson/"+lessonId,{
            method:"GET",
            headers:{
              "Authorization":bearer
            }
          });
        let tableGrades = await response.json();
        setGrades(tableGrades);
        console.log(tableGrades)
    }

    async function getStudents(groupId){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/v1/public/students/read/all/"+groupId,{
            method:"GET",
            headers:{
              "Authorization":bearer
            }
          });
        let tableStudents = await response.json();
        setStudents(tableStudents);
        console.log(students)
    }

    async function addGrade(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/v1/public/grades/save/one", {
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
            setGrade({
              id:0,
              value:0,
              student:1,
              lesson:1
            });
            setNewId(newId+1);
        }
    }

    async function deleteGrade(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/v1/public/grades/delete/one/"+ data.id, {
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
            setGrade({
                id:0,
                value:0,
                student:1,
                lesson:1
              });
            setNewId(newId+1);
        }
    }

    

    return (
        <div className="container">
            <div className="row">

                <div className="col-3">
                    <div className="card" style={{height:"500px"}}>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><a href={`/`} className="collection-item" style={{color: "black"}}>Home</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="container-fluid card" style={{width:"770px"}}>

                    <nav style={{backgroundColor: "white", marginTop:"10px"}}>
                        <div className="nav-wrapper">
                            <h5 className="brand-logo" style={{color: "black", paddingLeft:"15px"}}>{group.name} students - {course.name}</h5>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><button data-target="modal4" onClick={()=>setLesson3()} className=" btn blue modal-trigger" style={{marginRight:"15px"}}>Add New</button></li>
                            </ul>
                        </div>
                    </nav>

                    <table className="table striped">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Task</th>
                                <th>Grade</th>
                                <th width="20%">Details</th>
                            </tr>
                        </thead>

                        <tbody>
                        {students?.map(student=>(
                            <tr>
                                <td>{users.map(user=>(<span>{user.id==student.studentId?<span>{user.fullName}</span>:""}</span>))}</td>
                            
                                <td>{lesson.name}</td>
                            
                                <td>{grades.map(grade=>(<span>{student.studentId==grade.studentId?<span>{grade.value}</span>:""}</span>))}</td>
                                <td width="33%">
                                    <span>{grades.map(grade=>(<span>{student.studentId==grade.studentId?<button data-target="modal2" className="btn small modal-trigger" onClick={()=>setGrade2(grade)}>Edit</button>:""}</span>))}</span>
                                    <span>{grades.map(grade=>(<span>{student.studentId==grade.studentId?<button data-target="modal3"  className="btn red  modal-trigger" onClick={()=>setGrade2(grade)}>Delete</button>:""}</span>))}</span>
                                    <button data-target="modal1" onClick={()=>setGrade3(student.studentId)} className=" btn blue modal-trigger" style={{marginRight:"15px"}}>Put</button>
                                </td>
                            </tr> 
                        ))}
                        </tbody>
                    </table>


                    <div id="modal1" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
                        <form onSubmit={addGradeSubmit}>
                            <div class="modal-content">
                                <h4>Put Grade for "{lesson.name}"</h4>
                                <br/>
                                <div className="input-field">
                                    <input id="value" type="number" name="value" value={grade.value} onChange={handleGradeDataChange} className="validate"/>
                                    <label className="active" for="name">Grade</label>
                                </div>
                                <input id="name" type="hidden" name="lesson" value={lessonId} onChange={handleGradeDataChange} className="validate" readOnly/>
                                <input id="name" type="hidden" name="student" value={grade.student} onChange={handleGradeDataChange} className="validate" readOnly/>
                                
                            </div>
                            <div class="modal-footer">
                                <button  class="modal-close waves-effect waves-green btn green">Put Grade</button>
                            </div>
                        </form>
                    </div>

                    <div id="modal2" style={{width:"500px",height:"300px"}}  class="modal modal-fixed-footer">
                        <form onSubmit={editGradeSubmit}>
                            <div class="modal-content">
                                <h4>Edit Grade</h4>
                                <br/>
                                <div className="input-field">
                                    <input id="value" type="text" name="value" value={grade.value} onChange={handleGradeDataChange} className="validate"/>
                                    <label className="active" for="name">Grade</label>
                                </div>
                                <input id="name" type="hidden" name="lesson" value={lessonId} onChange={handleGradeDataChange} className="validate" readOnly/>
                                <input id="name" type="hidden" name="student" value={grade.student} onChange={handleGradeDataChange} className="validate" readOnly/>
                                
                            </div>
                            <div class="modal-footer">
                                <button  class="modal-close waves-effect waves-green btn green">Edit</button>
                            </div>
                        </form>
                    </div>

                    <div id="modal3" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
                        <form onSubmit={deleteGradeSubmit}>
                            <div class="modal-content">
                                <h4>Delete Grade</h4>
                                <br/>
                                <h5>Are you sure?</h5>  
                            </div>
                            <div class="modal-footer">
                                <button  class="modal-close waves-effect waves-green btn red">Delete</button>
                            </div>
                        </form>
                    </div>

                    <div id="modal4" style={{width:"500px",height:"400px"}} class="modal modal-fixed-footer">
                        <form onSubmit={addLessonSubmit}>
                            <div class="modal-content">
                                <h4>Add new task for "{group.name} - {course.name}"</h4>
                                <br/>
                                <div className="input-field">
                                    <input id="name" type="text" name="name" value={lesson.name} onChange={handleLessonChange} className="validate"/>
                                    <label className="active" for="name">Task</label>
                                </div>
                                <input id="name" type="hidden" name="course" value={lesson.course} />
                                <input id="name" type="hidden" name="group" value={lesson.group} />
                                <input id="name" type="hidden" name="teacher" value={lesson.teacher} />
                            </div>
                            <div class="modal-footer">
                                <button  class="modal-close waves-effect waves-green btn green">Add New</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CourseDetails;