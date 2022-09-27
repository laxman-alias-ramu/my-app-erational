"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var typeorm_1 = require("typeorm");
var product_1 = require("./entity/product");
var complaint_1 = require("./entity/complaint");
var amqp = require("amqplib/callback_api");
(0, typeorm_1.createConnection)().then(function (db) {
    var app = express();
    app.use(cors());
    amqp.connect('amqp://localhost', function (error0, connection) {
        console.log("Creating AMQP Connection-1");
        if (error0) {
            console.log("amqp error");
            throw error0;
        }
        console.log("Creating AMQP Connection-2");
        connection.createChannel(function (error1, channel) {
            if (error1) {
                console.log("amqp error-2");
                process.on('beforeExit', function () {
                    console.log('closing');
                    connection.close();
                });
                connection.close();
                throw error1;
            }
            console.log("Creating AMQP Connection-3");
            var productRepository = db.getRepository(product_1.Product);
            var complaintRepository = db.getRepository(complaint_1.Complaint);
            //amqp://guest:guest@localhost:15672
            console.log("Creating DB Connection");
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
            app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, res.json({
                            "result": "success"
                        })];
                });
            }); });
            app.get('/api/products1', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var products;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, productRepository.find()];
                            case 1:
                                products = _a.sent();
                                console.log(products);
                                return [2 /*return*/, res.json(products)];
                        }
                    });
                });
            });
            app.get('/api/products', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var products;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("------------senthil-----------");
                                return [4 /*yield*/, productRepository.find()];
                            case 1:
                                products = _a.sent();
                                console.log(products);
                                return [2 /*return*/, res.json(products)];
                        }
                    });
                });
            });
            app.post('/api/products', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var product, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("Post Request");
                            console.log(req.body);
                            console.log(req.params);
                            return [4 /*yield*/, productRepository.create(req.body)];
                        case 1:
                            product = _a.sent();
                            console.log('product');
                            console.log(product);
                            return [4 /*yield*/, productRepository.save(product)];
                        case 2:
                            result = _a.sent();
                            console.log('result');
                            console.log(result);
                            channel.sendToQueue('product_created_1', Buffer.from(JSON.stringify(result)));
                            return [2 /*return*/, res.send(product)];
                    }
                });
            }); });
            app.post('/api/product', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var product, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("Post Request");
                            console.log("Post body");
                            console.log(req.body);
                            console.log("Post req params");
                            console.log(req.params);
                            console.log("Post req body");
                            console.log(req.body);
                            return [4 /*yield*/, productRepository.create(req.body)];
                        case 1:
                            product = _a.sent();
                            console.log('product');
                            console.log(product);
                            return [4 /*yield*/, productRepository.save(product)];
                        case 2:
                            result = _a.sent();
                            console.log('result');
                            console.log(result);
                            channel.sendToQueue('product_created_1', Buffer.from(JSON.stringify(result)));
                            return [2 /*return*/, res.send(product)];
                    }
                });
            }); });
            app.get('/api/products/:id', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var product;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(req.params['id']);
                                console.log(req.params.id);
                                return [4 /*yield*/, productRepository.findOne({
                                        where: { id: Number.parseInt(req.params.id), },
                                    })];
                            case 1:
                                product = _a.sent();
                                console.log(product);
                                return [2 /*return*/, res.json(product)];
                        }
                    });
                });
            });
            app.get('/api/product/:id', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var product;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(req.params['id']);
                                console.log(req.params.id);
                                return [4 /*yield*/, productRepository.findOne({
                                        where: { id: Number.parseInt(req.params.id), },
                                    })];
                            case 1:
                                product = _a.sent();
                                console.log(product);
                                return [2 /*return*/, res.json(product)];
                        }
                    });
                });
            });
            app.put('/api/products/:id', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var product, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, productRepository.findOne({
                                    where: { id: Number.parseInt(req.params.id), },
                                })];
                            case 1:
                                product = _a.sent();
                                productRepository.merge(product, req.body);
                                return [4 /*yield*/, productRepository.save(product)];
                            case 2:
                                result = _a.sent();
                                channel.sendToQueue('product_updated_1', Buffer.from(JSON.stringify(product)));
                                return [2 /*return*/, res.send(result)];
                        }
                    });
                });
            });
            app.delete('/api/products/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, productRepository.delete(req.params.id)];
                        case 1:
                            result = _a.sent();
                            channel.sendToQueue('product_deleted_1', Buffer.from(req.params.id));
                            return [2 /*return*/, res.send(result)];
                    }
                });
            }); });
            app.delete('/api/product/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, productRepository.delete(req.params.id)];
                        case 1:
                            result = _a.sent();
                            channel.sendToQueue('product_deleted_1', Buffer.from(req.params.id));
                            return [2 /*return*/, res.send(result)];
                    }
                });
            }); });
            app.post('/api/products/:id/like', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var product, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, productRepository.findOne({
                                    where: { id: Number.parseInt(req.params.id) }
                                })];
                            case 1:
                                product = _a.sent();
                                product.likes++;
                                return [4 /*yield*/, productRepository.save(product)];
                            case 2:
                                result = _a.sent();
                                channel.sendToQueue('product_updated_1', Buffer.from(JSON.stringify(product)));
                                return [2 /*return*/, res.send(result)];
                        }
                    });
                });
            });
            app.post('/api/product/:id/like', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var product, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, productRepository.findOne({
                                    where: { id: Number.parseInt(req.params.id) }
                                })];
                            case 1:
                                product = _a.sent();
                                product.likes++;
                                return [4 /*yield*/, productRepository.save(product)];
                            case 2:
                                result = _a.sent();
                                channel.sendToQueue('product_updated_1', Buffer.from(JSON.stringify(product)));
                                return [2 /*return*/, res.send(result)];
                        }
                    });
                });
            });
            app.get('/api/complaint', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var complaints;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("------------senthil-----------");
                                return [4 /*yield*/, complaintRepository.find()];
                            case 1:
                                complaints = _a.sent();
                                console.log(complaints);
                                return [2 /*return*/, res.json(complaints)];
                        }
                    });
                });
            });
            app.get('/api/complaints', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var complaints;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("------------senthil-----------");
                                return [4 /*yield*/, complaintRepository.find()];
                            case 1:
                                complaints = _a.sent();
                                console.log(complaints);
                                return [2 /*return*/, res.json(complaints)];
                        }
                    });
                });
            });
            app.get('/api/complaints_today', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var complaints;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("------------senthil-----------");
                                return [4 /*yield*/, complaintRepository.find({
                                        where: { complaintDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), },
                                    })];
                            case 1:
                                complaints = _a.sent();
                                console.log(complaints);
                                return [2 /*return*/, res.json(complaints)];
                        }
                    });
                });
            });
            app.post('/api/complaints', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var complaints, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("Complaints Post Request");
                            console.log(req.body);
                            console.log(req.params);
                            return [4 /*yield*/, complaintRepository.create(req.body)];
                        case 1:
                            complaints = _a.sent();
                            console.log('complaints');
                            console.log(complaints);
                            return [4 /*yield*/, complaintRepository.save(complaints)];
                        case 2:
                            result = _a.sent();
                            console.log('result');
                            console.log(result);
                            channel.sendToQueue('complaints_created_1', Buffer.from(JSON.stringify(result)));
                            return [2 /*return*/, res.send(complaints)];
                    }
                });
            }); });
            app.post('/api/complaint', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var complaint, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("Complaint Post Request");
                            console.log("Post body");
                            console.log(req.body);
                            console.log("Post req params");
                            console.log(req.params);
                            console.log("Post req body");
                            console.log(req.body);
                            return [4 /*yield*/, complaintRepository.create(req.body)];
                        case 1:
                            complaint = _a.sent();
                            console.log('complaint');
                            console.log(complaint);
                            return [4 /*yield*/, complaintRepository.save(complaint)];
                        case 2:
                            result = _a.sent();
                            console.log('result');
                            console.log(result);
                            channel.sendToQueue('complaint_created_1', Buffer.from(JSON.stringify(result)));
                            return [2 /*return*/, res.send(complaint)];
                    }
                });
            }); });
            app.get('/api/complaints/:id', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var complaint;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(req.params['id']);
                                console.log(req.params.id);
                                return [4 /*yield*/, complaintRepository.findOne({
                                        where: { id: Number.parseInt(req.params.id), },
                                    })];
                            case 1:
                                complaint = _a.sent();
                                console.log(complaint);
                                return [2 /*return*/, res.json(complaint)];
                        }
                    });
                });
            });
            app.get('/api/complaint/:id', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var complaint;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(req.params['id']);
                                console.log(req.params.id);
                                return [4 /*yield*/, complaintRepository.findOne({
                                        where: { id: Number.parseInt(req.params.id), },
                                    })];
                            case 1:
                                complaint = _a.sent();
                                console.log(complaint);
                                return [2 /*return*/, res.json(complaint)];
                        }
                    });
                });
            });
            app.put('/api/complaints/:id', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var complaint, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, complaintRepository.findOne({
                                    where: { id: Number.parseInt(req.params.id), },
                                })];
                            case 1:
                                complaint = _a.sent();
                                complaintRepository.merge(complaint, req.body);
                                return [4 /*yield*/, complaintRepository.save(complaint)];
                            case 2:
                                result = _a.sent();
                                channel.sendToQueue('complaint_updated_1', Buffer.from(JSON.stringify(complaint)));
                                return [2 /*return*/, res.send(result)];
                        }
                    });
                });
            });
            app.put('/api/complaint/:id', function (req, res) {
                return __awaiter(this, void 0, void 0, function () {
                    var complaint, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, complaintRepository.findOne({
                                    where: { id: Number.parseInt(req.params.id), },
                                })];
                            case 1:
                                complaint = _a.sent();
                                complaintRepository.merge(complaint, req.body);
                                return [4 /*yield*/, complaintRepository.save(complaint)];
                            case 2:
                                result = _a.sent();
                                channel.sendToQueue('complaint_updated_1', Buffer.from(JSON.stringify(complaint)));
                                return [2 /*return*/, res.send(result)];
                        }
                    });
                });
            });
            app.delete('/api/complaints/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, complaintRepository.delete(req.params.id)];
                        case 1:
                            result = _a.sent();
                            channel.sendToQueue('complaint_deleted_1', Buffer.from(req.params.id));
                            return [2 /*return*/, res.send(result)];
                    }
                });
            }); });
            app.delete('/api/complaint/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, complaintRepository.delete(req.params.id)];
                        case 1:
                            result = _a.sent();
                            channel.sendToQueue('complaint_deleted_1', Buffer.from(req.params.id));
                            return [2 /*return*/, res.send(result)];
                    }
                });
            }); });
            app.use(cors());
            console.log("listening on 3322");
            app.listen(3322);
            process.on('beforeExit', function () {
                console.log('closing');
                connection.close();
            });
        });
    });
});
