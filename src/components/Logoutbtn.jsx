
import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../authservice/auth'
import {logout} from '../store/authslice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block px-4 sm:px-6 py-2 text-sm sm:text-base font-medium text-[#F2F0EF] bg-[#8a3c15] hover:bg-[#F2F0EF] hover:text-[#245F73] rounded-full transition-all duration-300 ease-in-out'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn;