const list = document.getElementById("ft_list");
const newButton = document.getElementById("newButton");

function saveTodos() {
    const todos = [];

    list.querySelectorAll("div").forEach(function (todo) {
        todos.push(todo.textContent);
    });

    document.cookie =
        "todos=" +
        encodeURIComponent(JSON.stringify(todos)) +
        "; path=/; max-age=31536000";
}

function createTodo(text) {
    const todo = document.createElement("div");
    todo.textContent = text;

    todo.addEventListener("click", function () {
        const answer = confirm("Do you want to remove this TO DO?");

        if (answer) {
            todo.remove();
            saveTodos();
        }
    });

    list.prepend(todo);
}

function loadTodos() {
    const cookies = document.cookie.split("; ");

    const todoCookie = cookies.find(function (cookie) {
        return cookie.startsWith("todos=");
    });

    if (!todoCookie) {
        return;
    }

    const value = todoCookie.substring("todos=".length);

    try {
        const todos = JSON.parse(decodeURIComponent(value));

        for (let i = todos.length - 1; i >= 0; i--) {
            createTodo(todos[i]);
        }
    } catch (error) {
        console.log("Could not load todos");
    }
}

newButton.addEventListener("click", function () {
    const text = prompt("Enter a new TO DO:");

    if (text !== null && text.trim() !== "") {
        createTodo(text.trim());
        saveTodos();
    }
});

loadTodos();