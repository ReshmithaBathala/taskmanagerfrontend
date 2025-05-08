import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/CreateTask.module.css";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://task-management-backend-q4u7.onrender.com/api/tasks",
        {
          title,
          description,
          dueDate,
          priority,
          status: "Pending",
        },
        {
          headers: { Authorization: token },
        }
      );
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CREATE NEW TASK</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>TITLE</label>
          <input
            type="text"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter task title"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>DESCRIPTION</label>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe your task..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>PRIORITY</label>
          <select
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>DUE DATE</label>
          <input
            type="date"
            className={styles.input}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          CREATE TASK
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
