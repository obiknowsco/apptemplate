/* GLOBAL STORAGE DRIVER  */
import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";

const storage = new Storage({
  // max capacity
  size: 1000,
  
  // backend for persistence
  storageBackend: AsyncStorage,

  // data expire time (def. 1day = (1000ms * 3600 * 24))
  // or null for never
  defaultExpires: null,


})

// make it a global variable callable by global.storage
global.storage = storage;