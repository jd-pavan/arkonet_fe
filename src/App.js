import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Adminhome from './Pages/AdminPgs/Adminhome';
import ClientPages from './Pages/ClientMobilePgs/ClientPages';
import HomePage from './Pages/HomePgs/HomeRoute';
import MasterAdmin from './Pages/MasterAdmin/MasterAdmin';

function App() {


  return (

    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/masteradmin/*' element={< MasterAdmin />} />
          <Route path='/admin/*' element={<Adminhome />} />
          <Route path='/client/*' element={<ClientPages />} />
        </Routes>
      </Router>

      {/* <div>
        <img src={whatsapp} alt="" />
      </div> */}

    </div>

  );
}

export default App;
