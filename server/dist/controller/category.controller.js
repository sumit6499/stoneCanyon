"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCat = void 0;
const postCat = (req, res) => {
    const { cat } = req.body;
    //set value of db to cat
    res.json({
        sucess: true,
        cat: cat,
        msg: "catgory fetched successfully"
    });
};
exports.postCat = postCat;
//# sourceMappingURL=category.controller.js.map