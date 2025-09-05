// import { configureStore } from "@reduxjs/toolkit";
// import auth from "./Reducer/auth";
// import others from "./Reducer/others";
// import cart from "./slices/cartSlices";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // uses localStorage

// const cartPersistConfig = {
//   key: "cart",
//   storage,
// };

// const authPersistConfig = {
//   key: "auth",
//   storage,
// };

// const persistedCartReducer = persistReducer(cartPersistConfig, cart);
// const persistedAuthReducer = persistReducer(authPersistConfig, auth);

// export const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer, // 👈 persist auth
//     others,
//     cart: persistedCartReducer, // 👈 persist cart
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
//   devTools: process.env.NODE_ENV !== "production",
// });

// export const persistor = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";
// import auth from "./Reducer/auth";
// import others from "./Reducer/others";
// import cart from "./slices/cartSlices";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // uses localStorage

// const cartPersistConfig = {
//   key: "cart",
//   storage,
// };

// const authPersistConfig = {
//   key: "auth",
//   storage,
// };

// const persistedCartReducer = persistReducer(cartPersistConfig, cart);
// const persistedAuthReducer = persistReducer(authPersistConfig, auth);

// export const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer, // 👈 persist auth
//     others,
//     cart: persistedCartReducer, // 👈 persist cart
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
//   devTools: process.env.NODE_ENV !== "production",
// });

// export const persistor = persistStore(store);



import { configureStore } from "@reduxjs/toolkit";
import auth from "./Reducer/auth";
import others from "./Reducer/others";
import cart from "./slices/cartSlices";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage

const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cart);

export const store = configureStore({
  reducer: {
    auth,
    others,
    cart: persistedCartReducer, // 👈 persist cart
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);