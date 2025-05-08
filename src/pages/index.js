// 📁 src/pages/index.js
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Animated background gradient */}
      <div className={styles.gradientBg}></div>

      {/* Main content with glassmorphism effect */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.glassCard}
      >
        <h1 className={styles.title}>
          <span className={styles.titleGradient}>TaskFlo</span>
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className={styles.cursor}
          >
            ✨
          </motion.span>
        </h1>
        <p className={styles.subtitle}>Your glass-smooth task management system</p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.ctaButtonContainer}
        >
          <Link href="/create-task" className={styles.ctaButton}>
            Get Started
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}