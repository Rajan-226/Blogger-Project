import React from 'react'
import useFetch from './useFetch';
import { useState } from "react";

const Users = () => {

    const [userData, setUserdata] = useState(null);
    const [ok, setOk] = useState(true);
    let { data: blog, isPending, error } = useFetch('http://localhost:8000/blogs');
    let { data: users, isPending2, error2 } = useFetch('http://localhost:8000/users');

    const deleteBlog = (blogId) => {
        fetch('http://localhost:8000/blogs/' + blogId, {
            method: 'DELETE'
        }).then(() => {
            console.log("blog deleted");
        });
    }

    function setData() {
        setUserdata(() => {
            return users.map((user) => {
                return (
                    <div>
                        <h1 className="userName">{user.name}</h1>
                        <p className="userDescription">{user.description}</p>
                        <button className="userDelete" onClick={() => handleClick(user.id, user.name)}>Delete User</button>
                    </div>
                )
            });
        }
        )
    }


    const handleClick = (userId, userName) => {
        fetch('http://localhost:8000/users/' + userId, {
            method: 'DELETE'
        }).then(() => {
            // console.log(isPending);
            // console.log(blog);
            users = users.filter((user) => {
                if (user.id === userId) {
                    console.log(user.name);
                    for (let i = 0; blog && i < blog.length; i++) {
                        if (blog[i].author === userName) {
                            deleteBlog(blog[i].id, userName);
                        }
                    }
                    return false;
                }
                return true;
            });

            if (users && users.length)
                setData();
            else
                setUserdata(() => { return <h1 className="userName">No Users</h1> })
        });
    }

    if (users && users.length && ok === true) {
        setData();
        setOk(false);
    } else if (users && ok === true) {
        setUserdata(() => { return <h1 className="userName">No Users</h1> })
        setOk(false);
    }
    return (
        <div>
            {/* {console.log(blog)} */}
            {console.log(isPending)}
            {userData}
        </div>
    )
}

export default Users
