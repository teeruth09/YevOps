import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';

function ClientCard(props) {
  const username = props.username;
  const userId = props.id;
  const imageProfile = props.imageProfile;

  return (
    <Link to={`/admin/client/${userId}`}>
      <div className='flex justify-start items-center relative min-w-[200px] h-[60px] shadow-md px-2 py-2 rounded-lg bg-gray-50'>
        <img className='w-[40px] h-100 rounded-full' src={imageProfile} alt=""/>
        <div className='ml-2'>
          <p className='font-bold text-base'>{username}</p>
          <p className='text-sm text-gray-400'>@{userId}</p>
        </div>
        <div className='absolute right-3'>
          <img className='w-[24px] h-[24px]' src="https://cdn-icons-png.flaticon.com/512/32/32213.png" alt="" />
        </div>
      </div>
    </Link>
  );
}

function ViewClients() {
  const client1 = {"id": 1, "imageProfile": "https://i.pinimg.com/736x/19/ff/ee/19ffee4239d4ed94b7715d44bdb86cf6.jpg", "username": "marchkung123", "email": "martkung123@gmail.com"}

  const [clients, setClients] = useState([
    client1, client1, client1, client1, client1, client1, client1, client1
  ]);

  return (
    <div>
        <Navbar />

        <div className='mx-20 my-10'>
          <h1 className='font-bold text-2xl mb-10'>Clients</h1>

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center'>
            {
              clients.map((client) => (
                <ClientCard username={client.username} key={client.id} id={client.id} imageProfile={client.imageProfile} />
              ) )
            }
            
          </div>
        </div>
      
    </div>
  )
}

export default ViewClients
