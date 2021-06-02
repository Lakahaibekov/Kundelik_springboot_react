import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    Redirect,
    useParams
  } from "react-router-dom";
import Content from './Content';
import CourseDetails from './CourseDetails';
import AdminCourses from './AdminCourses';
import CreateAccount from './CreateAccount';
import GradeDetails from './GradeDetails';
import Grades from './Grades';
import SignIn from './SignIn';
import UpdateProfile from './UpdateProfile';
import AdminRole from './AdminRole';
import AdminGroup from './AdminGroup';
import AdminStudent from './AdminStudent';
import AdminLesson from './AdminLesson';
import AdminUser from './AdminUser';
import AdminUserDetails from './AdminUserDetails';

export const UserContext = React.createContext();
function Navbar(props) {

    const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

    const [isOnline, setIsOnline] = useState(false);
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState(0);
    const [groupId, setGroupId] = useState(0);
    const [roles,setRoles] = useState([{}]);


    const handleFullNameChange = event =>{
        setFullName(event.target.value);
    }

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handleIsOnline = event =>{
        setIsOnline(event.target.value);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }

    const handleRememberChange = event =>{
        setRemember(!remember);
    }

    function logout(){
        if(!remember){
          setId(0);
          setEmail("");
          setPassword("");
          setFullName("");
          setRoles([{}]);
          removeCookieJWT("jwt");
        }
        setIsOnline(false);
    }

    async function profile(){
        if(cookieJWT['jwt']!=null){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":bearer,
          },
        });
        if(response.status===200){
            let userData = await response.json();
            console.log(userData);
            setId(userData.id);
            setEmail(userData.email);
            setFullName(userData.fullName);
            setIsOnline(true);
            setRoles(userData.roles);
            if(userData.roles[0].role=="ROLE_USER"){ getGroupId(userData.id)}
      
      
        }else{
            console.log("404 ITEM NOT FOUND");
        }
      }
    }


    async function getGroupId(studentId) {
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/v1/public/student/group/read/all/"+studentId,{
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
            setGroupId(Data.groupId);
            console.log(Data.groupId)
        }
    }



    return (
        <Router>

            <UserContext.Provider value={{
                remember,
                isOnline, 
                id,
                email,
                password,
                fullName,
                handleFullNameChange:handleFullNameChange,
                handleEmailChange:handleEmailChange,
                handlePasswordChange:handlePasswordChange,
                setIsOnline:setIsOnline,
                handleRememberChange:handleRememberChange,
                setEmail:setEmail,
                setPassword:setPassword,
                setFullName:setFullName,
                profile:profile,
                logout:logout,
                cookieJWT,
                setCookieJWT,
                removeCookieJWT
                }
              }>



            <div>
                <nav className =" navbar navbar-expand-lg " style={{paddingLeft:"257px", paddingRight:"257px", backgroundColor: "#172383"}}>
                    <Link className="navbar-brand" to ='/'>Kundelik.kz</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            {roles[0].role=="ROLE_ADMIN"?<li className="nav-item"><Link className="nav-link" to="/coursesAdmin">Admin</Link></li>:""}
                            {roles[0].role=="ROLE_MODERATOR"?<li className="nav-item"><Link className="nav-link" to="/">My Lessons</Link></li>:""}
                            {roles[0].role=="ROLE_USER"?<li className="nav-item"><Link className="nav-link" to="/student">My Lessons</Link></li>:""}
                            {isOnline?"":<li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
                            {isOnline?"":<li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>}
                            {isOnline?<li className="nav-item"><Link className="nav-link" to="/profile">{fullName}</Link></li>:""}
                            {isOnline?<li className="nav-item"><Link className="nav-link" to="/logout" onClick={logout} >Logout</Link></li>:""}
                        </ul>
                    </div>
                </nav>


                <Switch> 
                    <Route path = {`/user_details/:userId`}>
                        <AdminUserDetails/>
                    </Route>
                    <Route path = "/usersAdmin">
                        <AdminUser/>
                    </Route>
                    <Route path = "/lessonsAdmin">
                        <AdminLesson/>
                    </Route>
                    <Route path = "/studentsAdmin">
                        <AdminStudent/>
                    </Route>
                    <Route path = "/student">
                        <Grades groupId={groupId}/>
                    </Route>
                    
                    <Route path = "/rolesAdmin">
                        <AdminRole/>
                    </Route>
                    <Route path = "/groupsAdmin">
                        <AdminGroup/>
                    </Route>
                    <Route path = "/coursesAdmin">
                        <AdminCourses/>
                    </Route>
                    <Route path = "/register">
                        <CreateAccount/>
                    </Route>
                    <Route path = '/login'>
                        {isOnline?<Redirect to="/profile"/>:
                        <SignIn/>}
                    </Route>
                    <Route path = '/profile'>
                        <UpdateProfile/>
                    </Route>
                    
                    <Route path = '/grade_details'>
                        <GradeDetails/>
                    </Route>
                    <Route path = {`/course_details/:lessonId`}>
                        <CourseDetails/>
                    </Route>
                    <Route path = '/grades'>
                        <Grades/>
                    </Route>             
                    <Route path = '/'>
                        {isOnline?<Content/>:
                        <Redirect to="/login"/>}
                    </Route>
                    
                </Switch>
                
            </div>
            </UserContext.Provider>
        </Router>
    );
}

export default Navbar;