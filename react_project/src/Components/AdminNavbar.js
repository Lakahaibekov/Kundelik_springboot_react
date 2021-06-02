import React from 'react';

function AdminNavbar(props) {
    return (
        <div className="card">
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><a href={`/rolesAdmin`} className="collection-item" style={{color: "black"}}>Roles</a></li>
                <li className="list-group-item"><a href={`/usersAdmin`} className="collection-item" style={{color: "black"}}>Users</a></li>
                <li className="list-group-item"><a href={`/coursesAdmin`} className="collection-item" style={{color: "black"}}>Courses</a></li>
                <li className="list-group-item"><a href={`/groupsAdmin`} className="collection-item" style={{color: "black"}}>Groups</a></li>
                <li className="list-group-item"><a href={`/studentsAdmin`} className="collection-item" style={{color: "black"}}>Students</a></li>
                <li className="list-group-item"><a href={`/lessonsAdmin`} className="collection-item" style={{color: "black"}}>Lessons</a></li>
                <li className="list-group-item"><a href={`/gradesAdmin`} className="collection-item" style={{color: "black"}}>Grades</a></li>
            </ul>
            
        </div>
    );
}

export default AdminNavbar;