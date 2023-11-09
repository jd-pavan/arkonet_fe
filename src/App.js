import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Adminhome from './Pages/AdminPgs/Adminhome';
import ClientPages from './Pages/ClientMobilePgs/ClientPages';
import MasterAdmin from './Pages/MasterAdmin/MasterAdmin';
import HomeRoute from './Pages/HomePgs/HomeRoute';
import ChatBot from "./components/ChatBot/ChatBot"
import WhatsappChat from './components/WhatsappChat/WhatsappChat';

function App() {


  return (

    <div>
      <Router>
        <Routes>
          <Route path='/*' element={<HomeRoute />} />
          <Route path='/masteradmin/*' element={<MasterAdmin />} />
          <Route path='/admin/*' element={<Adminhome />} />
          <Route path='/client/*' element={<ClientPages />} />
        </Routes>
        {/* <WhatsappChat /> */}
      </Router>

    </div>

  );
}

export default App;