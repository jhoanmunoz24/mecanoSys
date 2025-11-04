import React from 'react';
import AdminPanel from './adminPanel';
import { X } from 'lucide-react';

export default function DeleteUser({ setShowDeleteUser, userId, deleteUser }) {

    const handleDeleteUser = () => {
        deleteUser(userId)
        setShowDeleteUser(false)
    }
  return (
    <>
      <div className='fixed bg-black/50 min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0'></div>
      <div className='fixed z-20 inset-0 flex justify-center items-center'>
        <div className='relative bg-white rounded-3xl shadow-lg sm:max-w-xl w-full mx-4 p-10'>
          <button
            className='absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors Z-60'
            onClick={() => setShowDeleteUser(false)}
          >
            <X
              size={30}
              className='text-gray-500 hover:bg-gray-100'
            />
          </button>

          <div className='flex flex-col justify-center '>
            <div className='flex items-center justify-center space-x-5'>
              <div className='flex items-center flex-col justify-center pl-2 font-semibold text-xl self-start text-gray-700'>
                <h2 className='leading-relaxed'>Eliminar Usuario</h2>
                <p className='text-sm text-gray-500 font-normal leading-relaxed'>
                  Estas seguro que quieres eliminar este usuario?, esta opcion no se puede revertir
                </p>
              </div>
            </div>
            <div className='pt-4 flex items-center space-x-4'>
              <button
                className='flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none'
                onClick={() => setShowDeleteUser(false)}
              >
                <svg
                  className='w-6 h-6 mr-3'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>{' '}
                Cancelar
              </button>
              <button className='bg-red-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none' onClick={handleDeleteUser}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
