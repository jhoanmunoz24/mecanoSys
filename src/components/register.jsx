import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correo: '',
    password1: '',
    password2: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [emailUsed, setEmailUsed] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmailUsed(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, [emailUsed]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    }
    if (!formData.password1) {
      newErrors.password1 = 'La contraseña es requerida';
    } else if (formData.password1.length < 8) {
      newErrors.password1 = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!formData.password2) {
      newErrors.password2 = 'Debes confirmar la contraseña';
    }
    if (formData.password1 !== formData.password2) {
      newErrors.matchPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const dataToSend = {
    ...formData,
    nombreCompleto: formData.nombreCompleto.toUpperCase(),
    correo: formData.correo.toLowerCase(),
  };

    setIsRegister(false);
    setEmailUsed(false);
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register/',
        dataToSend
      );

      setIsRegister(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.log(console.error(error));
      console.error('Datos del error:', error.response?.data);
      console.error('Status:', error.response?.status);
      console.error('Headers:', error.response?.headers);
      console.error('Error de correo:', error.response?.data?.correo);

      if (error.response?.data?.correo) {
        setEmailUsed(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
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
                    htmlFor='mombreCompleto'
                    className='block mb-2 text-sm font-medium text-gray-600 '
                  >
                    Nombre Completo
                  </label>
                  <input
                    type='text'
                    name='nombreCompleto'
                    id='nombreCompleto'
                    value={formData.nombreCompleto}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 block w-full p-2.5 '
                    placeholder='Pepito Perez'
                    required
                    onChange={handleChange}
                  />
                  <label
                    htmlFor='email'
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
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
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
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor='confirm-password'
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
                    required
                    onChange={handleChange}
                  />
                </div>

                <button
                  type='submit'
                  className='w-full text-black bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  disabled={isLoading}
                  onClick={handleSubmit}
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
        {isRegister && (
          <div
            className='flex bg-green-100 rounded-lg p-4 text-sm text-green-700'
            role='alert'
          >
            <svg
              className='w-5 h-5 inline mr-3'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              />
            </svg>
            <div>
              <span className='font-medium'>Alerta de exito!</span> Cuenta
              creada correctamente, por favor inicia sesion
            </div>
          </div>
        )}
        {emailUsed && (
          <div
            class='flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700'
            role='alert'
          >
            <svg
              class='w-5 h-5 inline mr-3'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clip-rule='evenodd'
              ></path>
            </svg>
            <div>
              <span class='font-medium'>¡Error!</span> El correo ya esta en uso
            </div>
          </div>
        )}

        {errors.correo && (
          <div
            className='flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700'
            role='alert'
          >
            <svg
              className='w-5 h-5 inline mr-3'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              />
            </svg>
            <div>
              <span className='font-medium'>Campo obligatorio!</span>{' '}
              {errors.correo}
            </div>
          </div>
        )}

        {errors.matchPassword && (
          <div
            className='flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700'
            role='alert'
          >
            <svg
              className='w-5 h-5 inline mr-3'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              />
            </svg>
            <div>
              <span className='font-medium'>¡Error!</span>{' '}
              {errors.matchPassword}
            </div>
          </div>
        )}

        {errors.password1 && (
          <div
            className='flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700'
            role='alert'
          >
            <svg
              className='w-5 h-5 inline mr-3'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              />
            </svg>
            <div>
              <span className='font-medium'>Campo obligatorio!</span>{' '}
              {errors.password1}
            </div>
          </div>
        )}
        {errors.password2 && (
          <div
            className='flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700'
            role='alert'
          >
            <svg
              className='w-5 h-5 inline mr-3'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              />
            </svg>
            <div>
              <span className='font-medium'>Campo obligatorio!</span>{' '}
              {errors.password2}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
