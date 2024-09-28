"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCat = void 0;
const postCat = (req, res) => {
    try {
        const { cat } = req.body;
        //set cat to db
        res.json({
            sucess: true,
            cat: cat,
            msg: "catgory fetched successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            success: true,
            error: error,
            msg: "Internal Server error"
        });
    }
};
exports.postCat = postCat;
//# sourceMappingURL=category.controller.js.map