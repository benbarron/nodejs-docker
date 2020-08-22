"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePassword = void 0;
// const removePasswordFromUser = (data: any) => {
//     if (Array.isArray(data)) {
//         for (let i = 0; i < data.length; i++) {
//             data[i] = removePasswordFromUser(data[i])
//         }
//     }
//     /**/
//     else if (typeof data === 'object') {
//         for (const key of Object.keys(data)) {
//             data[key] = removePasswordFromUser(data[key]);
//         }
//     }
//     /**/
//     else {
//         return data;
//     }
// }
const replacer = (key, value) => {
    if (key === 'password')
        return undefined;
    else
        return value;
};
const newJsonFunction = function (obj) {
    // @ts-ignore
    //
    var app = this.app;
    var escape = app.get('json escape');
    var replacer = app.get('json replacer');
    var spaces = app.get('json spaces');
    // @ts-ignore
    var body = JSON.stringify(obj, replacer, spaces, escape);
    // @ts-ignore
    if (!this.get('Content-Type')) {
        // @ts-ignore
        this.set('Content-Type', 'application/json');
    }
    // @ts-ignore
    return this.send(body);
};
exports.removePassword = function (request, response, next) {
    response.json = newJsonFunction;
    next();
};
