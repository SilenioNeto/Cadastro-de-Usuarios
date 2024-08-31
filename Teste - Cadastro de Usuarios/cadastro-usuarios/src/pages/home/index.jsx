import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/images/Trash.svg'
import api from '../../services/api'
function Home() {
  
  const [users, setUsers] = useState([])

  const inputName = useRef();
  const inputEmail = useRef();

  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)

   }

   async function createUser(){
    await api.post('/usuarios',{
      name:inputName.current.value,
      email:inputEmail.current.value
    })
    getUsers()
   }

   async function deleteUser(id){
    const usersFromApi = await api.delete(`/usuarios/${id}`)
    getUsers()
   }

   useEffect(() => {
    getUsers()
   },[])

  return(
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input type="text" name="Nome" placeholder='Nome' ref={inputName}/>
        <input type="text" name="Email" placeholder='Email' ref={inputEmail}/>
        <button type="button" onClick={createUser}>Cadastrar</button>
      </form>
      {users.map(user => (
          <div key={user.id} className='card'>
          <div >
          <p>Nome: <span>{user.name}</span></p>
          <p>Email: <span>{user.email}</span></p>
          </div>
            <button className='btn-trash' onClick={() => deleteUser(user.id)}>
            <img src={Trash}></img>
            </button>
        </div>
      ))}
    
    </div>
    
  )

}

export default Home
