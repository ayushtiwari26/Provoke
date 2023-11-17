import { useEffect, useState } from "preact/hooks";
import "./app.css";
import Login from "./pages/authentication/login";
import Reminders from "./pages/home/reminders";
import Reminder from "./pages/home/Reminder";
import Plans from "./pages/home/Plans";

export function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    let localUser = localStorage.getItem("user");
    if (localUser) {
      setIsUserLoggedIn(true);
    }
  }, []);
  return isUserLoggedIn ? <Plans /> : <Login />;
}
