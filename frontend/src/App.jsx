import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./NavBar"
import Body from "./Body"
import Login from "./Login"
import Profile from "./Profile"
import {Profider} from 'react-redux'
import appStore from './utils/appStore'
function App() {
  return (
   <>
   <Provider store={appStore}>
   <BrowserRouter basename="/">
    <Routes>
      <Route path='/'element={<Body/>}>
        <Route path='/login'element={<Login/>}></Route>
        <Route path='/Coneection'element={<Profile/>}></Route>
      </Route>
    </Routes>
   </BrowserRouter>
   </Provider>
   </>
  )
}

export default App
