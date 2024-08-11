/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/canvas/game.ts":
/*!****************************!*\
  !*** ./src/canvas/game.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameCanvas: () => (/* binding */ GameCanvas)\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '../Canvas'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar GameCanvas = /** @class */ (function (_super) {\r\n    __extends(GameCanvas, _super);\r\n    function GameCanvas() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    GameCanvas.getCanvas = function () {\r\n        if (!this.canvas) {\r\n            GameCanvas.canvas = new GameCanvas('#gameCanvas');\r\n        }\r\n        return this.canvas;\r\n    };\r\n    GameCanvas.remove = function () {\r\n        GameCanvas.canvas.removeElement();\r\n        GameCanvas.canvas = undefined;\r\n    };\r\n    return GameCanvas;\r\n}(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '../Canvas'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\r\n\r\n\n\n//# sourceURL=webpack://brazilian-survivors/./src/canvas/game.ts?");

/***/ }),

/***/ "./src/indexV2.ts":
/*!************************!*\
  !*** ./src/indexV2.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   keyboardEventListener: () => (/* binding */ keyboardEventListener)\n/* harmony export */ });\n/* harmony import */ var _canvas_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas/game */ \"./src/canvas/game.ts\");\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './Clock'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './GameObjectList'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './GameRender'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _v2_Timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v2/Timer */ \"./src/v2/Timer.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\n\r\n\r\n\r\n\r\nvar clock;\r\nvar gameRender;\r\nvar gameObjects;\r\nvar timer;\r\nvar gameCanvas;\r\nvar player;\r\nfunction keyboardEventListener(e) {\r\n    if (e.key === 'p') {\r\n        if (gameRender.isPaused()) {\r\n            gameRender.resume();\r\n        }\r\n        else {\r\n            gameRender.pause();\r\n        }\r\n    }\r\n    if (e.key === 't') {\r\n        if (timer) {\r\n            console.log('Timer already set');\r\n        }\r\n        else {\r\n            timer = new _v2_Timer__WEBPACK_IMPORTED_MODULE_2__.Timer(clock, 1000);\r\n            timer\r\n                .on(_utils__WEBPACK_IMPORTED_MODULE_3__.Events.Timer_Started, function () {\r\n                console.log('On Timer_Started callback');\r\n            })\r\n                .on(_utils__WEBPACK_IMPORTED_MODULE_3__.Events.Timer_TimeoutFinished, function () {\r\n                console.log('On Timer_TimeoutFinished callback');\r\n                gameObjects.remove(timer);\r\n                timer = undefined;\r\n                gameRender.stop();\r\n            });\r\n            timer.start();\r\n            gameObjects.add(timer);\r\n        }\r\n    }\r\n}\r\nvar InputComponent = /** @class */ (function (_super) {\r\n    __extends(InputComponent, _super);\r\n    function InputComponent() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    InputComponent.prototype.update = function (_, params) {\r\n        throw Error('NYI');\r\n    };\r\n    InputComponent.prototype.enable = function () {\r\n        throw Error('NYI');\r\n    };\r\n    InputComponent.prototype.disable = function () {\r\n        throw Error('NYI');\r\n    };\r\n    return InputComponent;\r\n}(_utils__WEBPACK_IMPORTED_MODULE_3__.Observer));\r\nvar KeyboardInputComponent = /** @class */ (function (_super) {\r\n    __extends(KeyboardInputComponent, _super);\r\n    function KeyboardInputComponent() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    KeyboardInputComponent.prototype.enable = function () {\r\n        this.emit(_utils__WEBPACK_IMPORTED_MODULE_3__.Events.KeyboardInputComponent_Enabled);\r\n    };\r\n    KeyboardInputComponent.prototype.disable = function () {\r\n        this.emit(_utils__WEBPACK_IMPORTED_MODULE_3__.Events.KeyboardInputComponent_Disabled);\r\n    };\r\n    return KeyboardInputComponent;\r\n}(InputComponent));\r\nvar GameObject = /** @class */ (function (_super) {\r\n    __extends(GameObject, _super);\r\n    // public combatComponent: CombatComponent;\r\n    // public physicsComponent: PhysicsComponent;\r\n    // public graphicComponent: GraphicComponent;\r\n    // public colliderComponent: ColliderComponent;\r\n    // constructor(components: ObjectComponents, kind: GameObjectKind) {\r\n    function GameObject(components) {\r\n        var _this = _super.call(this) || this;\r\n        // this.kind = kind;\r\n        _this._inputComponent = components.input;\r\n        return _this;\r\n        // this.combatComponent = components.combat;\r\n        // this.physicsComponent = components.physics;\r\n        // this.graphicComponent = components.graphic;\r\n        // this.colliderComponent = components.collider;\r\n    }\r\n    GameObject.prototype.update = function (params) {\r\n        var _a;\r\n        (_a = this._inputComponent) === null || _a === void 0 ? void 0 : _a.update(this, params);\r\n        // this.combatComponent?.update(this, params);\r\n        // this.colliderComponent?.update(this, params);\r\n        // this.physicsComponent?.update(this, params);\r\n        // this.graphicComponent?.update(this, params);\r\n    };\r\n    return GameObject;\r\n}(_utils__WEBPACK_IMPORTED_MODULE_3__.Observer));\r\nvar PlayerInputComponent = /** @class */ (function (_super) {\r\n    __extends(PlayerInputComponent, _super);\r\n    function PlayerInputComponent(keyboardComponent) {\r\n        var _this = _super.call(this) || this;\r\n        _this.keyStates = {};\r\n        _this.nextVelocityDirection = _utils__WEBPACK_IMPORTED_MODULE_3__.Vector2D.zero();\r\n        _this.onKeyEventBound = _this.onKeyEvent.bind(_this);\r\n        keyboardComponent\r\n            .on(_utils__WEBPACK_IMPORTED_MODULE_3__.Events.KeyboardInputComponent_Enabled, function () {\r\n            console.log('On PlayerInputComponent KeyboardInputComponent_Enabled callback');\r\n            _this.enable();\r\n        })\r\n            .on(_utils__WEBPACK_IMPORTED_MODULE_3__.Events.KeyboardInputComponent_Disabled, function () {\r\n            console.log('On PlayerInputComponent KeyboardInputComponent_Disabled callback');\r\n            _this.disable();\r\n        });\r\n        return _this;\r\n    }\r\n    PlayerInputComponent.prototype.update = function (player) {\r\n    };\r\n    PlayerInputComponent.prototype.onKeyEvent = function (event) {\r\n        if (event.type === \"keydown\") {\r\n            this.handleInput(event.key, true);\r\n        }\r\n        else if (event.type === \"keyup\") {\r\n            this.handleInput(event.key, false);\r\n        }\r\n        else {\r\n            console.log(\"unknown key event type\", event);\r\n        }\r\n    };\r\n    PlayerInputComponent.prototype.resetKeyStates = function () {\r\n        this.keyStates = {};\r\n        this.nextVelocityDirection = _utils__WEBPACK_IMPORTED_MODULE_3__.Vector2D.zero();\r\n    };\r\n    PlayerInputComponent.prototype.enable = function () {\r\n        // Keyboard events\r\n        console.log('On enable');\r\n        window.addEventListener(\"keydown\", this.onKeyEventBound);\r\n        window.addEventListener(\"keyup\", this.onKeyEventBound);\r\n    };\r\n    PlayerInputComponent.prototype.disable = function () {\r\n        // Keyboard events\r\n        console.log('On disable');\r\n        window.removeEventListener(\"keydown\", this.onKeyEventBound);\r\n        window.removeEventListener(\"keyup\", this.onKeyEventBound);\r\n    };\r\n    PlayerInputComponent.prototype.handleInput = function (key, isPressed) {\r\n        if (this.isValidKey(key)) {\r\n            this.keyStates[key] = isPressed;\r\n            this.nextVelocityDirection = new _utils__WEBPACK_IMPORTED_MODULE_3__.Vector2D(this.keyStates['a'] ? -1 : this.keyStates['d'] ? 1 : 0, this.keyStates['w'] ? -1 : this.keyStates['s'] ? 1 : 0);\r\n            console.log(key, isPressed);\r\n        }\r\n    };\r\n    PlayerInputComponent.prototype.isValidKey = function (key) {\r\n        return ['w', 'a', 's', 'd'].includes(key);\r\n    };\r\n    return PlayerInputComponent;\r\n}(InputComponent));\r\nvar Player = /** @class */ (function (_super) {\r\n    __extends(Player, _super);\r\n    function Player(components) {\r\n        return _super.call(this, components) || this;\r\n    }\r\n    Player.createPlayer = function (ctx, keyboard) {\r\n        return new Player({\r\n            input: new PlayerInputComponent(keyboard)\r\n        });\r\n    };\r\n    return Player;\r\n}(GameObject));\r\nfunction init() {\r\n    clock = new Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './Clock'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n    gameObjects = new Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './GameObjectList'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n    gameCanvas = _canvas_game__WEBPACK_IMPORTED_MODULE_0__.GameCanvas.getCanvas();\r\n    var keyboardInputComponent = new KeyboardInputComponent();\r\n    player = Player.createPlayer(gameCanvas.ctx, keyboardInputComponent);\r\n    gameObjects.add(clock);\r\n    gameRender = Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './GameRender'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).create({ clock: clock, gameObjects: gameObjects, gameCanvas: gameCanvas });\r\n    gameRender.start();\r\n    var testTimer = new _v2_Timer__WEBPACK_IMPORTED_MODULE_2__.Timer(clock, 5000);\r\n    testTimer\r\n        .on(_utils__WEBPACK_IMPORTED_MODULE_3__.Events.Timer_Started, function () {\r\n        console.log('On Timer_Started callback');\r\n    })\r\n        .on(_utils__WEBPACK_IMPORTED_MODULE_3__.Events.Timer_TimeoutFinished, function () {\r\n        console.log('On Timer_TimeoutFinished callback');\r\n        gameObjects.remove(timer);\r\n        timer = undefined;\r\n        gameRender.stop();\r\n    });\r\n    testTimer.start();\r\n    gameObjects.add(testTimer);\r\n    keyboardInputComponent.enable();\r\n    var keyboardTimer = new _v2_Timer__WEBPACK_IMPORTED_MODULE_2__.Timer(clock, 2500);\r\n    keyboardTimer\r\n        .on(_utils__WEBPACK_IMPORTED_MODULE_3__.Events.Timer_TimeoutFinished, function () {\r\n        console.log('On keyboardTimer Timer_TimeoutFinished callback');\r\n        keyboardInputComponent.disable();\r\n        gameObjects.remove(keyboardTimer);\r\n    });\r\n    keyboardTimer.start();\r\n    gameObjects.add(keyboardTimer);\r\n}\r\ninit();\r\n\n\n//# sourceURL=webpack://brazilian-survivors/./src/indexV2.ts?");

/***/ }),

/***/ "./src/utils/browser.ts":
/*!******************************!*\
  !*** ./src/utils/browser.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CANVAS_SIZE: () => (/* binding */ CANVAS_SIZE),\n/* harmony export */   getCanvasSize: () => (/* binding */ getCanvasSize)\n/* harmony export */ });\nvar CANVAS_SIZE = 600;\r\nfunction getWindowSize() {\r\n    return {\r\n        width: window.innerWidth,\r\n        height: window.innerHeight\r\n    };\r\n}\r\nfunction getCanvasSize() {\r\n    var ws = getWindowSize();\r\n    // On small devices, the canvas should cover:\r\n    // - 80% of available height\r\n    // if (ws.height < CANVAS_SIZE / 0.8) {\r\n    //   ws.height = ws.height * 0.8;\r\n    // }\r\n    return {\r\n        width: ws.width,\r\n        // height: Math.min(CANVAS_SIZE, ws.height)\r\n        height: ws.height\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack://brazilian-survivors/./src/utils/browser.ts?");

/***/ }),

/***/ "./src/utils/game-object.ts":
/*!**********************************!*\
  !*** ./src/utils/game-object.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameObject: () => (/* binding */ GameObject),\n/* harmony export */   GameObjectKind: () => (/* binding */ GameObjectKind),\n/* harmony export */   ObjectDirection: () => (/* binding */ ObjectDirection)\n/* harmony export */ });\n/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observer */ \"./src/utils/observer.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n// The order in this enum matter as how the game process its objects,\r\n// so the player and its weapons needs to be updated before the enemies\r\nvar GameObjectKind;\r\n(function (GameObjectKind) {\r\n    // Global game objects\r\n    GameObjectKind[GameObjectKind[\"Game\"] = 1] = \"Game\";\r\n    GameObjectKind[GameObjectKind[\"World\"] = 2] = \"World\";\r\n    GameObjectKind[GameObjectKind[\"Camera\"] = 3] = \"Camera\";\r\n    GameObjectKind[GameObjectKind[\"SkillTree\"] = 4] = \"SkillTree\";\r\n    // Player objects\r\n    GameObjectKind[GameObjectKind[\"Player\"] = 5] = \"Player\";\r\n    GameObjectKind[GameObjectKind[\"MagicPistol\"] = 6] = \"MagicPistol\";\r\n    GameObjectKind[GameObjectKind[\"MagicPistolBullet\"] = 7] = \"MagicPistolBullet\";\r\n    // Collectables\r\n    GameObjectKind[GameObjectKind[\"Gem\"] = 8] = \"Gem\";\r\n    // Enemies objects\r\n    GameObjectKind[GameObjectKind[\"Triangle\"] = 9] = \"Triangle\";\r\n})(GameObjectKind || (GameObjectKind = {}));\r\nvar ObjectDirection;\r\n(function (ObjectDirection) {\r\n    ObjectDirection[ObjectDirection[\"Left\"] = 0] = \"Left\";\r\n    ObjectDirection[ObjectDirection[\"Right\"] = 1] = \"Right\";\r\n})(ObjectDirection || (ObjectDirection = {}));\r\nvar GameObject = /** @class */ (function (_super) {\r\n    __extends(GameObject, _super);\r\n    function GameObject(components, kind) {\r\n        var _this = _super.call(this) || this;\r\n        _this.kind = kind;\r\n        _this.inputComponent = components.input;\r\n        _this.combatComponent = components.combat;\r\n        _this.physicsComponent = components.physics;\r\n        _this.graphicComponent = components.graphic;\r\n        _this.colliderComponent = components.collider;\r\n        return _this;\r\n    }\r\n    GameObject.prototype.update = function (params) {\r\n        var _a, _b, _c, _d, _e;\r\n        if (!params.elapsedMs)\r\n            throw Error(\"Missing elapsedMs in update command of GameObject\");\r\n        (_a = this.inputComponent) === null || _a === void 0 ? void 0 : _a.update(this, params);\r\n        (_b = this.combatComponent) === null || _b === void 0 ? void 0 : _b.update(this, params);\r\n        (_c = this.colliderComponent) === null || _c === void 0 ? void 0 : _c.update(this, params);\r\n        (_d = this.physicsComponent) === null || _d === void 0 ? void 0 : _d.update(this, params);\r\n        (_e = this.graphicComponent) === null || _e === void 0 ? void 0 : _e.update(this, params);\r\n    };\r\n    GameObject.prototype.getPosition = function () {\r\n        if (!this.physicsComponent) {\r\n            throw Error(\"Missing physics component in \".concat(this.kind));\r\n        }\r\n        return this.physicsComponent.position;\r\n    };\r\n    return GameObject;\r\n}(_observer__WEBPACK_IMPORTED_MODULE_0__.Observer));\r\n\r\n\n\n//# sourceURL=webpack://brazilian-survivors/./src/utils/game-object.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CANVAS_SIZE: () => (/* reexport safe */ _browser__WEBPACK_IMPORTED_MODULE_3__.CANVAS_SIZE),\n/* harmony export */   Events: () => (/* reexport safe */ _observer__WEBPACK_IMPORTED_MODULE_2__.Events),\n/* harmony export */   GameObject: () => (/* reexport safe */ _game_object__WEBPACK_IMPORTED_MODULE_1__.GameObject),\n/* harmony export */   GameObjectKind: () => (/* reexport safe */ _game_object__WEBPACK_IMPORTED_MODULE_1__.GameObjectKind),\n/* harmony export */   IEvents: () => (/* reexport safe */ _observer__WEBPACK_IMPORTED_MODULE_2__.IEvents),\n/* harmony export */   ObjectDirection: () => (/* reexport safe */ _game_object__WEBPACK_IMPORTED_MODULE_1__.ObjectDirection),\n/* harmony export */   Observer: () => (/* reexport safe */ _observer__WEBPACK_IMPORTED_MODULE_2__.Observer),\n/* harmony export */   Vector2D: () => (/* reexport safe */ _vector2D__WEBPACK_IMPORTED_MODULE_0__.Vector2D),\n/* harmony export */   getCanvasSize: () => (/* reexport safe */ _browser__WEBPACK_IMPORTED_MODULE_3__.getCanvasSize)\n/* harmony export */ });\n/* harmony import */ var _vector2D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector2D */ \"./src/utils/vector2D.ts\");\n/* harmony import */ var _game_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-object */ \"./src/utils/game-object.ts\");\n/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./observer */ \"./src/utils/observer.ts\");\n/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./browser */ \"./src/utils/browser.ts\");\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://brazilian-survivors/./src/utils/index.ts?");

/***/ }),

/***/ "./src/utils/observer.ts":
/*!*******************************!*\
  !*** ./src/utils/observer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Events: () => (/* binding */ Events),\n/* harmony export */   IEvents: () => (/* binding */ IEvents),\n/* harmony export */   Observer: () => (/* binding */ Observer)\n/* harmony export */ });\nvar IEvents;\r\n(function (IEvents) {\r\n})(IEvents || (IEvents = {}));\r\n;\r\nvar Events;\r\n(function (Events) {\r\n    Events[Events[\"ObjectDead\"] = 1] = \"ObjectDead\";\r\n    Events[Events[\"ItemCollected\"] = 2] = \"ItemCollected\";\r\n    Events[Events[\"NextTimestamp\"] = 3] = \"NextTimestamp\";\r\n    Events[Events[\"DamageDone\"] = 4] = \"DamageDone\";\r\n    Events[Events[\"Timer_Started\"] = 5] = \"Timer_Started\";\r\n    Events[Events[\"Timer_TimeoutFinished\"] = 6] = \"Timer_TimeoutFinished\";\r\n    Events[Events[\"KeyboardInputComponent_Enabled\"] = 7] = \"KeyboardInputComponent_Enabled\";\r\n    Events[Events[\"KeyboardInputComponent_Disabled\"] = 8] = \"KeyboardInputComponent_Disabled\";\r\n})(Events || (Events = {}));\r\nvar Observer = /** @class */ (function () {\r\n    function Observer() {\r\n        this.cbsByEvent = new Map();\r\n    }\r\n    Observer.prototype.on = function (event, cb) {\r\n        var cbs = this.cbsByEvent.get(event);\r\n        if (cbs === undefined) {\r\n            cbs = [];\r\n            this.cbsByEvent.set(event, cbs);\r\n        }\r\n        cbs.push(cb);\r\n        return this;\r\n    };\r\n    Observer.prototype.emit = function (event, params) {\r\n        for (var _i = 0, _a = this.cbsByEvent.get(event) || []; _i < _a.length; _i++) {\r\n            var cb = _a[_i];\r\n            cb(params);\r\n        }\r\n    };\r\n    Observer.prototype.clear = function () {\r\n        this.cbsByEvent.clear();\r\n    };\r\n    return Observer;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://brazilian-survivors/./src/utils/observer.ts?");

/***/ }),

/***/ "./src/utils/vector2D.ts":
/*!*******************************!*\
  !*** ./src/utils/vector2D.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Vector2D: () => (/* binding */ Vector2D)\n/* harmony export */ });\nvar Vector2D = /** @class */ (function () {\r\n    function Vector2D(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    Vector2D.zero = function () {\r\n        return new Vector2D(0, 0);\r\n    };\r\n    Vector2D.prototype.modulo = function () {\r\n        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));\r\n    };\r\n    Vector2D.prototype.copy = function () {\r\n        return new Vector2D(this.x, this.y);\r\n    };\r\n    Vector2D.prototype.multiply = function (k) {\r\n        return new Vector2D(k * this.x, k * this.y);\r\n    };\r\n    Vector2D.prototype.unit = function () {\r\n        if (this.x === 0 && this.y === 0) {\r\n            return Vector2D.zero();\r\n        }\r\n        return this.multiply(1 / this.modulo());\r\n    };\r\n    Vector2D.prototype.add = function (v) {\r\n        return new Vector2D(this.x + v.x, this.y + v.y);\r\n    };\r\n    Vector2D.prototype.sub = function (v) {\r\n        return this.add(v.multiply(-1));\r\n    };\r\n    Vector2D.prototype.dot = function (v) {\r\n        return this.x + v.x + this.y * v.y;\r\n    };\r\n    Vector2D.prototype.projOver = function (v) {\r\n        return v.multiply(this.dot(v) / v.dot(v));\r\n    };\r\n    Vector2D.prototype.equals = function (v) {\r\n        return this.x === v.x && this.y === v.y;\r\n    };\r\n    Vector2D.prototype.equalsDirection = function (v) {\r\n        return this.unit().equals(v.unit());\r\n    };\r\n    Vector2D.prototype.isZero = function () {\r\n        return this.equals(Vector2D.zero());\r\n    };\r\n    return Vector2D;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://brazilian-survivors/./src/utils/vector2D.ts?");

/***/ }),

/***/ "./src/v2/Timer.ts":
/*!*************************!*\
  !*** ./src/v2/Timer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Timer: () => (/* binding */ Timer)\n/* harmony export */ });\n/* harmony import */ var _TimerState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimerState */ \"./src/v2/TimerState.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\nvar Timer = /** @class */ (function (_super) {\r\n    __extends(Timer, _super);\r\n    function Timer(clock, timeoutMs) {\r\n        var _this = _super.call(this) || this;\r\n        _this.clock = clock;\r\n        _this.timeoutMs = timeoutMs;\r\n        _this.state = _TimerState__WEBPACK_IMPORTED_MODULE_0__.TimerState.Idle;\r\n        return _this;\r\n    }\r\n    Timer.prototype.start = function () {\r\n        if (this.state !== _TimerState__WEBPACK_IMPORTED_MODULE_0__.TimerState.Idle) {\r\n            throw Error('Timer must be in Idle state to start.');\r\n        }\r\n        this.startedAt = this.clock.time();\r\n        this.state = _TimerState__WEBPACK_IMPORTED_MODULE_0__.TimerState.Running;\r\n        this.emit(_utils__WEBPACK_IMPORTED_MODULE_1__.Events.Timer_Started);\r\n        return this;\r\n    };\r\n    Timer.prototype.update = function (_) {\r\n        if (this.state === _TimerState__WEBPACK_IMPORTED_MODULE_0__.TimerState.Idle) {\r\n            throw Error('Timer must be started before run.');\r\n        }\r\n        if (this.state === _TimerState__WEBPACK_IMPORTED_MODULE_0__.TimerState.Finished) {\r\n            console.log('Timer finished');\r\n            return;\r\n        }\r\n        var elapsed = this.clock.time() - this.startedAt;\r\n        if (elapsed >= this.timeoutMs) {\r\n            console.log('Timer finished');\r\n            this.emit(_utils__WEBPACK_IMPORTED_MODULE_1__.Events.Timer_TimeoutFinished);\r\n            this.state = _TimerState__WEBPACK_IMPORTED_MODULE_0__.TimerState.Finished;\r\n        }\r\n    };\r\n    return Timer;\r\n}(_utils__WEBPACK_IMPORTED_MODULE_1__.Observer));\r\n\r\n\n\n//# sourceURL=webpack://brazilian-survivors/./src/v2/Timer.ts?");

/***/ }),

/***/ "./src/v2/TimerState.ts":
/*!******************************!*\
  !*** ./src/v2/TimerState.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TimerState: () => (/* binding */ TimerState)\n/* harmony export */ });\nvar TimerState;\r\n(function (TimerState) {\r\n    TimerState[TimerState[\"Idle\"] = 0] = \"Idle\";\r\n    TimerState[TimerState[\"Running\"] = 1] = \"Running\";\r\n    TimerState[TimerState[\"Finished\"] = 2] = \"Finished\";\r\n})(TimerState || (TimerState = {}));\r\n\n\n//# sourceURL=webpack://brazilian-survivors/./src/v2/TimerState.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/indexV2.ts");
/******/ 	
/******/ })()
;