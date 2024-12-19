document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("dataForm");
    const inputData = document.getElementById("inputData");
    const dataList = document.getElementById("dataList");

    // Fetch data on page load
    fetch("https://weddingduynguyet.vercel.app/backend.php?action=get_data")  // Đảm bảo URL đúng
        .then(response => response.json())
        .then(data => {
            // Hiển thị dữ liệu vào dataList
            if (Array.isArray(data) && data.length > 0) {
                dataList.innerHTML = data.map(item => `<p>${item}</p>`).join("");
            } else {
                dataList.innerHTML = "<p>No data found.</p>";
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
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Cập nhật danh sách dữ liệu sau khi thêm mới
                if (Array.isArray(result.data)) {
                    dataList.innerHTML = result.data.map(item => `<p>${item}</p>`).join("");
                } else {
                    alert("Unexpected data format.");
                }
                inputData.value = ""; // Clear input
            } else {
                alert("Error: " + result.message);
            }
        })
        .catch(error => {
            console.error("Error submitting data:", error);
            alert("Error submitting data. Please try again later.");
        });
    });
});