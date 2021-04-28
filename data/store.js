import { createStore, persist } from "easy-peasy";
import vox from "./voxStore";
import rox from "./roxStore";
export const store = createStore(persist({ vox }), {
  mergeStrategy: "mergeShallow",
});

export const store0 = createStore(persist({ rox }), {
  mergeStrategy: "mergeShallow",
});
