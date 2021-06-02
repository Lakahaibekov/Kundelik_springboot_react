import React, {useState, useEffect, useContext} from 'react';
import AdminNavbar from './AdminNavbar';
import { UserContext } from './Navbar';
import M from 'materialize-css'

function Content(props) {
    const context = useContext(UserContext);
    const [lessons,setLessons] = useState([]);
    const [newId,setNewId] = useState(0);
    const [searchText, setSearchText] = useState("");

    const [users,setUsers] = useState([]);
    const [group,setGroup] = useState([{id:0,name:"",adviser:1}]);
    const [lesson,setLesson] = useState([{id:0,name:"",group:1,teacher:1,course:1}]);

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

        loadLessons(context.id);
    }, [newId]);

    async function loadLessons(teacherId) {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/v1/public/lessons/read/teacher/"+teacherId,{
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
                            <h5 className="brand-logo" style={{color: "black", paddingLeft:"15px"}}>My lessons</h5>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <div className="row">
                            {lessons?.map(lesson=>(<div className="jumbotron jumbotron-fluid" style={{marginTop:"10px",marginLeft:"5px", marginRight:"5px"}}>
                                <div className="container-fluid">
                                    <div className="form-group">
                                        <a className="jumb-a" href={`/course_details/${lesson.id}`}><img src="https://dl.iitu.kz/theme/image.php/classic/core/1602665137/i/course"/> {lesson.id} {lesson.course.name}     -    ({lesson.group.name}) </a>
                                    </div>
                                    <ul className="list-group ">
                                        <li className="list-item-group ml-auto">Lesson:<a href="#"> {lesson.name}</a> <a data-target="modal3" style={{paddingLeft:"400px",textAlign:"left", color:"red"}}  className="modal-trigger" onClick={()=>setLesson(lesson)}>Delete Lesson Task</a></li>
                                    </ul>
                                </div>
                            </div>))}
                                    
                        </div> 
                    </div>

                    <div id="modal3" style={{width:"500px",height:"300px"}} class="modal modal-fixed-footer">
                        <form onSubmit={deleteLessonSubmit}>
                            <div class="modal-content">
                                <h4>Delete Lesson task</h4>
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

export default Content;