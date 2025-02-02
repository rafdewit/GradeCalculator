# GradeCalculator

A simple grade calculator for teachers. 
A user can create classes, a class can have students.
A class currently represents a class in a single specific course. A class can have one or more grade-periods. 
Each grade period can have collections of grades and grades themselves. Each grade collection in itself can have multiple grade collections and multiple grades.
With this model, the teacher can decide the structure of how the total grade becomes reality. Each item has a weight which determines how the total is calculated. The total weight is not required to sum up to a total of 100.

Example:
- Semester1: (weight 50)
  - DailyWork: (weight 40)
    - Behavior
    - Tests
      - Test1
      - Test2
      - Test3
      - Test4
  - Exam (weight 30)
  - Oral Exam   (weight 20)

Semester2: (weight 50)
  - DailyWork:
    - Behavior
    - Tests
      - Test1
      - Test2
      - Test3
      - Test4
      - Test5
      - Test6
  - Exam
  - Oral Exam

both semesters are equaly wieghted. Within the first semester, the daily worktotal  is weighted 40, exam 30 and oral exam 20.
![GradeCalculatorScreen](https://github.com/user-attachments/assets/8dfe7d21-5694-4ad6-852f-78a13f913300)


This grade calculator is currently a simple electron app which can be built locally.

