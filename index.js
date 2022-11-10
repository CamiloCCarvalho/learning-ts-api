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
var listUser = [];
function getUserGithub(name) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.github.com/users/".concat(name))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    newUser = {
                        id: data["id"],
                        login: data["login"],
                        name: data["name"],
                        bio: data["bio"],
                        public_repos: data["public_repos"],
                        repos_url: data["repos_url"]
                    };
                    listUser.push(newUser);
                    console.log(" Novo Usuario add com sucesso:  ".concat(newUser));
                    return [2 /*return*/];
            }
        });
    });
}
function getUserInfo(name) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserGithub(name)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fetch("https://api.github.com/users/".concat(name, "/repos"))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log(data);
                    listUser.forEach(function (element, index) {
                        if (element.name == name) {
                            var list = {
                                nameRepo: data.name,
                                fork: data.fork,
                                description: data.description,
                                isPrivate: data.private,
                                stargazers_count: data.stargazers_count
                            };
                            listUser[index].reposList.push(list);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function showUsers() {
    var listStringUsers = '';
    listUser.forEach(function (element) {
        listStringUsers += "".concat(element.name, " | ");
    });
    console.log("Lista de Usuarios total: ".concat(listStringUsers));
}
function getTotalRepos() {
    var totalRepos = 0;
    listUser.forEach(function (element) {
        totalRepos += element.public_repos;
    });
    console.log("Numero total de REPOS: ".concat(totalRepos));
}
function showTopFive() {
    listUser.sort(function (firstItem, secondItem) {
        if (secondItem.reposList > firstItem.reposList) {
            return 1;
        }
        if (secondItem.reposList < firstItem.reposList) {
            return -1;
        }
        return 0;
    });
    var topFive = {
        first: [listUser[0].name, listUser[0].public_repos],
        second: [listUser[1].name, listUser[1].public_repos],
        third: [listUser[2].name, listUser[2].public_repos],
        fourth: [listUser[3].name, listUser[3].public_repos],
        fifth: [listUser[4].name, listUser[4].public_repos]
    };
    console.log("Lista do TOPFIVE:\n \n                 Name(1): ".concat(topFive.first[0], " NumberRepos: ").concat(topFive.first[1], "\n\n                 Name(2): ").concat(topFive.second[0], " NumberRepos: ").concat(topFive.second[1], "\n\n                 Name(3): ").concat(topFive.third[0], " NumberRepos: ").concat(topFive.third[1], "\n\n                 Name(4): ").concat(topFive.fourth[0], " NumberRepos: ").concat(topFive.fourth[1], "\n\n                 Name(5): ").concat(topFive.fifth[0], " NumberRepos: ").concat(topFive.fifth[1], "\n"));
}
function exec() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserInfo("camiloccarvalho")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getUserInfo("Kwynto")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, getUserInfo("dirambora")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, getUserInfo("jonangeles-sanchez")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, getUserInfo("david-kariuki")];
                case 5:
                    _a.sent();
                    showUsers();
                    showTopFive();
                    getTotalRepos();
                    return [2 /*return*/];
            }
        });
    });
}
