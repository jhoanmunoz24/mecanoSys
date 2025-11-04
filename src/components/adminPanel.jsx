import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RolTable from './RolTable';
import { Plus, Pencil, Trash } from 'lucide-react';
import CreateUser from './createUser';
import axios from 'axios';
import EditUser from './editUser';
import DeleteUser from './deleteUser';
import App from '../App';

export default function AdminPanel({
  activeTab,
  setActiveTab,
  setIsLoggedIn,
  user,
}) {
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showEditPop, setShowEditPop] = useState(false);
  const [users, setUsers] = useState([]);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:8000/api/usuarios/', {
      headers: { Authorization: `Bearer ${token}` }
    });
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.delete(`http://127.0.0.1:8000/api/usuarios/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
      
    });
      console.log("Usuario eliminado")  
      console.log(response.data);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    console.log('Cerrando sesion');
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const accessToken = localStorage.getItem('access_token');
      if (refreshToken) {
        await axios.post(
          'http://127.0.0.1:8000/api/logout/',
          { refresh: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log('Token agregado a blacklist');
      }
    } catch (error) {
      console.error('Error al hacer logout:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsLoggedIn(false);
      navigate('/login');
    }
  };
  const handleShowPopUp = () => {
    setShowPopUp(true);
  };
  const handleShowEditPop = () => {
    setShowEditPop(true);
  };

  const handleShowDeletePop = () => {
    setShowDeleteUser(true);
  };
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='flex gap-1'>
            <button
              className='text-sm  bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l'
              onClick={() => setActiveTab('Usuarios')}
            >
              Usuarios
            </button>
            <button
              className='text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r'
              onClick={() => setActiveTab('Roles')}
            >
              Roles
            </button>
          </div>
          <div>
            <button
              className='text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r'
              onClick={handleLogout}
            >
              Cerrar Sesion
            </button>
          </div>

          {activeTab === 'Usuarios' ? (
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div>
                <h2 className='text-2xl font-semibold leading-tight mb-10'>
                  Usuarios
                </h2>
              </div>
              <div className='flex justify-start'>
                <button
                  className='mb-10 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 hover:from-cyan-300 hover:to-cyan-600'
                  onClick={() => {
                    handleShowPopUp(true);
                  }}
                >
                  <Plus size={18} />
                  Agregar Usuario
                </button>
              </div>
              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Nombre Completo
                      </th>
                      <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        User
                      </th>
                      <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Rol
                      </th>
                      <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Fecha de creación
                      </th>
                      <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Ultima Conexion
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
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                          <div className='flex items-center'>
                            <div className='ml-3'>
                              <p className='text-gray-900 whitespace-no-wrap'>
                                {user.nombreCompleto}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                          <p className='text-gray-900 whitespace-no-wrap'>
                            {user.correo}
                          </p>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                          <p className='text-gray-900 whitespace-no-wrap'>
                            {(user.roles || []).map(r => r.nombre).join(', ') || '—'}
                          </p>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                          <p className='text-gray-900 whitespace-no-wrap'>
                            {new Date(user.fechaCreacion).toLocaleString()}
                          </p>
                        </td>

                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                          <p className='text-gray-900 whitespace-no-wrap'>
                            {new Date(user.ultimoAcesso).toLocaleString()}
                          </p>
                        </td>

                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                          <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                            <span
                              aria-hidden=''
                              className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                            />
                            <span className='relative'>{user.estado}</span>
                          </span>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                          <button
                            className='text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer'
                            onClick={() => {
                              handleShowEditPop(true);
                              setEditingUser(user);
                            }}
                          >
                            <Pencil size={16} />
                          </button>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                          <button
                            className='text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer'
                            onClick={() => {
                              setUserId(user.id);
                              handleShowDeletePop(true);
                              console.log(userId);
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
          ) : (
            <RolTable />
          )}
        </div>
      </div>

      {showPopUp && (
        <CreateUser
          setShowPopUp={setShowPopUp}
          onCreated={async () => {
            await getUsers(); // vuelve a cargar la tabla
          }}
        />
      )}
      {showEditPop && (
        <EditUser
          setShowEditPop={setShowEditPop}
          user={users}
          setUser={setUsers}
        />
      )}
      {showDeleteUser && (
        <DeleteUser
          setShowDeleteUser={setShowDeleteUser}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          deleteUser={deleteUser}
          userId={userId}
        />
      )}
    </>
  );
}
