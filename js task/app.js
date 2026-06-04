let students = [];
async function loadStudents() {
    const response =
        await fetch("students.json");
    students =
        await response.json();
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}
if (!localStorage.getItem("students")) {

    loadStudents();
}
function login() {
    const username =
        document.getElementById("username").value;
    const password =
        document.getElementById("password").value;
    if (username !== "" && password !== "") {

        localStorage.setItem(
            "faculty",
            username
        );

        window.location.href =
            "dashboard.html";
    }
    else {

        alert("Enter Username and Password");
    }
}
if (document.getElementById("facultyName")) {

    loadDashboard();
}
function loadDashboard() {
    const faculty =
        localStorage.getItem("faculty");
    document.getElementById(
        "facultyName"
    ).innerHTML = faculty;
    const studentData =
        JSON.parse(
            localStorage.getItem("students")
        );
    document.getElementById(
        "totalStudents"
    ).innerHTML =
        studentData.length;
    const presentStudents =
        studentData.filter(function(student) {

            return student.attendance === "Present";
        });
    const absentStudents =
        studentData.filter(function(student) {

            return student.attendance === "Absent";
        });
    document.getElementById(
        "presentCount"
    ).innerHTML =
        presentStudents.length;
    document.getElementById(
        "absentCount"
    ).innerHTML =
        absentStudents.length;
    const studentContainer =
        document.getElementById(
            "studentContainer"
        );
    studentContainer.innerHTML = "";
    studentData.forEach(function(student) {
        const card =
            document.createElement("div");
        card.classList.add(
            "student-card"
        );
        if (student.attendance === "Present") {

            card.style.background =
                "green";
        }
        else {

            card.style.background =
                "red";
        }
        card.innerHTML =
            `
            <h3>${student.name}</h3>

            <p>${student.attendance}</p>
            `;
        card.addEventListener(
            "click",
            function() {

                showStudentDetails(student);
            }
        );
        studentContainer.appendChild(card);
    });
}
function showStudentDetails(student) {

    const details =
        document.getElementById(
            "studentDetails"
        );
    details.innerHTML =

        `
        <h2>Student Details</h2>

        <p><b>ID:</b> ${student.id}</p>

        <p><b>Name:</b> ${student.name}</p>

        <p><b>Phone:</b> ${student.phone}</p>

        <p><b>Attendance:</b> ${student.attendance}</p>
        `;
}
if (document.getElementById("attendanceList")) {

    loadAttendance();
}
function loadAttendance() {
    const attendanceList =
        document.getElementById(
            "attendanceList"
        );
    const studentData =
        JSON.parse(
            localStorage.getItem("students")
        );
    studentData.forEach(function(student, index) {
        const row =
            document.createElement("div");
        row.classList.add(
            "attendance-row"
        );
        row.innerHTML =

            `
            <span>${student.name}</span>

            <select id="status-${index}">

                <option value="Present">
                    Present
                </option>

                <option value="Absent">
                    Absent
                </option>

            </select>
            `;
        attendanceList.appendChild(row);
        const selectBox =
            document.getElementById(
                `status-${index}`
            );
        selectBox.value =
            student.attendance;
        selectBox.addEventListener(
            "change",
            function(event) {
                studentData[index].attendance =
                    event.target.value;
                localStorage.setItem(
                    "students",
                    JSON.stringify(studentData)
                );
                alert("Attendance Updated");
            }
        );
    });
}