import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import Login from "./Login";
ReactDom.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>

,document.getElementById('root'));

