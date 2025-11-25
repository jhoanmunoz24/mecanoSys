import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
export default function CreatePart({ setShowPart }) {
  const [category, setCategory] = useState('');

  return (
    <>
      <>
        {/* component */}
        {/* Code block starts */}
        <dh-component>
          <div
            className='fixed py-12 bg-black/50 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0'
            id='modal'
          >
            <div
              role='alert'
              className='container mx-auto w-11/12 md:w-2/3 max-w-lg'
            >
              <div className='relative bg-white rounded-3xl shadow-lg w-full max-w-3xl mx-4 p-6 
                  max-h-[85vh] overflow-y-auto'>
                <div className='w-full flex justify-start text-gray-600 mb-3'></div>
                <h1 className='text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4'>
                  Crear un nuevo repuesto
                </h1>
                <label
                  htmlFor='name'
                  className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
                >
                  Nombre
                </label>
                <input
                  id='name'
                  className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                  placeholder='Bujia'
                />
                <label
                  htmlFor='email2'
                  className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
                >
                  Descripcion
                </label>
                <div className='relative mb-5 mt-2'>
                  <input
                    id='email2'
                    className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center px-2 text-sm border-gray-300 rounded border'
                    placeholder='...'
                  />
                </div>

                <div className='relative mb-5 mt-2'>
                  <button
                    type='button'
                    className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-40 h-10 flex items-center   border-gray-300 rounded border  flex items-center justify-between px-4 hover:bg-gray-300'
                  >
                    Categoria
                    <ChevronDown size={18} />
                  </button>
                  <div className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-40 h-10 flex items-center border-gray-300 '>
                    asdasd
                  </div>
                </div>

                <label
                  htmlFor='name'
                  className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
                >
                  Marca
                </label>
                <input
                  id='name'
                  className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                  placeholder='Bujia'
                />
                <label
                  htmlFor='name'
                  className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
                >
                  Modelo
                </label>
                <input
                  id='name'
                  className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                  placeholder='Bujia'
                />
                <label
                  htmlFor='name'
                  className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
                >
                  Stock
                </label>
                <input
                  id='name'
                  className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                  placeholder='Bujia'
                />
                <label
                  htmlFor='name'
                  className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
                >
                  Precio Unitario
                </label>
                <input
                  id='name'
                  className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                  placeholder='Bujia'
                />
                <label
                  htmlFor='name'
                  className='text-gray-800 text-sm font-bold leading-tight tracking-normal'
                >
                  Precio Venta
                </label>
                <input
                  id='name'
                  className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                  placeholder='Bujia'
                />

                <div className='relative mb-5 mt-2'>
                  <button
                    type='button'
                    className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-40 h-10 flex items-center   border-gray-300 rounded border  flex items-center justify-between px-4 hover:bg-gray-300'
                  >
                    Estado
                    <ChevronDown size={18} />
                  </button>
                  <div className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-40 h-10 flex items-center border-gray-300 '>
                    asdasd
                  </div>
                </div>

                
                
                <div className='flex items-center justify-start w-full'>
                  <button className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm'>
                    Guardar Repuesto
                  </button>
                  <button
                    className='focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm'
                    onClick={() => setShowPart(false)}
                  >
                    Cancelar
                  </button>
                </div>
                <button
                  className='cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600'
                  onClick={() => setShowPart(false)}
                  aria-label='close modal'
                  role='button'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-x'
                    width={20}
                    height={20}
                    viewBox='0 0 24 24'
                    strokeWidth='2.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path
                      stroke='none'
                      d='M0 0h24v24H0z'
                    />
                    <line
                      x1={18}
                      y1={6}
                      x2={6}
                      y2={18}
                    />
                    <line
                      x1={6}
                      y1={6}
                      x2={18}
                      y2={18}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            className='w-full flex justify-center py-12'
            id='button'
          >
            <button
              className='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm'
              onclick='modalHandler(true)'
            >
              Open Modal
            </button>
          </div>
        </dh-component>
        {/* Code block ends */}
      </>
    </>
  );
}
