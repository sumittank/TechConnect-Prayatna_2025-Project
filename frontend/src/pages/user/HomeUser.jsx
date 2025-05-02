// import React from 'react';
// import { FaCartPlus } from "react-icons/fa6";
// import deliveryboy from '../../assets/boyfire.png';
// import { useNavigate } from 'react-router-dom';
// import AIImage from '../../assets/AIHuman.png';
// import digitalImage from '../../assets/digital new.png'

// function HomeUser() {
//     const navigate = useNavigate();

//     return (
//         <>
//             <div className="font-sans">
//                 <div className="flex w-screen h-4/5 mb-20">
//                     {/* Left Section */}
//                     <div className="w-3/5 h-full">
//                         <div>
//                             <p className="text-6xl mt-20 ml-48 font-extrabold tracking-wide">
//                                 <span className="text-sky-600 drop-shadow-lg">Apply</span> <span className='text-gray-800'>&</span>
//                                 <span className="text-sky-600 drop-shadow-lg"> Automate</span>
//                             </p>
//                             <p className="text-6xl ml-48 font-extrabold tracking-wide">
//                                 <span className="text-sky-600 drop-shadow-lg">Fire Department</span> <span className='text-gray-800'>Operations</span>
//                             </p>
//                             <p className="text-6xl ml-48 font-extrabold text-gray-800">Effortlessly!</p>

//                             <p className="mt-5 ml-44 text-lg text-gray-700 italic leading-relaxed">
//                                 <span className="text-blue-600 text-2xl font-bold">"</span>
//                                 Stay ahead with <span className="font-semibold text-gray-900">real-time monitoring</span>, 
//                                 <span className="font-semibold text-gray-900"> automated inspections</span>, and 
//                                 <span className="font-semibold text-gray-900"> AI-powered risk assessments</span>.
//                             </p>
//                             <p className="ml-48 text-lg text-gray-700 italic leading-relaxed">
//                                 Ensure <span className="font-semibold text-gray-900">safety</span>, 
//                                 <span className="font-semibold text-gray-900"> compliance</span>, and 
//                                 <span className="font-semibold text-gray-900"> faster response times</span>!
//                                 <span className="text-blue-600 text-2xl font-bold">"</span>
//                             </p>
//                         </div>

//                         {/* Buttons Section */}
//                         <div className="ml-48 mt-16 flex">
//                             <div className="text-2xl bg-gray-600 hover:bg-sky-700 text-white px-6 py-3 font-semibold uppercase tracking-wide rounded-full transition duration-300 shadow-lg">
//                                 <button onClick={() => navigate('/apply-application')}>Apply Application Now !!</button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Section - Image */}
//                     <div className="w-2/5 h-full">
//                         <img 
//                             src={deliveryboy} 
//                             className="mt-16 ml-4 h-[33rem] w-[50rem]" 
//                             alt="Fire Department Monitoring" 
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* AI Section */}
//             <div className="w-screen h-screen flex items-center justify-center">
//                 <div className="flex items-center space-x-20">
//                     {/* AI Image */}
//                     <img 
//                         src={AIImage}  
//                         className="w-[45rem] h-[30rem] mt-[5rem] rounded-lg shadow-xl" 
//                         alt="AI Integration" 
//                     />

//                     {/* AI Text */}
//                     <div className="max-w-lg">
//                         <h2 className="text-5xl font-extrabold text-gray-800">
//                             AI-Powered <span className="text-sky-600">Integration</span>
//                         </h2>
//                         <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//                             Our cutting-edge <span className="font-semibold text-gray-900">AI technology</span> ensures 
//                             automated compliance, real-time risk assessment, and seamless fire department operations.
//                         </p>
//                         <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//                             Experience the power of <span className="font-semibold text-gray-900">smart monitoring</span> 
//                             and <span className="font-semibold text-gray-900">automated approvals</span> like never before.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className="w-screen h-screen flex items-center justify-center">
//                 <div className="flex items-center space-x-20">
                    
//                     {/* AI Text */}
//                     <div className="max-w-lg">
//                         <h2 className="text-5xl font-extrabold text-gray-800">
//                             Digital QR <span className="text-sky-600">Integration</span>
//                         </h2>
//                         <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//                             Our cutting-edge over<span className="font-semibold text-gray-900">Encrypted</span> sysytem
//                             automated compliance, Generated Digital QR, and seamless fire department NOC.
//                         </p>
//                         <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//                             Experience the power of <span className="font-semibold text-gray-900">digital monitoring</span> 
//                             and <span className="font-semibold text-gray-900">automated NOC</span> you have never seen before
//                             .
//                         </p>
//                     </div>

//                     {/* AI Image */}
//                     <img 
//                         src={digitalImage}  
//                         className="w-[50rem] h-[25rem] mt-[5rem] rounded-lg shadow-xl" 
//                         alt="AI Integration" 
//                     />

//                 </div>
//             </div>
//         </>
//     );
// }

// export default HomeUser;


import React from 'react';
import { FaCartPlus } from "react-icons/fa6";
import deliveryboy from '../../assets/boyfire.png';
import { useNavigate } from 'react-router-dom';
import AIImage from '../../assets/AIHuman.png';
import digitalImage from '../../assets/digital new.png';

function HomeUser() {
    const navigate = useNavigate();

    return (
        <>
            <div className="font-sans">
                <div className="flex flex-col md:flex-row w-full h-auto md:h-4/5 mb-20">
                    {/* Left Section */}
                    <div className="w-full md:w-3/5 h-full px-4 md:px-48">
                        <div>
                            <p className="text-4xl sm:text-5xl md:text-6xl mt-20 font-extrabold tracking-wide">
                                <span className="text-sky-600 drop-shadow-lg">Apply</span> <span className='text-gray-800'>&</span>
                                <span className="text-sky-600 drop-shadow-lg"> Automate</span>
                            </p>
                            <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide">
                                <span className="text-sky-600 drop-shadow-lg">Fire Department</span> <span className='text-gray-800'>Operations</span>
                            </p>
                            <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800">Effortlessly!</p>

                            <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-700 italic leading-relaxed">
                                <span className="text-blue-600 text-2xl font-bold">"</span>
                                Stay ahead with <span className="font-semibold text-gray-900">real-time monitoring</span>, 
                                <span className="font-semibold text-gray-900"> automated inspections</span>, and 
                                <span className="font-semibold text-gray-900"> AI-powered risk assessments</span>.
                            </p>
                            <p className="text-base sm:text-lg md:text-xl text-gray-700 italic leading-relaxed">
                                Ensure <span className="font-semibold text-gray-900">safety</span>, 
                                <span className="font-semibold text-gray-900"> compliance</span>, and 
                                <span className="font-semibold text-gray-900"> faster response times</span>!
                                <span className="text-blue-600 text-2xl font-bold">"</span>
                            </p>
                        </div>

                        {/* Buttons Section */}
                        <div className="mt-16 flex justify-start">
                            <div className="text-lg sm:text-2xl bg-gray-600 hover:bg-sky-700 text-white px-6 py-3 font-semibold uppercase tracking-wide rounded-full transition duration-300 shadow-lg">
                                <button onClick={() => navigate('/apply-application')}>Apply Application Now !!</button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Image */}
                    <div className="w-full md:w-2/5 h-full flex justify-center md:justify-start">
                        <img 
                            src={deliveryboy} 
                            className="mt-8 md:mt-16 h-auto w-3/4 md:w-[50rem] lg:w-[40rem]" 
                            alt="Fire Department Monitoring" 
                        />
                    </div>
                </div>
            </div>

            {/* AI Section */}
            <div className="w-full h-auto md:h-screen flex items-center justify-center px-4 md:px-0">
                <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-20">
                    {/* AI Image */}
                    <img 
                        src={AIImage}  
                        className="w-full md:w-[45rem] h-auto mt-8 md:mt-[5rem] rounded-lg shadow-xl" 
                        alt="AI Integration" 
                    />

                    {/* AI Text */}
                    <div className="max-w-lg text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">
                            AI-Powered <span className="text-sky-600">Integration</span>
                        </h2>
                        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                            Our cutting-edge <span className="font-semibold text-gray-900">AI technology</span> ensures 
                            automated compliance, real-time risk assessment, and seamless fire department operations.
                        </p>
                        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                            Experience the power of <span className="font-semibold text-gray-900">smart monitoring</span> 
                            and <span className="font-semibold text-gray-900">automated approvals</span> like never before.
                        </p>
                    </div>
                </div>
            </div>

            {/* Digital QR Section */}
            <div className="w-full h-auto md:h-screen flex items-center justify-center px-4 md:px-0">
                <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-20">
                    
                    {/* AI Text */}
                    <div className="max-w-lg text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">
                            Digital QR <span className="text-sky-600">Integration</span>
                        </h2>
                        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                            Our cutting-edge over<span className="font-semibold text-gray-900">Encrypted</span> system
                            automated compliance, Generated Digital QR, and seamless fire department NOC.
                        </p>
                        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                            Experience the power of <span className="font-semibold text-gray-900">digital monitoring</span> 
                            and <span className="font-semibold text-gray-900">automated NOC</span> you have never seen before.
                        </p>
                    </div>

                    {/* AI Image */}
                    <img 
                        src={digitalImage}  
                        className="w-full md:w-[50rem] h-auto mt-8 md:mt-[5rem] rounded-lg shadow-xl" 
                        alt="Digital QR Integration" 
                    />
                </div>
            </div>
        </>
    );
}

export default HomeUser;
