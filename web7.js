document.addEventListener('DOMContentLoaded', function () {
    const subjectInput = document.getElementById('subject');
    const gradeInput = document.getElementById('grade');
    const courseList = document.getElementById('course-list');
    const gpaDisplay = document.getElementById('gpa');
    const addCourseButton = document.getElementById('add-course');
    let courses = [];

    addCourseButton.addEventListener('click', function () {
        const subject = subjectInput.value;
        const grade = gradeInput.value;

        if (subject && grade) {
            const course = { subject, grade };
            courses.push(course);

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${subject}</td>
                <td>${grade}</td>
            `;
            courseList.appendChild(newRow);

            subjectInput.value = '';
            gradeInput.value = '';

            const gpa = calculateGPA(courses);
            gpaDisplay.textContent = gpa.toFixed(2);
        }
    });

    function calculateGPA(courses) {
        if (courses.length === 0) return 0;

        const gradePoints = {
            'A+': 4.0,
            'A': 4.0,
            'A-': 3.7,
            'B+': 3.3,
            'B': 3.0,
            'B-': 2.7,
            'C+': 2.3,
            'C': 2.0,
            'C-': 1.7,
            'D': 1.0,
            'F': 0.0,
        };

        let totalGradePoints = 0;
        let totalCredits = 0;

        courses.forEach(course => {
            const grade = course.grade.toUpperCase();
            if (grade in gradePoints) {
                totalGradePoints += gradePoints[grade];
                totalCredits += 1;
            }
        });

        return totalGradePoints / totalCredits;
    }
});
