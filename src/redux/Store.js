import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cartReducer from "../redux/CartSlice";
import productReducer from "../redux/ProductSlice";
import previewProductsReducer from "../redux/PreviewSlice";
import addressReducer from "./AddressSlice";
import authenticationReducer from "./AuthenticationSlice";
import newOrderReducer from "./NewOrderSlice"

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productReducer,
    previewProducts: previewProductsReducer,
    address: addressReducer,
    authentication: authenticationReducer,
    newOrder: newOrderReducer,
  });

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['previewProducts'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);