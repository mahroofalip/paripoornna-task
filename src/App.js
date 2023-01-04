

import './App.css';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Table2 from './screens/Table2';
import Table1 from './screens/Table1';
function App() {
  return (
    <Router>
   <Routes>
   <Route path="/table2" element={<Table2 />} />
   <Route path="/" element={<Table1 />} />
   </Routes>
    </Router>
  );
}

export default App;
