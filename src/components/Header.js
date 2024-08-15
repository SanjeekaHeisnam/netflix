import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../utils/firebase";
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';


const  Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user= useSelector(store => store.user);
const handleSignOut = () =>{
  signOut(auth).then(() => {
    
  }).catch((error) => {
    navigate("/error");
  });
}
useEffect(() =>{
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const {uid, email, displayName, photoURL} = user;
      dispatch(addUser({uid: uid,email: email, displayName: displayName, photoURL:"https://tse2.explicit.bing.net/th?id=OIP.ih2IZZn9oBDOn6nZTMRwAwHaHO&pid=Api&P=0&h=180"}));
      navigate("/browse")
    } else {
    dispatch(removeUser());
    navigate("/");
    }
  });
   return () => unsubscribe();
},[])


  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img 
      className="w-44"
       src={LOGO}
      alt="logo"/>
     {user && (<div className="flex p-2">
      <img className="w-11 h-11 "
      alt="usericon"
      src={user?.photoURL}
      />
      <button onClick={handleSignOut} className="font-bold text-white"> (Sign Out)</button>
     </div>
)}
    </div>
  )
}

export default Header

