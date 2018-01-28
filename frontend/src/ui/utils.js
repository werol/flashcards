import {OFFLINE, ONLINE} from "./constants/constants";

export const getStrategy = () => window.navigator.onLine ? ONLINE : OFFLINE;
