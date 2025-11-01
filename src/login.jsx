import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
export default function LoginForm() {

  return (
    
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center mb-10">
            <h2 className="text-2xl text-black font-medium" >Mecano<span className='text-cyan-400'>Sys</span></h2>
            
          </div>

          <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
            Iniciar sesión
          </h1>

          <form>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-600"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-gray-600"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              <a
                
                className="block text-right text-xs text-cyan-600 mt-2"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Link
            to={'/adminPanel'}
              
              className=" w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6  hover:from-cyan-300 hover:to-cyan-600"
            >
              Acceso
            </Link>
          </form>

          <div className="text-center">
            <p className="text-sm">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-cyan-600" >
                Regístrate ahora
              </Link>
            </p>
          </div>

          <p className="text-xs text-gray-600 text-center mt-10">
            &copy; 2025 MecanoSys
          </p>
        </div>
      </div>
      
    </>
  )
}
