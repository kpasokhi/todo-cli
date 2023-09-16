"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibTodo = void 0;
var fs = require('fs');
var LibTodo = /** @class */ (function () {
    function LibTodo() {
        this.todoFile = 'todo.json';
        var data = fs.readFileSync(this.todoFile, 'utf8');
        this.todoObject = JSON.parse(data);
    }
    LibTodo.prototype.createNote = function (note) {
        this.todoObject.todoArray.push(note);
        fs.writeFileSync(this.todoFile, JSON.stringify(this.todoObject));
    };
    LibTodo.prototype.listNotes = function () {
        var todoList = '';
        this.todoObject.todoArray.forEach(function (todo, index) {
            todoList += "".concat(index + 1, ". ").concat(todo, " \n");
        });
        return todoList;
    };
    LibTodo.prototype.findNotes = function (keyword) {
        var foundList = '';
        var keywordRegex = new RegExp('^(.*?)(' + keyword + ')(.*)$', 'i');
        this.todoObject.todoArray.forEach(function (todo, index) {
            if (keywordRegex.test(todo)) {
                foundList += "".concat(index + 1, ". ").concat(todo);
            }
        });
        return foundList;
    };
    LibTodo.prototype.removeOneNote = function (index) {
        if (index > this.todoObject.todoArray.length) {
            return false;
        }
        this.todoObject.todoArray.splice(index - 1, 1);
        fs.writeFileSync(this.todoFile, JSON.stringify(this.todoObject));
        return true;
    };
    LibTodo.prototype.removeAllNotes = function () {
        this.todoObject.todoArray = [];
        fs.writeFileSync(this.todoFile, JSON.stringify(this.todoObject));
    };
    return LibTodo;
}());
exports.LibTodo = LibTodo;
