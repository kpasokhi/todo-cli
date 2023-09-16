"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require('readline');
var LibTodo_1 = require("./LibTodo");
var libTodo = new LibTodo_1.LibTodo();
var todoList;
var success;
var Commands;
(function (Commands) {
    Commands["Create"] = "create";
    Commands["List"] = "list";
    Commands["Find"] = "find";
    Commands["Remove"] = "remove";
    Commands["RemoveAll"] = "removeAll";
})(Commands || (Commands = {}));
var helpText = "\n  A simple todo CLI app.\n\n  Commands list:\n    \n  create:      Create a new note\n  list:        List all notes\n  find:        Find a note with a keyword\n  remove:      Remove a single note\n  removeAll:   Remove all notes\n  ";
console.log(helpText);
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter a command> ',
});
rl.prompt();
rl.on('line', function (line) {
    switch (line.trim()) {
        case Commands.Create:
            rl.question('Please enter your note: ', function (answer) {
                libTodo.createNote(answer);
                console.log('The note is saved.');
                rl.prompt();
            });
            break;
        case Commands.List:
            todoList = libTodo.listNotes();
            console.log(todoList ? todoList : 'The list is empty.');
            rl.prompt();
            break;
        case Commands.Find:
            rl.question('Please enter a keyword: ', function (answer) {
                todoList = libTodo.findNotes(answer);
                console.log(todoList ? todoList : 'No notes found containing the keyword.');
                rl.prompt();
            });
            break;
        case Commands.Remove:
            rl.question('Please enter a note index: ', function (answer) {
                success = libTodo.removeOneNote(answer);
                console.log(success ? 'The note is removed.' : 'The index does not exist.');
                rl.prompt();
            });
            break;
        case Commands.RemoveAll:
            libTodo.removeAllNotes();
            console.log('All of the notes are removed.');
            rl.prompt();
            break;
        default:
            console.log("Invalid command");
            console.log(helpText);
            rl.prompt();
            break;
    }
}).on('close', function () {
    process.exit(0);
});
