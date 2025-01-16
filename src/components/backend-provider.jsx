import { createContext, useEffect, useState } from "react";
import { webSocket } from "rxjs/webSocket";
import { useStore } from "../store/main";

const BackendContext = createContext();

export function BackendProvider({ url, children }) {
  const [socket, setSocket] = useState(null);
  const dispatch = useStore((state) => state.dispatch);

  useEffect(() => {
    if (url) {
      const s = webSocket({
        url,
        serializer(val) {
          return JSON.stringify(val);
        },
        deserializer(e) {
          return JSON.parse(e.data);
        },
      });

      s.subscribe({
        next(action) {
          console.log("received action", action);
          dispatch(action);
        },
        error(err) {
          console.log("backend error", err);
        },
        complete() {
          console.log("backend socket has been closed");
        },
      });

      setSocket(s);

      return function () {
        if (socket) {
          socket.complete();
        }
      };
    }
  }, [url]);

  return (
    <BackendContext.Provider value={{ socket, dispatch }}>
      {children}
    </BackendContext.Provider>
  );
}
