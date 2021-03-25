const store = require('electron-storage');
class DataStore {
    constructor() {
        this.todos = store.get('todos') || []
    }

    saveTodo() {
        store.set('todos', this.todos);
        return this
    }
    getTodo() {
        store.get('todos') || []
        return this
    }

    addTodo(todo) {
        store.todos = [...store.todos, todo]
        return this.saveTodo()
    }
    deleteTodo(todo) {
        store.todos = store.todos.filter(t => t !== todo)
        return this.saveTodo()
    }
}

module.exports = DataStore
