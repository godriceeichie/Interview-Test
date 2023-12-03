import { useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter,createRoutesFromElements, 
  Route, 
  RouterProvider, } from 'react-router-dom'
import Form from "./components/Form";
import UpdateForm from "./components/UpdateForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Form />}/>
      <Route path="updateForm" element={<UpdateForm />}/>
    </Route>
    
    
  )
)

function App() {
  return(
    <RouterProvider router={router}/>
  )
}

export default App;
