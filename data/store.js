import { createStore, persist } from "easy-peasy";
import vox from "./voxStore";
export const store = createStore(persist({ vox }));
