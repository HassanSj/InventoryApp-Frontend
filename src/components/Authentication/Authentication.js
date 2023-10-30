// import React, { useState } from "react";
// import "assets/css/autheticate.css";
// import SweetAlertService from "services/SweetAlertService";
// import { useHistory } from "react-router-dom";
// function Authentication() {
//   const history = useHistory();
//   const [loginData, setLoginData] = useState({
//     loginEmail: "",
//     loginPassword: "",
//   });

//   const [signupData, setSignupData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleLoginInputChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

 

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await fetch("/api/login", {
//         method: "POST",
//         body: JSON.stringify(loginData),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       // Handle success or redirect to a new page
//     } catch (error) {
//       // Handle error
//     }
//   };


//   return (
//     <div className="container-main">
//       <div className="main">
//         <input type="checkbox" id="chk" aria-hidden="true" />

//         <div className="signup">
//           <form onSubmit={handleSignupSubmit}>
//             <label htmlFor="chk" aria-hidden="true">
//               Sign up
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="User name"
//               value={signupData.name}
//               onChange={handleSignupInputChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={signupData.email}
//               onChange={handleSignupInputChange}
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={signupData.password}
//               onChange={handleSignupInputChange}
//               required
//             />
//             <button type="submit">Sign up</button>
//           </form>
//         </div>
//         <div className="login">
//           <form onSubmit={handleLoginSubmit}>
//             <label htmlFor="chk" aria-hidden="true">
//               Login
//             </label>
//             <input
//               type="email"
//               name="loginEmail"
//               placeholder="Email"
//               value={loginData.loginEmail}
//               onChange={handleLoginInputChange}
//               required
//             />
//             <input
//               type="password"
//               name="loginPassword"
//               placeholder="Password"
//               value={loginData.loginPassword}
//               onChange={handleLoginInputChange}
//               required
//             />
//             <button type="submit">Login</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Authentication;
