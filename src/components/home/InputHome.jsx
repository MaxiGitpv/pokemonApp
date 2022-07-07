import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setNameGlobal } from '../../store/slices/nameUser.slice'
import { useNavigate} from 'react-router-dom'
const InputHome = () => {

const {handleSubmit, reset, register} = useForm()

const dispatch = useDispatch()


const navigate = useNavigate()


const submit = data => {
    console.log(data)
    dispatch(setNameGlobal(data.nameUser))
    reset({
        nameUser: ''
    })
    navigate('/pokedex')
}

  return (
    <form onSubmit={handleSubmit(submit)} className='input'>
        <div>
          <input placeholder="Ingresa tu nombre" type="text" className='input-tex' 
          {...register('nameUser')} />
          <button className='btn-input'>Go to Pokedex</button>
        </div>
    </form>
  )
}

export default InputHome