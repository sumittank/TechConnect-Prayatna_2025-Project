// import React from 'react';
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white py-8">
//       <div className="max-w-6xl mx-auto px-6 md:px-12">
//         {/* Top Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
//           {/* Fire Department Info */}
//           <div>
//             <h2 className="text-2xl font-bold text-sky-500">Fire Department</h2>
//             <p className="mt-2 text-gray-400">
//               Ensuring safety through modern monitoring & automation.
//             </p>
//             <div className="mt-4 flex items-center justify-center md:justify-start space-x-3">
//               <FaMapMarkerAlt className="text-sky-400" />
//               <p className="text-gray-400">123 Emergency Lane, City, Country</p>
//             </div>
//             <div className="flex items-center justify-center md:justify-start space-x-3 mt-2">
//               <FaPhoneAlt className="text-sky-400" />
//               <p className="text-gray-400">+1 800 123 4567</p>
//             </div>
//             <div className="flex items-center justify-center md:justify-start space-x-3 mt-2">
//               <FaEnvelope className="text-sky-400" />
//               <p className="text-gray-400">support@firedept.com</p>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-xl font-semibold border-b-2 border-sky-500 inline-block pb-1">Quick Links</h3>
//             <ul className="mt-4 space-y-2">
//               <li><a href="/homeofficer" className="text-gray-400 hover:text-sky-400">Dashboard</a></li>
//               <li><a href="/all-applications" className="text-gray-400 hover:text-sky-400">Applications</a></li>
//               <li><a href="/inspection-schedule" className="text-gray-400 hover:text-sky-400">Inspections</a></li>
//               <li><a href="/approved-applications" className="text-gray-400 hover:text-sky-400">NOCs</a></li>
//             </ul>
//           </div>

//           {/* Support & Help */}
//           <div>
//             <h3 className="text-xl font-semibold border-b-2 border-sky-500 inline-block pb-1">Support</h3>
//             <ul className="mt-4 space-y-2">
//               <li><a href="/faq" className="text-gray-400 hover:text-sky-400">FAQs</a></li>
//               <li><a href="/contact" className="text-gray-400 hover:text-sky-400">Contact Us</a></li>
//               <li><a href="/terms" className="text-gray-400 hover:text-sky-400">Terms & Policies</a></li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
//           &copy; {new Date().getFullYear()} Fire Department Monitoring System. All Rights Reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;



import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Fire Department Info */}
          <div>
            <h2 className="text-2xl font-bold text-sky-500">Fire Department</h2>
            <p className="mt-2 text-gray-400">
              Ensuring safety through modern monitoring & automation.
            </p>
            <div className="mt-4 flex items-center justify-center md:justify-start space-x-3">
              <FaMapMarkerAlt className="text-sky-400" />
              <p className="text-gray-400">123 Emergency Lane, City, Country</p>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3 mt-2">
              <FaPhoneAlt className="text-sky-400" />
              <p className="text-gray-400">+1 800 123 4567</p>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3 mt-2">
              <FaEnvelope className="text-sky-400" />
              <p className="text-gray-400">support@firedept.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold border-b-2 border-sky-500 inline-block pb-1">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/homeofficer" className="text-gray-400 hover:text-sky-400">Dashboard</a></li>
              <li><a href="/all-applications" className="text-gray-400 hover:text-sky-400">Applications</a></li>
              <li><a href="/inspection-schedule" className="text-gray-400 hover:text-sky-400">Inspections</a></li>
              <li><a href="/approved-applications" className="text-gray-400 hover:text-sky-400">NOCs</a></li>
            </ul>
          </div>

          {/* Support & Help */}
          <div>
            <h3 className="text-xl font-semibold border-b-2 border-sky-500 inline-block pb-1">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/faq" className="text-gray-400 hover:text-sky-400">FAQs</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-sky-400">Contact Us</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-sky-400">Terms & Policies</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Fire Department Monitoring System. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
