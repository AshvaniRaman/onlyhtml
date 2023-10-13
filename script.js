document.addEventListener("DOMContentLoaded", function() {
    function fetchAndDisplayCodes() {
        fetch("https://source-code.azurewebsites.net/getCodes.php")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const codeList = document.getElementById("section1");
                codeList.innerHTML = "";

                data.forEach(code => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="https://source-code.azurewebsites.net/code.php?id=${code.id}" target="_blank">${code.subject}</a>`;
                    codeList.appendChild(listItem);
                });
            })
            .catch(error => console.error("Error fetching codes:", error));
    }

    fetchAndDisplayCodes();

    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);

        fetch("https://source-code.azurewebsites.net/addCode.php", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                fetchAndDisplayCodes();
                location.reload();
            } else {
                console.error("Failed to add code:", response.statusText);
            }
        })
        .catch(error => console.error("Error adding code:", error));
    });
});
