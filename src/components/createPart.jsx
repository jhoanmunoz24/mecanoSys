import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
export default function CreatePart({ setShowPart }) {
  const [category, setCategory] = useState('');
  const [showCategory, setShowCategory] = useState(false);
  const [estado, setEstado] = useState('');
  const [showEstado, setShowEstado] = useState(false);


  const [formData, setFormData] = [
    
  ]
  const selectCategory = (value) => {
    setCategory(value);
    setShowCategory(false);
  };

  const selectEstado = (value) => {
    setEstado(value);
    setShowEstado(false);
  };

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
              <div
                className='relative bg-white rounded-3xl shadow-lg w-full max-w-3xl mx-4 p-6 
                  max-h-[85vh] overflow-y-auto'
              >
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
                    onClick={() => setShowCategory(!showCategory)}
                    
                    type='button'
                    className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal  flex items-center p-2.5  border-gray-300 rounded border  flex items-center justify-between px-4 hover:bg-gray-300'
                  >
                  {category ? category: "Categoria"}
                    
                    <ChevronDown size={18} />
                  </button>
                  {showCategory && (
                    <div className='cursor-pointer text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal p-5 flex items-center flex-col border-gray-300  bg-gray-100 top-12 absolute justify-center shadow-md gap-6 z-10'>
                      <div
                        className='hover:bg-gray-200 w-full'
                        onClick={() => selectCategory('Mecanico')}
                      >
                        <span className='font-bold text-[15px]'>Mecanico</span>
                        <p>Componentes que transmiten fuerza y movimiento.</p>
                      </div>
                      <div
                        className='hover:bg-gray-200 w-full'
                        onClick={() => selectCategory('Eléctricos')}
                      >
                        <span className='font-bold text-[15px]'>
                          Eléctricos
                        </span>
                        <p>
                          Elementos que gestionan la energía y las señales
                          eléctricas.
                        </p>
                      </div>
                      <div
                        className='hover:bg-gray-200 w-full'
                        onClick={() => selectCategory('Sistema de corte')}
                      >
                        <span className='font-bold text-[15px]'>
                          Sistema de corte
                        </span>
                        <p>
                          Elementos que realizan el trabajo de cortar (ej.
                          cuchillas, cabezal de nylon, hilo, protector).
                        </p>
                      </div>

                      <div
                        className='hover:bg-gray-200 w-full'
                        onClick={() =>
                          selectCategory('Sistema de combustible y filtración')
                        }
                      >
                        <span className='font-bold text-[15px]'>
                          Sistema de combustible y filtración
                        </span>
                        <p>
                          Piezas que gestionan la mezcla de aire y combustible
                          (ej. filtro de aire, filtro de combustible, mangueras,
                          tanque).
                        </p>
                      </div>
                      <div
                        className='hover:bg-gray-200 w-full'
                        onClick={() => selectCategory('Estructura y agarre')}
                      >
                        <span className='font-bold text-[15px]'>
                          Estructura y agarre
                        </span>
                        <p>
                          Partes que dan soporte y permiten el manejo seguro
                          (ej. caña o tubo, manillar, arnés)
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className='relative mb-5 mt-2'>
                  <button
                    onClick={() => setShowEstado(!showEstado)}
                    type='button'
                    className='text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-40 h-10 flex items-center   border-gray-300 rounded border  flex items-center justify-between px-4 hover:bg-gray-300'
                  >
                    {estado ? estado: "Estado"}
                    <ChevronDown size={18} />
                  </button>

                  {showEstado && (
                    <div className='cursor-pointer text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal p-5 flex items-center flex-col border-gray-300  bg-gray-100 top-12 absolute justify-center shadow-md gap-6'>
                      <div
                        className='hover:bg-gray-200 w-full'
                        onClick={() => selectEstado('Disponible')}
                      >
                        <span className='font-bold text-[15px]'>
                          DISPONIBLE
                        </span>
                      </div>

                      <div
                        className='hover:bg-gray-200 w-full'
                        onClick={() => selectEstado('Sin Stock')}
                      >
                        <span className='font-bold text-[15px]'>SIN STOCK</span>
                      </div>
                    </div>
                  )}
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
