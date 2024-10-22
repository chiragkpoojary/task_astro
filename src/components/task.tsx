import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@headlessui/react";
import axios from "axios";
import { FaArrowRightToBracket } from "react-icons/fa6";
interface Task {
  _id: {
    $oid: string;
  };
  task: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskValue, setEditTaskValue] = useState("");
  const [edit, setedit] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
     
      try {
        let token = sessionStorage.getItem("jwt");
        if(token)
        token = token.replace(/^"|"$/g, '');
      else{
        window.location.href = "/";
        return
      }
        const response = await axios.get("http://localhost:8080/tasks", {
          headers: {
            Authorization:  `Bearer ${token}`, 
          },
        });

        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);

      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      let token = sessionStorage.getItem("jwt");
      if(token)
        token = token.replace(/^"|"$/g, '');
      else{
        window.location.href = "/";
        return;
      }
      const res= await axios.post("http://localhost:8080/addtask", {
        task: newTask,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
      setNewTask(" ");
     
      const response = await axios.get("http://localhost:8080/tasks", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEdit = (task: Task) => {
    const objectId = task._id["$oid"];

    setEditingTaskId(objectId);
    setedit(true);

    setEditTaskValue(task.task);
  };
  const handleDelete = async (task: Task) => {
    try {
      let token = sessionStorage.getItem("jwt");
      if(token)
      token = token.replace(/^"|"$/g, '');
      const objectId = task._id["$oid"];

      const del = await axios.delete(
        `http://localhost:8080/delete/${objectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        },
      );

   
      const response = await axios.get("http://localhost:8080/tasks", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (edit) {
      try {
        let token = sessionStorage.getItem("jwt");
        if(token)
        token = token.replace(/^"|"$/g, '');
        await axios.put(`http://localhost:8080/edit/${editingTaskId}`, {
          task: editTaskValue,

        },{
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setEditingTaskId(null);
        setEditTaskValue("");
        setedit(false);
       
        const response = await axios.get("http://localhost:8080/tasks", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error saving task:", error);
      }
    }
  };

  const indexOfLastTask = currentPage * rowsPerPage;
  const indexOfFirstTask = indexOfLastTask - rowsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / rowsPerPage);
function handleLogout(){
sessionStorage.removeItem("jwt");
window.location.href="/"
}
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
<div className="flex justify-between items-center mb-6">
  <div>
    <h1 className="text-2xl font-bold">Welcome back!</h1>
    <p className="text-gray-400">Here's a list of your tasks</p>
  </div>
  <Button onClick={handleLogout} className="bg-red-400 text-white px-4 py-2 rounded-md flex text-center justify-center items-center gap-2 ">
  <FaArrowRightToBracket /> Logout
  </Button>
</div>
      <div className="relative w-full max-w-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
        >
          <input
            type="text"
            placeholder="Add tasks..."
            className="bg-gray-800 text-white p-4 pr-16 rounded w-full"
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 py-1 px-3 text-sm font-semibold text-white rounded-md shadow-inner focus:outline-none hover:bg-gray-600 w-20 h-10"
          >
            Add
          </Button>
        </form>
      </div>

      <table className="w-full mt-5">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="py-2 text-3xl" style={{ width: "70%" }}>
              Task
            </th>
            <th style={{ width: "10%", textAlign: "left" }}>Edit</th>
            <th style={{ width: "35%", textAlign: "left" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="border-t border-gray-800">
              <td className="py-3">
                <div className="flex items-center space-x-2">
                  <div className="font-medium text-xl">{task.task}</div>
                  <div className="text-sm text-gray-400"></div>
                </div>
              </td>

              <td className="">
                <div className="flex justify-start ml-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-blue-500"
                  >
                    <Pencil size={20} />
                  </button>
                </div>
              </td>
              <td className="">
                <div className="flex justify-start ml-5">
                  <button
                    onClick={() => handleDelete(task)}
                    className="text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
        <div>{tasks.length} task(s) total</div>
        <div className="flex items-center space-x-2">
          <span>Rows per page</span>
          <select
            className="bg-gray-800 rounded p-1"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex space-x-1">
            <button
              className="bg-gray-800 p-1 rounded"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              &lt;&lt;
            </button>
            <button
              className="bg-gray-800 p-1 rounded"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <button
              className="bg-gray-800 p-1 rounded"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
            <button
              className="bg-gray-800 p-1 rounded"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
      {edit && setEditingTaskId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleSave}
            className="bg-gray-800 p-6 rounded-lg w-full max-w-3xl min-h-64"
          >
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="task">
                Task
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12"
                id="task"
                type="text"
                value={editTaskValue}
                onChange={(e) => setEditTaskValue(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
                type="submit"
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
                type="button"
                onClick={() => {
                  setEditingTaskId(null);
                  setEditTaskValue("");
                  setedit(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskList;
