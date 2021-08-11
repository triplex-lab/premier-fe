import React, { useEffect, useState } from "react";
import s from "./Notification.module.css";

export default function Notification({ message = "", cleanMsg }) {
  const [visible, setvisible] = useState(false);
  useEffect(() => {
    if (message !== "") {
      setvisible(true);
      setTimeout(() => {
        cleanMsg();
        setvisible(false);
      }, 2000);
    }
  }, [message]);
  return <>{visible && <p className={s.root}>{message}</p>}</>;
}
