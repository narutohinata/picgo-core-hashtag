"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
module.exports = (ctx) => {
    const register = () => {
        ctx.helper.beforeUploadPlugins.register('picgo-core-unique_file', {
            handle(ctx) {
                ctx.output.map(output => {
                    const hash = crypto_1.createHash('sha256');
                    hash.update(output.buffer);
                    let hashTag = hash.digest('hex');
                    if (output.fileName) {
                        let extName = path_1.default.extname(output.fileName);
                        let baseName = path_1.default.basename(output.fileName, extName);
                        output.fileName = `${baseName}-${hashTag}${extName}`;
                    }
                });
            }
        });
    };
    return {
        register
    };
};
