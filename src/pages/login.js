// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import styles from "../styles/Login.module.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password
//       });
//       localStorage.setItem("token", response.data.token);
//       router.push("/dashboard");
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.loginCard}>
//         <h1 className={styles.title}>Access Portal</h1>

//         <form onSubmit={handleSubmit}>
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Email</label>
//             <input
//               type="email"
//               className={styles.input}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="user@example.com"
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Password</label>
//             <input
//               type="password"
//               className={styles.input}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           {error && <p className={styles.error}>{error}</p>}

//           <button type="submit" className={styles.submitButton}>
//             Authenticate
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://task-management-backend-q4u7.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      login(res.data.token, res.data.user); // store token & user info
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  if (isLoggedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <h1 className={styles.title}>You are logged in</h1>
          <button onClick={logout} className={styles.submitButton}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Access Portal</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitButton}>
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
