document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("dataForm");
    const inputData = document.getElementById("inputData");
    const dataList = document.getElementById("dataList");

    // Fetch data on page load
    fetch("backend.php?action=get_data")
        .then(response => response.json())
        .then(data => {
            dataList.innerHTML = data.map(item => `<p>${item}</p>`).join("");
        });

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData();
        console.log(formData);
        formData.append("data", inputData.value);

        fetch("backend.php?action=submit_data", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    dataList.innerHTML = result.data.map(item => `<p>${item}</p>`).join("");
                    inputData.value = ""; // Clear input
                } else {
                    alert("Error: " + result.message);
                }
            });
    });
});