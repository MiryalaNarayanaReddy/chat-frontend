import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Don't forget to import axios!
import { API_URL } from '../../helper'; // Adjust the import path if necessary

function Users() {
  const [users, setUsers] = useState([]); // Set an initial empty array

  const getUsers = async () => {
    try {
        const token = localStorage.getItem('token');

      const res = await axios.get(`${API_URL}/user/all`,{
        headers: {
            Authorization: `Bearer ${token}` // Pass the Bearer token
          }
      });
      // Assuming the response returns an array of users
      setUsers(res.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addChat = async (id)=>{

    // add_user_id

    try {
        const token = localStorage.getItem('token');

      const res = await axios.post(`${API_URL}/user/addChat`,
        {
            add_user_id:id
        },
        {
        headers: {
            Authorization: `Bearer ${token}` // Pass the Bearer token
          },
      });

    } catch (error) {
      console.error('Error adding user to chat:', error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='w-24 border-2 border-gray-900 p-4'>
        <div className='text-xl '>
            Add new chat
        </div>
        <div className='w-24 border-1 border-gray-100'>
      <ul className='flex flex-col gap-2'>
        {/* Check if users exist, then map over the list */}
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user._id} onClick={()=>addChat(user._id)} className='hover:border-gray-500 hover:cursor-pointer hover:text-white'>
                {user.username}
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
      </div>
    </div>
  );
}

export default Users;
