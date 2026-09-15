$(document).ready(function () {
    $("#calculator").submit(function (event) {
        event.preventDefault();

        const leftValue = $("#left").val();
        const rightValue = $("#right").val();
        const operator = $("#operator").val();

        if (!/^\d+$/.test(leftValue) || !/^\d+$/.test(rightValue)) {
            alert("Error :(");
            return;
        }

        const left = Number(leftValue);
        const right = Number(rightValue);

        if ((operator === "/" || operator === "%") && right === 0) {
            alert("It's over 9000!");
            console.log("It's over 9000!");
            return;
        }

        let result;

        switch (operator) {
            case "+":
                result = left + right;
                break;
            case "-":
                result = left - right;
                break;
            case "*":
                result = left * right;
                break;
            case "/":
                result = left / right;
                break;
            case "%":
                result = left % right;
                break;
        }

        alert(result);
        console.log(result);
    });

    setInterval(function () {
        alert("Please, use me...");
    }, 30000);
});