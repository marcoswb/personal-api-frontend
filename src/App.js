import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Root from './components/Root';
import Experience from './components/Experience';
import Formation from './components/Formation';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contacts from './components/Contacts';

import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Root/>}/>
        <Route path='/experience' element={<Experience/>} />
        <Route path='/formation' element={<Formation/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/blog' element={<Blog/>} />
        <Route path='/contacts' element={<Contacts/>} />
      </Routes>
    </div>
  );
}

export default App;
