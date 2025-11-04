import React from 'react';
import AdminPanel from './adminPanel';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function EditUser({ setShowEditPop,editingUser, setEditingUser}) {

  const [formData, setFormData] = useState({
    nombre: editingUser?.nombreCompleto || '',
    correo: editingUser?.correo || '',
    rol: editingUser?.rol || 'Administrador',
    password: ''
  });
  return (
    <>
      <div className='fixed bg-black/50 min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0'></div>
      <div className='fixed z-20 inset-0 flex justify-center items-center'>
        <div className='relative bg-white rounded-3xl shadow-lg sm:max-w-xl w-full mx-4 p-10'>
          <button
            className='absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors Z-60'
            onClick={() => setShowEditPop(false)}
          >
            <X
              size={30}
              className='text-gray-500 hover:bg-gray-100'
            />
          </button>

          <div className='flex flex-col justify-center '>
            <div className='flex items-center justify-center space-x-5'>
              <div className='flex items-center flex-col justify-center pl-2 font-semibold text-xl self-start text-gray-700'>
                <h2 className='leading-relaxed'>Editar usuario</h2>
                <p className='text-sm text-gray-500 font-normal leading-relaxed'>
                  Modifica los datos del usuario
                </p>
              </div>
            </div>
            <div className='divide-y divide-gray-200'>
              <div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
                <div className='flex flex-col'>
                  <label className='leading-loose'>Nombre</label>
                  <input
                    type='text'
                    className='px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                    placeholder='Pepito Perez'
                    defaultValue={formData.nombre}
                  />

                </div>
                <div className='flex flex-col'>
                  <label className='leading-loose'>Correo</label>
                  <input
                    type='text'
                    className='px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                    placeholder='ejemplo@correo.com'
                    defaultValue={formData.correo}
                  />
                </div>

                <div className='flex flex-col'>
                  <label className='leading-loose'>Contraseña</label>
                  <input
                    type='password'
                    className='px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                    placeholder='********'
                   
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='leading-loose'>Rol</label>
                  <select
                    className='group relative border border-gray-300 bg-white text-gray-500 text-lg px-3 py-1 rounded'
                    placeholder='Escoger rol'
                  >
                    Escoger Rol
                    <option>Administrador</option>
                    <option>Tecnico</option>
                  </select>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='flex flex-col'>
                    <label className='leading-loose'>Fecha de creación</label>
                    <div className='relative focus-within:text-gray-600 text-gray-400'>
                      <input
                        type='text'
                        className='pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600'
                        placeholder='11/01/2025'
                        disabled
                      />
                      <div className='absolute left-3 top-2'>
                        <svg
                          className='w-6 h-6'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='pt-4 flex items-center space-x-4'>
                <button
                  className='flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none'
                  onClick={() => setShowEditPop(false)}
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
                <button className='bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none'>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
