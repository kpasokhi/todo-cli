const fs = require('fs');

interface TodoObject {
    todoArray: string[];
}

export class LibTodo {
    todoFile: string;
    todoObject: TodoObject;

    constructor() {
        this.todoFile = 'todo.json';
        let data: string = fs.readFileSync(this.todoFile, 'utf8');
        this.todoObject = JSON.parse(data);
    }

    createNote(note: string): void {
        this.todoObject.todoArray.push(note);
        fs.writeFileSync(this.todoFile, JSON.stringify(this.todoObject));
    }

    listNotes(): string {
        let todoList: string = '';
        this.todoObject.todoArray.forEach((todo, index) => {
            todoList += `${index + 1}. ${todo} \n`;
        });
        return todoList;
    }

    findNotes(keyword: string): string {
        let foundList: string = '';
        let keywordRegex = new RegExp('^(.*?)(' + keyword + ')(.*)$', 'i');
        this.todoObject.todoArray.forEach((todo, index) => {
            if (keywordRegex.test(todo)) {
                foundList += `${index + 1}. ${todo}`;
            }
        });
        return foundList;
    }

    removeOneNote(index: number): boolean {
        if (index > this.todoObject.todoArray.length) {
            return false;
        }
        this.todoObject.todoArray.splice(index - 1, 1);
        fs.writeFileSync(this.todoFile, JSON.stringify(this.todoObject));
        return true;
    }

    removeAllNotes(): void {
        this.todoObject.todoArray = [];
        fs.writeFileSync(this.todoFile, JSON.stringify(this.todoObject));
    }
}