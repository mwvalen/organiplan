import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducers/rootReducer'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export let store = createStore(persistedReducer)
export let persistor = persistStore(store)

//export default { store, persistor }


