# GradeCalculator

A simple grade calculator for teachers. 
A user can create classes, a class can have students.
A class currently represents a class in a single specific course. A class can have one or more grade-periods. 
Each grade period can have collections of grades and grades themselves. Each grade collection in itself can have multiple grade collections and multiple grades.
With this model, the teacher can decide the structure of how the total grade becomes reality. Each item has a weight which determines how the total is calculated. The total weight is not required to sum up to a total of 100.

Example:
- Semester1: (weight 50)
  - - DailyWork: (weight 50)
    - - -Behavior
    - - -Tests
      - - - -Test1
      - - - -Test2
      - - - -Test3
      - - - -Test4
  --Exam        (weight 50%)
  --Oral Exam   (weight 50%)

Semester2: (weight 50%)
  -- DailyWork:
    ---Behavior
    ---Tests
      ----Test1
      ----Test2
      ----Test3
      ----Test4
      ----Test5
      ----Test6
  --Exam
  --Oral Exam


This grade calculator is currently a simple electron app which can be built locally.

