document.addEventListener('DOMContentLoaded', () => {
    // creates global variable to append table rows
    let allEmployeesRecordsTable = document.getElementById("employee_records")
    let employeeIdForm = document.getElementById("find-employee-form")
    let findEmployeeRecordTable = document.getElementById("employee_record")

    fetchEmployeeRecords()

    employeeIdForm.addEventListener('submit', e => {
        e.preventDefault()
        onFormSubmit(e)
    })
    
    // gets all employee data from API
    function fetchEmployeeRecords() {
        fetch("http://dummy.restapiexample.com/api/v1/employees")
            .then(resp => resp.json())
            .then(records => {
                records.data.forEach(record => {
                    let age = record.employee_age
                    let salary = parseInt(record.employee_salary)
                    // if employee is between 22 & 28, add to table
                    if (age >= 22 && age <= 28 && salary > 1000) {
                        createTableRow(record)
                    }
                })
            })
            .catch(err => console.log(err))
    }

    // creates table row & table data. sets default table to all employee records table
    const createTableRow = (record, table = allEmployeesRecordsTable) => {
        // creates row
        let row = document.createElement("TR")
        
        // creates element for each column
        let employeeName = document.createElement("TD")
        let employeeAge = document.createElement("TD")
        let employeeSalary = document.createElement("TD")

        // inserts data from API
        employeeName.innerText = record.employee_name
        employeeAge.innerText = record.employee_age
        employeeSalary.innerText = record.employee_salary

        // appends TD to row, appends row to table
        row.appendChild(employeeName)
        row.appendChild(employeeAge)
        row.appendChild(employeeSalary)
        table.appendChild(row)
    }

    function onFormSubmit() {
        let employeeInput = document.getElementById("employee-id-input")
        // converts employee id from string to int to privide as url params
        let employeeId = parseInt(employeeInput.value)
        // fetches employee from DB/API
        fetchEmployeeRecord(employeeId)
        // clears input field
        employeeInput.value = ""
    }

    function fetchEmployeeRecord(id) {
        fetch(`http://dummy.restapiexample.com/api/v1/employee/${id}`)
            .then(resp => resp.json())
            .then(emp => {
                let record = emp.data
                !record ? window.alert("Invalid employee.") : testIfVowel(record)
            })
            .catch(err => console.log(err))
    }

    function testIfVowel(record) {
        // to provide as argument in createTableRow func - append row to find employee table
        let table = findEmployeeRecordTable
        // checks if employee name begins with vowel. if so, creates row in find employee record table
        return /[aeiou]/i.test(record.employee_name[0]) ? createTableRow(record,table) : window.alert("Employee's name does not begin with a vowel.")
    }
})