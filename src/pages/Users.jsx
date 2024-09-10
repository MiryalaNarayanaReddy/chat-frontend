import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { API_URL } from '../../helper'; // Adjust the import path if necessary

function Users() {
  const [users, setUsers] = useState([]); // For storing all users
  const [chats, setChats] = useState([]); // For storing the user's chats

  // Function to fetch all users
  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(`${API_URL}/user/all`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass the Bearer token
        }
      });
      setUsers(res.data.users); // Assuming the response contains 'users'
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to add a new chat
  const addChat = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await axios.post(
        `${API_URL}/user/addChat`,
        { add_user_id: id }, // Payload with user ID
        {
          headers: {
            Authorization: `Bearer ${token}` // Bearer token for authorization
          }
        }
      );

      // You might want to refresh the chats after adding a new one
      getChats();
    } catch (error) {
      console.error('Error adding user to chat:', error);
    }
  };

  // Function to fetch authenticated user's chats
  const getChats = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(`${API_URL}/chat/my/all`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass the Bearer token
        }
      });
      setChats(res.data.chats); // Assuming the response contains 'chats'
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  // Fetch users and chats when the component mounts
  useEffect(() => {
    getUsers();
    getChats(); // Fetch chats when the component is loaded
  }, []);

  return (
    <div className="p-4">
      <div className="text-xl mb-4">
        Add new chat
      </div>

      {/* Users List */}
      <div className="mb-6">
        <div className="w-24 border-2 border-gray-900 p-2">
          <ul className="flex flex-col gap-2">
            {/* Check if users exist, then map over the list */}
            {users && users.length > 0 ? (
              users.map((user) => (
                <li
                  key={user._id}
                  onClick={() => addChat(user._id)}
                  className="hover:border-gray-500 hover:cursor-pointer hover:text-white p-1 border"
                >
                  {user.username}
                </li>
              ))
            ) : (
              <li>No users found</li>
            )}
          </ul>
        </div>
      </div>

      {/* Authenticated User's Chat List */}
      <div>
        <div className="text-xl mb-4">
          My Chats
        </div>
        <div className="w-48 border-2 border-gray-900 p-2">
          <ul className="flex flex-col gap-2">
            {/* Check if chats exist, then map over the list */}
            {chats && chats.length > 0 ? (
              chats.map((chat) => (
                <li
                  key={chat.chat_id}
                  className="p-1 border hover:border-gray-500 hover:cursor-pointer hover:text-white"
                  onClick={()=> window.location.href=`http://localhost:5173/my/chat/${chat.chat_id}`}
                >
                  {chat.user2.username}

                </li>
              ))
            ) : (
              <li>No chats found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Users;
