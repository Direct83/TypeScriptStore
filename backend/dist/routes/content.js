var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import express from 'express';
var router = express.Router();
var makeid = function (length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    return __spreadArray([], Array(length)).map(function (_) { return characters.charAt(Math.floor(Math.random() * charactersLength)); }).join('');
};
router.get('/text', function (req, res) {
    setTimeout(function () { return res.json({ text: "Текст с сервера: " + makeid(20) }); }, 3000);
});
export default router;
