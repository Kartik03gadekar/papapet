// "use client";

// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./store";

// export default function ReduxProvider({ children }) {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }

"use client";

import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { useEffect, useRef } from "react";
import { checkUser } from "./Action/auth";

// ✅ This runs checkUser once Redux is available
function InitAuth() {
  const dispatch = useDispatch();
  const ran = useRef(false);

  useEffect(() => {
    if (!ran.current) {
      dispatch(checkUser());
      ran.current = true;
    }
  }, [dispatch]);

  return null;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InitAuth />
        {children}
      </PersistGate>
    </Provider>
  );
}
