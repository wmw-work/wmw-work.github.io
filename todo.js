const demoTodo = function() {
    const templateTodo = function(todo) {
        let t = `
            <div class="todo-cell">
                <input type="checkbox" class="todo-done">
                <button class="todo-delete">x</button>
                <span class="text">${todo}</span>
            </div>
        `
        return t
    }

    const insertTodos = function(todos) {
        let todoContainer = e('#id-div-container')
        for (let i = 0; i < todos.length; i++) {
            let todo = todos[i]
            let html = templateTodo(todo)
            todoContainer.insertAdjacentHTML('beforeend', html)
        }
    }

    const saveTodo = function(todo) {
        todos.push(todo)
        let s = JSON.stringify(todos)
        localStorage.savedTodo = s
    }

    const loadTodos = function() {
        let s = localStorage.savedTodo
        if (s === undefined) {
            return []
        } else {
            let ts = JSON.parse(s)
            return ts
        }
    }

    let todos = loadTodos()
    insertTodos(todos)

    const deleteTodo = function(container, todoCell) {
        let children = container.children
        for (let i = 0; i < children.length; i++) {
            let cell = children[i]
            if (todoCell === cell) {
                todoCell.remove()
                let todos = loadTodos()
                todos.splice(i, 1)
                let s = JSON.stringify(todos)
                localStorage.savedTodo = s
            }
        }
    }

    let addButton = e('#id-button-add')
    addButton.addEventListener('click', function() {
        let todoInput = e('#id-input-todo')
        let todo = todoInput.value
        saveTodo(todo)
        let todoContainer = e('#id-div-container')
        let t = templateTodo(todo)
        todoContainer.insertAdjacentHTML('beforeend', t)
        todoInput.value = ''
    })

    let todoContainer = e('#id-div-container')

    todoContainer.addEventListener('click', function(event) {
        let target = event.target
        if (target.classList.contains('todo-done')) {
            let todoDiv = target.parentElement
            let text = todoDiv.querySelector('.text')
            text.classList.toggle('done')
        } else if (target.classList.contains('todo-delete')) {
            let todoDiv = target.parentElement
            let container = todoDiv.parentElement
            deleteTodo(container, todoDiv)
        }
    })
}

const __mainTodo = function() {
    demoTodo()
}

__mainTodo()
