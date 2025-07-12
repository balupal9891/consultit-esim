import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();

  const navItems = [
    // { label: 'eSIMs', path: '/dashboard' },
    { label: 'Orders', path: '/dashboard/orders' },
    { label: 'Topup Plans', path: '/dashboard/topup' },
    { label: 'Activate eSim', path: '/dashboard/activate' }
  ];

  return (
    <div className="w-64 h-screen bg-gray-50 text-black flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-lg hover:bg-gray-200 ${
              pathname === item.path ? 'bg-gray-200' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
