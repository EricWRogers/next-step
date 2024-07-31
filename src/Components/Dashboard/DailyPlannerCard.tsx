import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import './DailyPlannerCard.css';
import useWindowDimensions from '../../WindowHelper';
import { RecordModel } from 'pocketbase';
import { pocketBase } from '../../PocketbaseConfig';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface DailyPlannerCardProps { }

interface TaskItem {
  id: string;
  user_id: string;
  title: string;
  type: string;
  complete: boolean;
}

const DailyPlannerCard: React.FC<DailyPlannerCardProps> = ({ }) => {
  const { height, width } = useWindowDimensions();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const getTaskData = async (user_id: string): Promise<TaskItem[]> => {
    const url = `http://localhost:8080/tasks?user_id=${user_id}`;

    const response = await fetch(url);
    if (!response.ok) {
      return [];
    }

    const data: TaskItem[] = await response.json();
    return data;
  };

  const updateTaskCompletion = async (task_id: string, user_id: string, complete: boolean) => {
    const url = `http://localhost:8080/complete_tasks?id=${task_id}&user_id=${user_id}&complete=${complete}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to update task completion');
      return;
    }

    const data: TaskItem[] = await response.json();
    setTasks(data);
  };

  const addUserDefinedTask = async (user_id: string, title: string) => {
    const url = `http://localhost:8080/add_user_defined_tasks?user_id=${user_id}&title=${title}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to add user-defined task');
      return;
    }

    const data: TaskItem[] = await response.json();
    setTasks(data);
  };

  const clearCompletedTask = async (user_id: string) => {
    const url = `http://localhost:8080/clear_completed_tasks?user_id=${user_id}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to clear completed tasks');
      return;
    }

    const data: TaskItem[] = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = pocketBase.authStore.model as RecordModel;
        const tasksData = await getTaskData(loggedInUser.id);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs only once

  const handleCheckboxChange = (task: TaskItem) => {
    updateTaskCompletion(task.id, task.user_id, !task.complete);
  };

  const handleClearCompletedTask = () => {
    const loggedInUser = pocketBase.authStore.model as RecordModel;
    clearCompletedTask(loggedInUser.id);
  };

  const handleAddTask = () => {
    const loggedInUser = pocketBase.authStore.model as RecordModel;
    addUserDefinedTask(loggedInUser.id, newTaskTitle);
    setNewTaskTitle('');
  };

  const handleNewTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  return (
    <div className="daily-planner-card">
      <h2>Daily Planner</h2>
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <input
                type="checkbox"
                id={`task-${task.id}`}
                checked={task.complete}
                onChange={() => handleCheckboxChange(task)}
              />
              <label htmlFor={`task-${task.id}`} className={task.complete ? "completed" : ""}> {task.title} </label>
            </li>
          ))}
        </ul>

        <div className="task-input">
          <input
            placeholder="New Task Title"
            value={newTaskTitle}
            onChange={handleNewTaskTitleChange}
          />
          <button onClick={handleAddTask} className="add-task-button">
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <button onClick={handleClearCompletedTask} className="clear-completed-button">
          <i className="fas fa-trash-alt"></i> Clear Completed
        </button>
      </div>
    </div>
  );
};

export default DailyPlannerCard;
