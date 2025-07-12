// import { Link } from 'react-router-dom';

// export default function Footer() {
//   return (
//     <footer className="bg-gray-100 text-gray-700 text-sm py-12 px-6 border-t">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//         {/* Quick Links */}
      

//         {/* Policies */}
//         <div>
//           <h3 className="font-semibold mb-4 text-gray-800">Policies</h3>
//           <ul className="space-y-2">
//             <li><Link to="/refund-policy">Refund Policy</Link></li>
//             <li><a href="#">Terms of Service</a></li>
//             <li><a href="#">Privacy Policy</a></li>
          
//             <li><a href="#">KYC Rules</a></li>
//           </ul>
//         </div>

//         {/* Important Links */}
//         <div>
//           <h3 className="font-semibold mb-4 text-gray-800">Important links</h3>
//           <ul className="space-y-2">
//             <li><a href="#">eSIM compatible devices for iOS</a></li>
//             <li><a href="#">eSIM compatible devices for Android</a></li>
//             <li><a href="#">Other eSIM compatible devices</a></li>
//             <li><a href="#">eSIM delivery and activation</a></li>
//             <li><a href="#">Delivery timelines</a></li>
//             <li><a href="#">FAQ on eSIM</a></li>
//             <li><a href="#">Partner Login</a></li>
//             <li><a href="#">eSIM Technology</a></li>
//           </ul>
//         </div>

//       </div>

//       <div className="border-t mt-12 pt-6 text-center text-xs text-gray-500">
//         © 2025 ConsultIt Copyright • ConsultIt CELLULAR (INTERNATIONAL) SERVICES PRIVATE LIMITED All rights reserved
//       </div>
//     </footer>
//   );
// }







import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm py-12 px-6 border-t shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-1">
        
        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Policies</h3>
          <div className="text-left pl-70">
            <ul className="space-y-2">
              <li><Link to="/refund-policy" className="hover:text-blue-600">Refund Policy</Link></li>
              <li><Link to="/termsofservices" className="hover:text-blue-600">Terms Of Services</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/kyc" className="hover:text-blue-600">KYC Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Important links</h3>
          <div className="text-left pl-62">
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600">eSIM compatible devices for iOS</a></li>
              <li><a href="#" className="hover:text-blue-600">eSIM compatible devices for Android</a></li>
              <li><a href="#" className="hover:text-blue-600">Other eSIM compatible devices</a></li>
              <li><a href="#" className="hover:text-blue-600">eSIM delivery and activation</a></li>
              <li><a href="#" className="hover:text-blue-600">Delivery timelines</a></li>
              <li><a href="#" className="hover:text-blue-600">FAQ on eSIM</a></li>
              <li><a href="#" className="hover:text-blue-600">Partner Login</a></li>
              <li><a href="#" className="hover:text-blue-600">eSIM Technology</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="border-t mt-12 pt-6 text-center text-xs text-gray-500">
        © 2025 ConsultIt Copyright • ConsultIt CELLULAR (INTERNATIONAL) SERVICES PRIVATE LIMITED All rights reserved
      </div>
    </footer>
  );
}
