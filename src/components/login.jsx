import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function LoginForm({setIsLoggedIn}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 Formulario enviado con:', formData);
    if (isLoading) {
      return;
    }

    /* if (!validateForm()) {
      return;
    } */

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login/',
        formData
      );
      localStorage.setItem('access_token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);

      response.data;
      console.log('Logueado');
      navigate('/adminPanel');
      
      setIsLoggedIn(true)
      /* setTimeout(() => {
        navigate('/login');
      }, 2000); */
    } catch (error) {
      console.error('❌ Error de login:', error.response?.data);
      if (error.response?.data) {
        setErrors(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-md w-full p-6 bg-white rounded-lg shadow-lg'>
          <div className='flex justify-center mb-10'>
            <h2 className='text-2xl text-black font-medium'>
              Mecano<span className='text-cyan-400'>Sys</span>
            </h2>
          </div>

          <h1 className='text-2xl font-semibold text-center text-gray-500 mt-8 mb-6'>
            Iniciar sesión
          </h1>

          <form>
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm text-gray-600'
              >
                Correo electrónico
              </label>
              <input
                type='email'
                id='email'
                name='correo'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
                required
                value={formData.correo}
                onChange={handleChange}
              />
            </div>

            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm text-gray-600'
              >
                Contraseña
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
                required
                value={formData.password}
                onChange={handleChange}
              />
              <a className='block text-right text-xs text-cyan-600 mt-2'>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type='submit'
              onClick={handleSubmit}
              disabled={isLoading}
              className=' w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6  hover:from-cyan-300 hover:to-cyan-600'
            >
              Acceso
            </button>
          </form>

          <div className='text-center'>
            <p className='text-sm'>
              ¿No tienes una cuenta?{' '}
              <Link
                to='/register'
                className='text-cyan-600'
              >
                Regístrate ahora
              </Link>
            </p>
          </div>

          <p className='text-xs text-gray-600 text-center mt-10'>
            &copy; 2025 MecanoSys
          </p>
        </div>
      </div>
    </>
  );
}
