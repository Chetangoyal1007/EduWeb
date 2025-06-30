
  // import React, { useState } from "react";
  // import { useNavigate } from "react-router-dom";
  // import axios from "axios";
  // import "./Login.css";
  // import user_icon from "../../../assets/person.png";
  // import email_icon from "../../../assets/email.png";
  // import password_icon from "../../../assets/password.png";

  // const Login = () => {
  //   const [action, setAction] = useState("Sign Up");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [name, setName] = useState("");
  //   const [role, setRole] = useState("user"); // 👈 Role state
  //   const [error, setError] = useState("");
  //   const [loading, setLoading] = useState(false);

  //   const navigate = useNavigate();

  //   const handleLogin = async () => {
  //     if (!email || !password) {
  //       setError("Please fill in all fields.");
  //       return;
  //     }

  //     setLoading(true);
  //     try {
  //       const response = await axios.post("https://edu-web-roan.vercel.app/api/auth/login", {
  //         email,
  //         password,
  //       });

  //       if (response.data.success) {
  //         localStorage.setItem("token", response.data.token);
  //         localStorage.setItem("role", response.data.role);
  //         localStorage.setItem("username", response.data.name);

  //         // Redirect based on role
  //         if (response.data.role === "admin") {
  //           navigate("/admin");
  //         } else {
  //           navigate("/test");
  //         }
  //       } else {
  //         setError(response.data.message);
  //       }
  //     } catch (err) {
  //       setError("Error logging in. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const handleSignUp = async () => {
  //     if (!name || !email || !password || !role) {
  //       setError("Please fill in all fields.");
  //       return;
  //     }

  //     setLoading(true);
  //     try {
  //       const response = await axios.post("https://edu-web-roan.vercel.app/api/auth/signup", {
  //         name,
  //         email,
  //         password,
  //         role,
  //       });

  //       if (response.data.success) {
  //         localStorage.setItem("token", response.data.token);
  //         localStorage.setItem("role", response.data.role);
  //         localStorage.setItem("username", response.data.name);


  //         // Redirect based on role
  //         if (response.data.role === "admin") {
  //           navigate("/admin");
  //         } else {
  //           navigate("/test");
  //         }
  //       } else {
  //         setError(response.data.message);
  //       }
  //     } catch (err) {
  //       setError("Error signing up. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   return (
  //     <div className="login-body">
  //       <div className="container1">
  //         <div className="header1">
  //           <div className="text1">{action}</div>
  //           <div className="underline1"></div>
  //         </div>

  //         <div className="inputs1">
  //           {action === "Sign Up" && (
  //             <>
  //               <div className="input1">
  //                 <img src={user_icon} alt="" />
  //                 <input
  //                   type="text"
  //                   placeholder="Enter Name"
  //                   value={name}
  //                   onChange={(e) => setName(e.target.value)}
  //                 />
  //               </div>

  //               <div className="input1">
  //                 <select
  //                   className="w-full p-2 rounded"
  //                   value={role}
  //                   onChange={(e) => setRole(e.target.value)}
  //                 >
  //                   <option value="user">User</option>
  //                   <option value="admin">Admin</option>
  //                 </select>
  //               </div>
  //             </>
  //           )}

  //           <div className="input1">
  //             <img src={email_icon} alt="" />
  //             <input
  //               type="email"
  //               placeholder="Enter E-mail"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //             />
  //           </div>

  //           <div className="input1">
  //             <img src={password_icon} alt="" />
  //             <input
  //               type="password"
  //               placeholder="Enter Password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //             />
  //           </div>
  //         </div>

  //         {error && <p className="text-red-500 text-center">{error}</p>}

  //         <div className="submit-container1">
  //           <div
  //             className={action === "Sign Up" ? "submit gray1" : "submit"}
  //             onClick={() => setAction("Sign Up")}
  //           >
  //             Sign Up
  //           </div>
  //           <div
  //             className={action === "Login" ? "submit gray1" : "submit"}
  //             onClick={() => setAction("Login")}
  //           >
  //             Login
  //           </div>
  //         </div>

  //         {action === "Login" ? (
  //           <button
  //             onClick={handleLogin}
  //             className={`w-full mt-4 py-3 px-6 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
  //               loading
  //                 ? "bg-gray-400 cursor-not-allowed"
  //                 : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg text-white"
  //             }`}
  //             disabled={loading}
  //           >
  //             {loading ? "Logging In..." : "Login Now"}
  //           </button>
  //         ) : (
  //           <button
  //             onClick={handleSignUp}
  //             className={`w-full mt-4 py-3 px-6 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
  //               loading
  //                 ? "bg-gray-400 cursor-not-allowed"
  //                 : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg text-white"
  //             }`}
  //             disabled={loading}
  //           >
  //             {loading ? "Signing Up..." : "Sign Up Now"}
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  // export default Login;
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import "./Login.css";
  import user_icon from "../../../assets/person.png";
  import email_icon from "../../../assets/email.png";
  import password_icon from "../../../assets/password.png";
  
  const Login = () => {
    const [action, setAction] = useState("Sign Up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      if (!email || !password) {
        setError("Please fill in all fields.");
        return;
      }
  
      setLoading(true);
      try {
        const response = await axios.post("https://edu-web-roan.vercel.app/api/auth/login", {
          email,
          password,
        });
  
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("username", response.data.name);
  
          if (response.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/StudentDashboard/StudentDashboard");
          }
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Error logging in. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    const handleSignUp = async () => {
      if (!name || !email || !password || !role) {
        setError("Please fill in all fields.");
        return;
      }
  
      setLoading(true);
      try {
        const response = await axios.post("https://edu-web-roan.vercel.app/api/auth/signup", {
          name,
          email,
          password,
          role,
        });
  
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("username", response.data.name);
  
          if (response.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/StudentDashboard/StudentDashboard");
          }
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Error signing up. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="login-body">
        <div className="container1">
          <div className="header1">
            <div className="text1">{action}</div>
            <div className="underline1"></div>
          </div>
  
          <div className="inputs1">
            {action === "Sign Up" && (
              <>
                <div className="input1">
                  <img src={user_icon} alt="" />
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
  
                <div className="input1">
                  <select
                    className="w-full p-2 rounded"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}
  
            <div className="input1">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Enter E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <div className="input1">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
  
          {error && <p className="text-red-500 text-center">{error}</p>}
  
          <div className="submit-container1">
            <div
              className={action === "Sign Up" ? "submit gray1" : "submit"}
              onClick={() => setAction("Sign Up")}
            >
              Sign Up
            </div>
            <div
              className={action === "Login" ? "submit gray1" : "submit"}
              onClick={() => setAction("Login")}
            >
              Login
            </div>
          </div>
  
          {action === "Login" ? (
            <button
              onClick={handleLogin}
              className={`w-full mt-4 py-3 px-6 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg text-white"
              }`}
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login Now"}
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className={`w-full mt-4 py-3 px-6 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg text-white"
              }`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up Now"}
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default Login;
  