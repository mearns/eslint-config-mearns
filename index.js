import base from "./base.js";
import typescript from "./typescript.js";
import jest from "./jest.js";
import jestAdjacent from "./jest-adjacent.js";

export default {
    configs: {
        jest,
        jestAdjacent,
        recommended: base,
        typescript,
    },
};
