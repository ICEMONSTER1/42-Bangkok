$(document).ready(function () {
    const list = $("#ft_list");

    function saveTodos() {
        const todos = [];

        $("#ft_list div").each(function () {
            todos.push($(this).text());
        });

        document.cookie =
            "todos=" +
            encodeURIComponent(JSON.stringify(todos)) +
            "; path=/; max-age=31536000";
    }

    function createTodo(text) {
        const todo = $("<div></div>").text(text);

        todo.click(function () {
            if (confirm("Do you want to remove this TO DO?")) {
                $(this).remove();
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

    $("#newButton").click(function () {
        const text = prompt("Enter a new TO DO:");

        if (text !== null && text.trim() !== "") {
            createTodo(text.trim());
            saveTodos();
        }
    });

    loadTodos();
});