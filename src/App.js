import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { ListCompany } from './components/ListCompany';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import AddCompany from './components/AddCompany';
import { RegistrationComponent } from './components/RegistrationComponet';
import { LoginComponent } from './components/LoginComponent';
import { RequireAuth } from './components/RequireAuth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Header/> */}
      <div className="conatiner">
        <Routes>
          {/* <Route index element={<RegistrationComponent/>}/>  */}
            {/* UNPROTECTED ROUTES */}
            <Route path="/" element={<RegistrationComponent/>}/>
            <Route path="/register" element={<RegistrationComponent/>}/>
            <Route path="/login" element={<LoginComponent/>}/>

          <Route element={<RequireAuth/>}>
          <Route path="/" element={<ListCompany/>} />
          <Route path="/funds" element={<ListCompany/>} />
          <Route path="*" element={<Error/>} />
          <Route path="/addcompany" element={<AddCompany/>} />
          <Route path="/update/:id" element={<AddCompany/>} />
          <Route path="/register" element={<RegistrationComponent/>} />
          </Route>
        </Routes>
      </div>
      </BrowserRouter>
      {/* <Footer/> */}
      {/* <Header/>
      <ListFunds/>
      <Footer/> */}
    </div>

      
  );
}

export default App;
