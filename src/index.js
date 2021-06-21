document.addEventListener('DOMContentLoaded', () => {
    // creates global variable to append table rows
    let allEmployeesRecordsTable = document.getElementById("all-employees-records-table")
    let employeeIdForm = document.getElementById("find-employee-form")
    let findEmployeeRecordTable = document.getElementById("find-employee-record-table")

    fetchEmployeeRecords()

    employeeIdForm.addEventListener('submit', (e) => {
        e.preventDefault()
        onFormSubmit(e)
    })
    
    // gets all employee data from API
    function fetchEmployeeRecords() {
        fetch("http://dummy.restapiexample.com/api/v1/employees")
            .then(resp => resp.json())
            .then(records => {
                records.data.forEach(record => {
                    // if employee is between 22 & 28, add to table
                    if (record.employee_age >= 22 && record.employee_age <= 28) {
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
                testIfVowel(record)
            })
            .catch(err => console.log(err))
    }

    function testIfVowel(record) {
        // to provide as argument in createTableRow func to append row to find employee table
        let table = findEmployeeRecordTable
        return /[aeiou]/i.test(record.employee_name[0]) ? createTableRow(record,table) : window.alert("no vowel")
    }
})