import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './Navbar';

function Grades(props) {
    const context = useContext(UserContext);

    const [grades,setGrades] = useState([]);
    const [group,setGroup] = useState([{id:0,name:"",adviser:1}]);
    const [lessons,setLessons] = useState([]);
    const [newId, setNewId] = useState(0);
    const [courses,setCourses] = useState([]);
    const [searchText, setSearchText] = useState("");
    
    useEffect (()=>{
        context.profile();
        loadGrades(context.id);
        loadCourses(searchText);
        getGroup(props.groupId);
        loadLessons(props.groupId);
    },[newId]);

    async function loadGrades(studentId){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/grades/read/all/student/"+studentId,{
            method:"GET",
            headers:{
              "Authorization":bearer
            }
          });
        let tableGrades = await response.json();
        setGrades(tableGrades);
        console.log(tableGrades)
    }

    async function getGroup(groupId) {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/groups/read/one/"+groupId,{
            method:"GET",
            headers:{
              "Authorization":bearer
            }
          });
        if(response.status == 200){
            let data = await response.json();
            setGroup(data);
            console.log(data)
        }
    }

    async function loadLessons(groupId){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/lessons/read/group/"+groupId,{
            method:"GET",
            headers:{
              "Authorization":bearer
            }
          });
        let tableLessons = await response.json();
        setLessons(tableLessons);
        console.log(tableLessons)
    }

    async function loadCourses(){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/courses/read/all",{
            method:"GET",
            headers:{
              "Authorization":bearer
            }
          });
        let tableCourses = await response.json();
        setCourses(tableCourses);
        console.log(tableCourses)
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
                            <h5 className="brand-logo" style={{color: "black", paddingLeft:"15px"}}>{group.name} Lessons</h5>
                        </div>
                    </nav>

                    <table className="table striped">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Task</th>
                                <th>Grade</th>
                            </tr>
                        </thead>

                        <tbody>
                            {lessons?.map(lesson=>(
                                <tr>
                                    <td>{courses.map(course=>(<span>{course.id==lesson.courseId?<span>{course.name}</span>:""}</span>))}</td>
                                    <td>{lesson.name}</td>
                                    <td>{grades.map(grade=>(<span>{lesson.id==grade.lesson.id?<span>{grade.value}</span>:""}</span>))}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default Grades;