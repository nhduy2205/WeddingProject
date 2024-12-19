document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("dataForm");
    const inputData = document.getElementById("inputData");
    const dataList = document.getElementById("dataList");

    // Fetch data on page load
    fetch("https://weddingduynguyet.vercel.app/backend.php?action=get_data")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Read as text to check if the body is empty
        })
        .then(data => {
            // If the data is empty, return an empty array
            if (data.trim() === '') {
                dataList.innerHTML = "<p>No data found.</p>";
            } else {
                try {
                    const jsonData = JSON.parse(data); // Parse the response as JSON
                    if (Array.isArray(jsonData) && jsonData.length > 0) {
                        dataList.innerHTML = jsonData.map(item => `<p>${item}</p>`).join("");
                    } else {
                        dataList.innerHTML = "<p>No data found.</p>";
                    }
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    dataList.innerHTML = "<p>Error parsing data. Please try again later.</p>";
                }
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            dataList.innerHTML = "<p>Error fetching data. Please try again later.</p>";
        });

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("data", inputData.value);

        fetch("https://weddingduynguyet.vercel.app/backend.php?action=submit_data", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Read as text to check if the body is empty
        })
        .then(data => {
            // If the data is empty, handle the error
            if (data.trim() === '') {
                alert("Received empty response from the server.");
                return;
            }
            try {
                const result = JSON.parse(data); // Parse the response as JSON
                if (result.success) {
                    if (Array.isArray(result.data)) {
                        dataList.innerHTML = result.data.map(item => `<p>${item}</p>`).join("");
                    } else {
                        alert("Unexpected data format.");
                    }
                    inputData.value = ""; // Clear input field
                } else {
                    alert("Error: " + result.message);
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
                alert("An error occurred while processing the response.");
            }
        })
        .catch(error => {
            console.error("Error submitting data:", error);
            alert("An error occurred while submitting the data.");
        });
    });
});