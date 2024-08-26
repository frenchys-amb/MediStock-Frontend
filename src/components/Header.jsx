import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <nav className="bg-sky-900 text-white p-4 min-h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">MediStock</h1>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard">
              <span className={`py-2 text-lg block ${location.pathname === '/dashboard' ? 'underline' : 'hover:underline'}`}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/storage">
              <span className={`py-2 text-lg block ${location.pathname === '/storage' ? 'underline' : 'hover:underline'}`}>Storage</span>
            </Link>
          </li>
          <li>
            <Link to="/medication">
              <span className={`py-2 text-lg block ${location.pathname === '/medication' ? 'underline' : 'hover:underline'}`}>Medication</span>
            </Link>
          </li>
          <li>
            <Link to="/record">
              <span className={`py-2 text-lg block ${location.pathname === '/record' ? 'underline' : 'hover:underline'}`}>Record</span>
            </Link>
          </li>
          <li>
            <Link to="/unit">
              <span className={`py-2 text-lg block ${location.pathname === '/unit' ? 'underline' : 'hover:underline'}`}>Unit</span>
            </Link>
          </li>
          <li>
            <Link to="/reportunit">
              <span className={`py-2 text-lg block ${location.pathname === '/reportunit' ? 'underline' : 'hover:underline'}`}>Report Unit</span>
            </Link>
          </li>
          <li>
            <Link to="/reportform">
              <span className={`py-2 text-lg block ${location.pathname === '/reportform' ? 'underline' : 'hover:underline'}`}>Report Form</span>
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <span className={`py-2 text-lg block ${location.pathname === '/logout' ? 'underline' : 'hover:underline'}`}>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      <footer className="text-sm text-white">
        &copy; {new Date().getFullYear()} MediStock
      </footer>
    </nav>
  );
}

export default Header;
