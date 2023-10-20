import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Adminhome from './Pages/AdminPgs/Adminhome';
import ClientPages from './Pages/ClientMobilePgs/ClientPages';
import MasterLogIn from './Pages/MasterAdmin/MasterLogIn/MasterLogIn';

function App() {


  return (

    <div>
      <Router>
        <Routes>

          <Route path='/masteradmin/*' element={<MasterLogIn />} />
          <Route path='/admin/*' element={<Adminhome />} />
          <Route path='/client/*' element={<ClientPages />} />
        </Routes>
      </Router>

    </div>

  );
}

export default App;
