"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerGlobal = loggerGlobal;
function loggerGlobal(req, res, next) {
    const timestamp = new Date().toLocaleString();
    console.log(`Estas ejecutando un método ${req.method} en la ruta ${req.url} y en la fecha y hora ${timestamp}`);
    next();
}
//# sourceMappingURL=globalLogger.middleware.js.map