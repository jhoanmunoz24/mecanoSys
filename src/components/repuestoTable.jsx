import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash } from 'lucide-react';
import axios from 'axios';
import DeleteRepuesto from './deleteRepuesto';
import EditRepuesto from './editRepuesto';
export default function RepuestoTable({ setShowPart }) {
  const [repuestos, setRepuestos] = useState([]);
  const [popUpDelete, setPopUpDelete] = useState(false);
  const [repuestoID, setRepuestoID] = useState(null)
  const [editRepuesto, setEditRepuesto] = useState(null)
  const [editPopUp, setEditPopUp] = useState(false)
  const handleShowPart = () => {
    setShowPart(true);
  };


  const getRepuesto = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/repuestos/');
      console.log(response.data);
      setRepuestos(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getRepuesto();
  }, []);
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
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Editar
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody>
              {repuestos.map((r) => (
                <tr key={r.id}>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='flex items-center'>
                      <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          {r.nombre}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {r.descripcion}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {r.categoria}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {r.marca}
                    </p>
                  </td>

                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {r.modelo}
                    </p>
                  </td>

                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {r.stock}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {r.precioUnitario}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {r.precioVenta}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {new Date(r.fechaIngreso).toLocaleString()}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {r.estado}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                    <button
                      className='text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer'
                      onClick={() => {
                        setEditRepuesto(r)
                        setEditPopUp(true)
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                    <button
                      className='text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer'
                      onClick={() => {
                        setRepuestoID(r.id)
                        setPopUpDelete(true)

                      }}
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editPopUp && (
        <EditRepuesto 
          setEditPopUp = {setEditPopUp}
          editRepuesto = {editRepuesto}
        />
      )}


      {popUpDelete && (
        <DeleteRepuesto 
          setPopUpDelete = {setPopUpDelete}
          repuestoID = {repuestoID}
          getRepuesto = {getRepuesto}
        />
      )}
    </>
  );
}
