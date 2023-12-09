"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
const port = 3130;
settings_1.app.listen(port, () => {
    console.log("listen on port 3130 update");
});
