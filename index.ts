const readline = require('readline');
import { LibTodo } from './LibTodo';

const libTodo = new LibTodo();

let todoList: string;
let success: boolean;

enum Commands {
    Create = 'create',
    List = 'list',
    Find = 'find',
    Remove = 'remove',
    RemoveAll = 'removeAll',
}

const helpText =
  `
  A simple todo CLI app.

  Commands list:
    
  create:      Create a new note
  list:        List all notes
  find:        Find a note with a keyword
  remove:      Remove a single note
  removeAll:   Remove all notes
  `;

console.log(helpText);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter a command> ',
});

rl.prompt()

rl.on('line', (line) => {
    switch (line.trim()) {
        case Commands.Create:
            rl.question('Please enter your note: ', answer => {
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
            rl.question('Please enter a keyword: ', answer => {
                todoList = libTodo.findNotes(answer);
                console.log(todoList ? todoList : 'No notes found containing the keyword.');
                rl.prompt();
            });
            break;
        case Commands.Remove:
            rl.question('Please enter a note index: ', answer => {
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
            console.log(`Invalid command`);
            console.log(helpText);
            rl.prompt();
            break;
    }

}).on('close', () => {
    process.exit(0);
});