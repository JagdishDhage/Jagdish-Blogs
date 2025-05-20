"use client";
import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { SlLock } from "react-icons/sl";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import axios from "axios";
function Login() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const handlePasswor=async()=>{
        setShowPassword(!showPassword);
    }
    const handleLogin = async () => {
        try{
            const response= await axios.post('/api/auth/login',user);
       
        console.log(response.data)
        }catch(e){
            console.log(e);
        }
    }
    const handleOnChange=(event)=>{
        setUser({...user,[event.target.name]:event.target.value})
    }
  return (
    <div className="">
      <div className="flex justify-center items-center flex-col shadow-2xl w-3/12 mx-auto p-10 border-2 gap-4 ">
             <p className="text-2xl font-bold text-center">
                Wellcome
            </p>
        <div className="flex justify-center items-center rounded border-2 m-0 p-1 w-full">
           
          <MdOutlineEmail className="w-6 h-6" />
          <input
            type="email"
            className="outline-none flex-1 px-2"
            name="email"
            placeholder="Enter the Email"
            onChange={handleOnChange}
            value={user.email}
          />
        </div>

        <div className="flex justify-center items-center border-2 p-1 w-full rounded">
          <SlLock className="w-6 h-6"/>
          <input
            type={showPassword?"text":"password"}
            className="outline-none flex-1 px-2"
            name="password"
            value={user.password}
            placeholder="Enter the password"
            onChange={handleOnChange}
          />
         <button type='button' className='' onClick={handlePasswor}>
             {showPassword ?<IoEyeOffSharp/>:<IoEyeOutline/> }
         </button>
          
        </div>
        <button className="bg-blue-300 border p-2 rounded" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
