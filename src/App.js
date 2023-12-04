import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {

  const [userData, setUserData] = useState([]);

  const [inputData , setInputData] = useState('');


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');


        const userAllDatas = response.data.map(({ name, username, email }) => ({
           name , username , email
        }));

        setUserData(userAllDatas)
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    }

    fetchData();
  }, [])

  return (
    <div className='flex flex-col justify-center items-center mt-24 '>
      <input
        type="text"
        placeholder='Search...'
        className='border-2 border-black rounded-lg mb-8 w-72 h-8 text-black'
        onChange={e => setInputData(e.target.value)}
      />
      <div>
        <h2 className='font-bold text-3xl mb-8'>User Data:</h2>
        <table className='table-auto'>
          <thead>
            <tr>
              <th className='border border-black px-4 py-2'>Name</th>
              <th className='border border-black px-4 py-2'>Username</th>
              <th className='border border-black px-4 py-2'>Email</th>
            </tr>
          </thead>
          <tbody>
            {userData.filter((user)=>user.name.toLowerCase().includes(inputData) || user.username.toLowerCase().includes(inputData) || user.email.toLowerCase().includes(inputData)).map((user, index) => (
              <tr key={index}>
                <td className='border border-black px-4 py-2'>{user.name}</td>
                <td className='border border-black px-4 py-2'>{user.username}</td>
                <td className='border border-black px-4 py-2'>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default App