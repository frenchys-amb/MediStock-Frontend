import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Login';
import Header from "./components/Header";
import Dashboard from './pages/Dashboard';
import Storage from './pages/Storage';
import Medication from './pages/Medication';
import Record from './pages/Record';
import Unit from "./components/Unit";
import Drug from "./pages/Drug";
import Logout from "./Logout";
import Unit1 from "./pages/Unit1";
import Unit2 from "./pages/Unit2";
import Unit3 from "./pages/Unit3";
import Unit5 from "./pages/Unit5";
import Unit6 from "./pages/Unit6";
import Unit7 from "./pages/Unit7";
import Unit8 from "./pages/Unit8";
import Unit9 from "./pages/Unit9";
import Unit10 from "./pages/Unit10";
import Unit11 from "./pages/Unit11";
import Unit12 from "./pages/Unit12";
import Unit13 from "./pages/Unit13";
import Unit14 from "./pages/Unit14";
import Unit15 from "./pages/Unit15";
import FormUnit1 from './Form/FormUnit1';
import FormUnit2 from './Form/FormUnit2';
import FormUnit3 from './Form/FormUnit3';
import FormUnit5 from './Form/FormUnit5';
import FormUnit6 from './Form/FormUnit6';
import FormUnit7 from './Form/FormUnit7';
import FormUnit8 from './Form/FormUnit8';
import FormUnit9 from './Form/FormUnit9';
import FormUnit10 from './Form/FormUnit10';
import FormUnit11 from './Form/FormUnit11';
import FormUnit12 from './Form/FormUnit12';
import FormUnit13 from './Form/FormUnit13';
import FormUnit14 from './Form/FormUnit14';
import FormUnit15 from './Form/FormUnit15';
import ReportUnit from './components/ReportUnit';
import ReportForm from './components/ReportForm';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const location = useLocation();

  const isLoginPath = location.pathname === '/' || 
                      location.pathname === '/login' ||
                      location.pathname === '/formunit1' ||
                      location.pathname === '/formunit2' ||
                      location.pathname === '/formunit3' ||
                      location.pathname === '/formunit5' ||
                      location.pathname === '/formunit6' ||
                      location.pathname === '/formunit7' ||
                      location.pathname === '/formunit8' ||
                      location.pathname === '/formunit9' ||
                      location.pathname === '/formunit10' ||
                      location.pathname === '/formunit11' ||
                      location.pathname === '/formunit12' ||
                      location.pathname === '/formunit13' ||
                      location.pathname === '/formunit14' ||
                      location.pathname === '/formunit15'


  return (
    <div className="flex">
      {!isLoginPath && <Header />}
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/formunit1" element={<FormUnit1 />} />
          <Route path="/formunit2" element={<FormUnit2 />} />
          <Route path="/formunit3" element={<FormUnit3 />} />
          <Route path="/formunit5" element={<FormUnit5 />} />
          <Route path="/formunit6" element={<FormUnit6 />} />
          <Route path="/formunit7" element={<FormUnit7 />} />
          <Route path="/formunit8" element={<FormUnit8 />} />
          <Route path="/formunit9" element={<FormUnit9 />} />
          <Route path="/formunit10" element={<FormUnit10 />} />
          <Route path="/formunit11" element={<FormUnit11 />} />
          <Route path='/formunit12' element={<FormUnit12 />} />
          <Route path='/formunit13' element={<FormUnit13 />} />
          <Route path='/formunit14' element={<FormUnit14 />} />
          <Route path='/formunit15' element={<FormUnit15 />} />

           
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/storage" element={<ProtectedRoute element={Storage} />} />
        <Route path="/medication" element={<ProtectedRoute element={Medication} />} />
        <Route path="/record" element={<ProtectedRoute element={Record} />} />
        <Route path="/unit" element={<ProtectedRoute element={Unit} />} />
        <Route path="/drug" element={<ProtectedRoute element={Drug} />} />
        <Route path="/unit1" element={<ProtectedRoute element={Unit1} />} />
        <Route path="/unit2" element={<ProtectedRoute element={Unit2} />} />
        <Route path="/unit3" element={<ProtectedRoute element={Unit3} />} />
        <Route path="/unit5" element={<ProtectedRoute element={Unit5} />} />
        <Route path="/unit6" element={<ProtectedRoute element={Unit6} />} />
        <Route path="/unit7" element={<ProtectedRoute element={Unit7} />} />
        <Route path="/unit8" element={<ProtectedRoute element={Unit8} />} />
        <Route path="/unit9" element={<ProtectedRoute element={Unit9} />} />
        <Route path="/unit10" element={<ProtectedRoute element={Unit10} />} />
        <Route path="/unit11" element={<ProtectedRoute element={Unit11} />} />
        <Route path="/unit12" element={<ProtectedRoute element={Unit12} />} />
        <Route path="/unit13" element={<ProtectedRoute element={Unit13} />} />
        <Route path="/unit14" element={<ProtectedRoute element={Unit14} />} />
        <Route path="/unit15" element={<ProtectedRoute element={Unit15} />} />
        <Route path="/reportunit" element={<ProtectedRoute element={ReportUnit} />} />
        <Route path="/reportform" element={<ProtectedRoute element={ReportForm} />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
