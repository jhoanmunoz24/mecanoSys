import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
export default function Register() {
  const [formData, setFormData] = useState({
    correo: '',
    password1: '',
    password2: '',
  });

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {

  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };
  return (
    <>
      <section className=''>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 '>
            <div className='flex justify-center mb-2 mt-9'>
              <h2 className='text-2xl text-black font-medium'>
                Mecano<span className='text-cyan-400'>Sys</span>
              </h2>
            </div>

            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl'>
                Crear una cuenta
              </h1>
              <form
                className='space-y-4 md:space-y-6'
                action='#'
              >
                <div>
                  <label
                    for='email'
                    className='block mb-2 text-sm font-medium text-gray-600 '
                  >
                    Tu correo
                  </label>
                  <input
                    type='email'
                    name='correo'
                    id='email'
                    value={formData.correo}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 block w-full p-2.5 '
                    placeholder='nombre@correo.com'
                    required=''
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    for='password'
                    className='block mb-2 text-sm font-medium text-gray-600 '
                  >
                    Contraseña
                  </label>
                  <input
                    type='password'
                    name='password1'
                    id='password'
                    value={formData.password1}
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 block w-full p-2.5 '
                    required=''
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    for='confirm-password'
                    className='block mb-2 text-sm font-medium text-gray-600 '
                  >
                    Confirma Contraseña
                  </label>
                  <input
                    type='password'
                    value={formData.password2}
                    name='password2'
                    id='confirm-password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500  block w-full p-2.5 '
                    required=''
                    onChange={handleChange}
                  />
                </div>

                <button
                  type='submit'
                  className='w-full text-black bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  disabled={isLoading}
                >
                  Crear una cuenta
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  ¿Ya tienes una cuenta?{' '}
                  <Link
                    to='/login'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Ingresa Aqui
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
