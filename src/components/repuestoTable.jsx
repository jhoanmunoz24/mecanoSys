import React from 'react';
import { Plus, Pencil, Trash } from 'lucide-react';



export default function RepuestoTable({ setShowPart }) {
  const handleShowPart = () => {
    setShowPart(true);
  };
  return (
    <>
      <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
        <div>
          <h2 className='text-2xl font-semibold leading-tight mb-10'>
            Repuestos
          </h2>
        </div>
        <div className='flex justify-start'>
          <button
            className='mb-10 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 hover:from-cyan-300 hover:to-cyan-600'
            
            onClick={handleShowPart}
          >
            <Plus size={18} />
            Crear repuesto
          </button>
        </div>
        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
          <table className='min-w-full leading-normal'>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Nombre
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Descripcion
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Categoria
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Marca
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Modelo
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Stock
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Precio Unitario
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Precio Venta
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Fecha Ingreso
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <div className='flex items-center'>
                    <div className='ml-3'>
                      <p className='text-gray-900 whitespace-no-wrap'></p>
                    </div>
                  </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'></p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'></p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'></p>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'></p>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                      aria-hidden=''
                      className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    />
                    <span className='relative'></span>
                  </span>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                  <button className='text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer'>
                    <Pencil size={16} />
                  </button>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                  <button className='text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer'>
                    <Trash size={16} />
                  </button>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                  <button className='text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer'>
                    <Trash size={16} />
                  </button>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                  <button className='text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer'>
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
