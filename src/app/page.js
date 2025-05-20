'use client'
import Login from "@/Component/Auth/Login/Login";
import Register from "@/Component/Auth/Register/Register";
import Image from "next/image";
import Root from "@/Component/Home/Home";
import  Upload  from "@/Component/Upload/Upload";
import { Provider } from "react-redux";
import {store} from "@/redux/store";
import  Main  from "@/Component/home_1/Main";
export default function Home() {
  return (
   <>

   <Provider store={store}>
   <Main/>
   </Provider>
   
   </>
  );
}
