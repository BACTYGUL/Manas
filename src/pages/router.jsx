import { createBrowserROUter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Servis from "./pages/Servis";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Letter from "./pages/Letter";
import { Children } from "react";


export const myRouter = createBrowserROUter ([
    {
     path:"Home",
     element: <Layout/>,
     Children:[
{
    path:"Home",
    element:<Home />,
},
{
    path:"Letter",
    element:<Letter />,
},
{
    path:"About",
    element:<About />,
},
{
path:"Detial",
element:<Detail />
},
     ],  
    },
]),