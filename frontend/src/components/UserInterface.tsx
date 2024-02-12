import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent';

interface User{
    id: number;
    name: string;
    email: string;
}

interface UserInterfaceProps{
    backendName: string;
}

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({name: '', email: ''});
    const[updateUser, setUpdateUser] = useState({id: '', name: '', email: ''});

    const backgroundColors: { [key: string]: string } = {
        flask: 'bg-blue-400',
    };

    const buttonColors: { [key: string]: string } = {
        flask: 'bg-blue-700 hover:bg-blue-600',
    };

    const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-gray-100';
    const btnColor = buttonColors[backendName as keyof typeof buttonColors] || 'bg-gray-700 hover:bg-gray-600';

    // fetch users
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/${backendName}/users`);
            setUsers(response.data.reverse());  
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
    }, [backendName, apiUrl]);

    // create user
    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/${backendName}/users`, newUser);
            setUsers([response.data, ...users]);
            setNewUser({name: '', email: ''});
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // update user
    const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`${apiUrl}/api/${backendName}/users/${updateUser.id}`, {name: updateUser.name, email: updateUser.email});
            setUpdateUser({id: '', name: '', email: ''});
            setUsers(
                users.map((user) => {
                    if (user.id === parseInt(updateUser.id)) {
                        return {...user, name: updateUser.name, email: updateUser.email};
                    }
                    return user;
                
                })
            );
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // delete user
    const deleteUser = async (userID: number) => {
        try {
            await axios.delete(`${apiUrl}/api/${backendName}/users/${userID}`);
            setUsers(users.filter((user) => user.id !== userID));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return(
        <div className={`user-interface ${bgColor} ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}>
            <img src={`/${backendName}logo.svg`} alt={`${backendName} logo`} className='w-12 h-12 mx-auto mb-4' />
            <h2 className='text-xl font-bold text-center mb-4'>{backendName.charAt(0).toUpperCase() + backendName.slice(1)} Backend</h2>

            {/* create user with form*/}
            <form onSubmit={createUser} className='mb-6 p-4 bg-blue-100 rounded shadow'>
                <input
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className='mb-2 w-full p-2 border border-gray-300 rounded'
                />
                <input
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className='mb-2 w-full p-2 border border-gray-300 rounded'
                />
                <button type='submit' className={`w-full p-2 text-white font-bold rounded ${btnColor}`}>Add User</button>
            </form>

            {/* update user with form*/}
            <form onSubmit={handleUpdateUser} className='mb-6 p-4 bg-blue-100 rounded shadow'>
                <input
                    placeholder="ID"
                    value={updateUser.id}
                    onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
                    className='mb-2 w-full p-2 border border-gray-300 rounded'
                />

                <input
                    placeholder="Name"
                    value={updateUser.name}
                    onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
                    className='mb-2 w-full p-2 border border-gray-300 rounded'
                />
                <input
                    placeholder="Email"
                    value={updateUser.email}
                    onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                    className='mb-2 w-full p-2 border border-gray-300 rounded'
                />
                <button type='submit' className={`w-full p-2 text-white font-bold rounded ${btnColor}`}>Update User</button>
            </form>


            {/* display arbitrary number of users*/}
            <div className='space-y-4'>
            {users.map((user) => (
                <div key={user.id} className='flex items-center justify-between bg-white p-4'>
                    <CardComponent card={user} />
                    <button onClick={() => deleteUser(user.id)} className='bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded'>Delete User</button>
                </div> 
            ))}
        </div>
    </div>
    );
}


export default UserInterface;