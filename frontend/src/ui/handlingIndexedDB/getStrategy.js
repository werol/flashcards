import {OfflineStrategy} from "./OfflineStrategy";
import {OnlineStrategy} from "./OnlineStrategy";

export const getStrategy = () => window.navigator.onLine ? new OnlineStrategy : new OfflineStrategy;
