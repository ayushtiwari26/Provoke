import axios from "axios";
import { useEffect, useState } from "preact/hooks";
import React from "react";
const AddReminderModal = ({
  open,
  setIsOpen,
  addReminder,
  isEdit,
  setIsEdit,
}) => {
  const [data, setData] = useState({});
  const handleDataChange = (e) => {
    if (isEdit) {
      setIsEdit({ ...isEdit, [e.target.name]: e.target.value });
      return;
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (!open && !isEdit) return null;
  return <>Hello</>;
};
export default function Reminder() {
  const [reminders, setReminders] = useState([]);
  const [isReminderFormOpen, setIsReminderFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const deleteReminder = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:3000/reminder/delete/${id}`
    );
    if (data) {
      window.location.reload();
    }
  };
  const fetchReminders = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/reminder/get/${
        JSON.parse(localStorage.getItem("user"))._id
      }`
    );
    setReminders(data);
  };
  const addReminder = async ({ title, description, status, date }) => {
    if (isEdit) {
      const { data } = await axios.put(
        "http://localhost:3000/reminder/update/" + isEdit._id,
        {
          title: isEdit.title,
          description: isEdit.description,
          status: isEdit.status,
          user: JSON.parse(localStorage.getItem("user"))._id,
          date: isEdit.date,
        }
      );
      if (data) {
        window.location.reload();
      } else {
        window.alert("Something went wrong");
      }
    } else {
      const { data } = await axios.post(
        "http://localhost:3000/reminder/create",
        {
          title,
          description,
          status,
          user: JSON.parse(localStorage.getItem("user"))._id,
          date,
        }
      );
      if (data) {
        window.location.reload();
      } else {
        window.alert("Something went wrong");
      }
    }
  };
  useEffect(() => {
    fetchReminders();
  }, []);
  const makeNotification = (reminder) => {
    const now = new Date();
    const diff = new Date(reminder.date) - now;
    if (diff > 0) {
      setTimeout(() => {
        new Notification("Reminder for " + reminder.title);
      }, diff);
    }
  };
  const subscribeToNotifications = () => {
    if (Notification.permission === "granted") {
      reminders.forEach((reminder) => {
        makeNotification(reminder);
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          reminders.forEach((reminder) => {
            makeNotification(reminder);
          });
        }
      });
    }
  };

  useEffect(() => {
    subscribeToNotifications();
  }, [reminders]);
  return (
    <div className="flex-auto justify-center align-middle items-center">
      <AddReminderModal
        open={isReminderFormOpen}
        addReminder={addReminder}
        setIsOpen={setIsReminderFormOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <section className="bg-gray-50 h-screen dark:bg-gray-900 py-3 sm:py-5">
        <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h3>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Reminders
                  </span>
                </h3>
                <h3>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date().toLocaleString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </h3>
                <h3 className="text-lg text-red-500">
                  {JSON.parse(localStorage.getItem("user")).email}
                </h3>
              </div>
              <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <button
                  type="button"
                  onClick={() => setIsReminderFormOpen(true)}
                  data-modal-toggle="defaultModal"
                  id="defaultModalButton"
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add new reminder
                </button>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-primary-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Log out
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {/* <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th> */}
                    <th scope="col" className="px-4 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Time
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reminders.map((reminder) => (
                    <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      {/* <td className="w-4 px-4 py-3">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td> */}
                      <th
                        scope="row"
                        className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {reminder.title}
                      </th>

                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {reminder.description}
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {reminder.isActivated ? "Active" : "Inactive"}
                      </td>

                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {new Date().toLocaleString([], {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-2">
                        <a
                          onClick={() => setIsEdit(reminder)}
                          className="text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => deleteReminder(reminder._id)}
                          className="ml-2 text-red-600 hover:underline dark:text-red-500"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
