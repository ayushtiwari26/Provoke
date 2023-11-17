import axios from "axios";
import { useEffect, useState } from "preact/hooks";
import React from "react";
const ReminderList = ({ reminders, setIsEdit }) => {
  const deleteReminder = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:3000/reminder/delete/${id}`
    );
    if (data) {
      window.location.reload();
    }
  };

  return <>hello</>;
};
const ReminderForm = ({ addReminder, isEdit, setIsEdit }) => {
  const [title, setTitle] = useState(isEdit ? isEdit.title : "");
  const [description, setDescription] = useState(
    isEdit ? isEdit.description : ""
  );
  const [status, setStatus] = useState(isEdit ? isEdit.isActivated : false);
  const [at, setAt] = useState(
    isEdit ? isEdit.date : new Date().toDateString()
  );

  const submitForm = (e) => {
    e.preventDefault();
    if (isEdit) {
      addReminder({ title, description, status, at, isEdit });
    } else {
      addReminder({ title, description, status, at });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2">
          <h1 className="text-2xl font-bold mb-5 text-center">Add Reminder</h1>
          <div>
            <div>
              <label className="block mb-2 text-sm font-bold">Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                value={title}
                className="w-full p-2 mb-6 text-sm border-b-2 border-gray-400 outline-none focus:bg-gray-300"
                placeholder="Enter a Title"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold">
                Description
              </label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                value={description}
                className="w-full p-2 mb-6 text-sm border-b-2 border-gray-400 outline-none focus:bg-gray-300"
                placeholder="Enter a Description"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold">Status</label>
              <input
                onChange={(e) => setStatus(e.target.value)}
                type="checkbox"
                value={status}
                checked={status}
                className="w-full  p-2 mb-6 text-sm border-b-2 border-gray-400 outline-none focus:bg-gray-300"
                placeholder="Enter a Status"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold">At</label>
              <input
                onChange={(e) => setAt(e.target.value)}
                type="datetime-local"
                value={new Date(at).toISOString().slice(0, 16)}
                className="w-full p-2 mb-6 text-sm border-b-2 border-gray-400 outline-none focus:bg-gray-300"
                placeholder="Enter a At"
              />
            </div>
            <div>
              <button
                onClick={submitForm}
                className="w-full bg-blue-400 text-white font-bold py-2 px-4 mb-6 rounded hover:bg-blue-500"
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [isReminderFormOpen, setIsReminderFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const fetchReminders = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/reminder/get/${
        JSON.parse(localStorage.getItem("user"))._id
      }`
    );
    setReminders(data);
  };
  const addReminder = async ({
    title,
    description,
    status,
    at,
    isEdit = false,
  }) => {
    if (isEdit) {
      const { data } = await axios.put(
        "http://localhost:3000/reminder/update/" + isEdit._id,
        {
          title,
          description,
          status,
          user: JSON.parse(localStorage.getItem("user"))._id,
          date: at,
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
          date: at,
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
  return (
    <div className="max-w-full mx-auto p-4 bg-black h-[100vh] ">
      <div className="flex flex-row justify-between text-white">
        <p className="font-bold">
          Hello {JSON.parse(localStorage.getItem("user")).email}
        </p>
        <p className="font bold">Today's Date is {new Date().toString()}</p>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
        >
          Log Out
        </button>
      </div>

      <div className="w-[100%] flex flex-row justify-between my-5">
        <h1 className="text-3xl font-bold mb-4 text-white">Reminders</h1>
        <button
          onClick={() => setIsReminderFormOpen(!isReminderFormOpen)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isReminderFormOpen ? "Close Reminder Form" : "Add Reminder"}
        </button>
      </div>

      {(isReminderFormOpen || isEdit) && (
        <ReminderForm
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          addReminder={addReminder}
        />
      )}
      <ReminderList setIsEdit={setIsEdit} reminders={reminders} />
    </div>
  );
}
