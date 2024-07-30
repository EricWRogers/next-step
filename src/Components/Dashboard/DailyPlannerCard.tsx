import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DailyPlannerCard.css';
import useWindowDimensions from '../../WindowHelper';
import { RecordModel } from 'pocketbase';
import { pocketBase } from '../../PocketbaseConfig';

interface DailyPlannerCardProps {}

interface TaskItem {
  id: string;
  user_id: string;
  title: string;
  type: string;
  complete: boolean;
}

const DailyPlannerCard: React.FC<DailyPlannerCardProps> = ({ }) => {
  const { user_id } = useParams();
  const { height, width } = useWindowDimensions();
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const getTaskData = async (user_id: string): Promise<TaskItem[]> => {
    const url = `http://localhost:8080/tasks?user_id=${user_id}`;

    console.log(url);

    const response = await fetch(url);
    if (!response.ok) {
      // If there is an error, return an empty array
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

    const updatedTasks = await getTaskData(user_id);
    setTasks(updatedTasks);
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

  if (width > 1260) {
    return (
      <div className="daily-planner-card">
        <h2>Daily Planner</h2>
        <div>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <input 
                  type="checkbox" 
                  id={`task-${task.id}`} 
                  checked={task.complete} 
                  onChange={() => handleCheckboxChange(task)} 
                />
                <label htmlFor={`task-${task.id}`}> {task.title} </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="daily-planner-card-horizanal">
        <h2>Daily Planner</h2>
        <div>
          <ul>
            {tasks.map((task) => (
              <React.Fragment key={task.id}>
                <input 
                  type="checkbox" 
                  id={`task-${task.id}`} 
                  checked={task.complete} 
                  onChange={() => handleCheckboxChange(task)} 
                />
                <label htmlFor={`task-${task.id}`}> {task.title} </label>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default DailyPlannerCard;