document.addEventListener('DOMContentLoaded', () => {
    // creates global variable to append table rows
    let employeeDataTable = document.getElementById("employee_records")

    fetchEmployeeRecords()
    
    // gets employee data from API
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

    // creates table row & table data 
    const createTableRow = (record) => {
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
        employeeDataTable.appendChild(row)
    }
})