import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { ListCompany } from './components/ListCompany';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import AddCompany from './components/AddCompany';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <div className="conatiner">
        <Routes>
          <Route path="/" element={<ListCompany/>} />
          <Route path="/funds" element={<ListCompany/>} />
          <Route path="*" element={<Error/>} />
          <Route path="/addcompany" element={<AddCompany/>} />
          <Route path="/update/:id" element={<AddCompany/>} />
        </Routes>
      </div>
      </BrowserRouter>
      <Footer/>
      {/* <Header/>
      <ListFunds/>
      <Footer/> */}
    </div>

      
  );
}

export default App;
