// 📁 src/components/Layout.js
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
        <Link href="/create-task" className={styles.navLink}>Tasks</Link>
        {user ? (
          <button onClick={logout} className={styles.logoutButton}>Logout</button>
        ) : (
          <>
            <Link href="/login" className={styles.navLink}>Login</Link>
            <Link href="/register" className={styles.navLink}>Register</Link>
          </>
        )}
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;