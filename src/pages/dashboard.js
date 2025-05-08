import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const tasksResponse = await axios.get(
          "https://task-management-backend-q4u7.onrender.com/api/tasks",
          {
            headers: { Authorization: token },
          }
        );
        setTasks(tasksResponse.data);

        const notificationsResponse = await axios.get(
          "https://task-management-backend-q4u7.onrender.com/api/notifications",
          {
            headers: { Authorization: token },
          }
        );
        setNotifications(notificationsResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, [router]);

  const handleComplete = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://task-management-backend-q4u7.onrender.com/api/tasks/${taskId}`,
        { status: "Completed" },
        { headers: { Authorization: token } }
      );
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: "Completed" } : task
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://task-management-backend-q4u7.onrender.com/api/tasks/${taskId}`,
        {
          headers: { Authorization: token },
        }
      );
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Dashboard</h1>

      <h2 className={styles.sectionTitle}>Your Tasks</h2>
      <div className={styles.tasksGrid}>
        {tasks.map((task, index) => (
          <div
            key={task._id}
            className={styles.taskCard}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className={styles.taskTitle}>
              <span
                className={`${styles.priorityIndicator} ${
                  styles[`priority${task.priority}`]
                }`}
              ></span>
              {task.title}
            </h3>
            <p className={styles.taskDescription}>{task.description}</p>
            <div className={styles.taskMeta}>
              <span
                className={`${styles.taskStatus} ${
                  styles[`status${task.status}`]
                }`}
              >
                {task.status}
              </span>
              {task.status !== "Completed" && (
                <button
                  onClick={() => handleComplete(task._id)}
                  className={styles.completeButton}
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => handleDelete(task._id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
            {task.dueDate && (
              <p className={styles.taskDueDate}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Uncomment if you want to display notifications */}
      {/* 
      <h2 className={styles.sectionTitle}>Notifications</h2>
      <div className={styles.notificationsList}>
        {notifications.map((notification, index) => (
          <div
            key={notification._id}
            className={styles.notificationItem}
            style={{ animationDelay: ${index * 0.05}s }}
          >
            <p>{notification.message}</p>
            <small>{new Date(notification.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
      */}
    </div>
  );
};

export default Dashboard;
