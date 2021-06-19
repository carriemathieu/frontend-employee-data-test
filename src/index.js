document.addEventListener('DOMContentLoaded', () => {
    fetchEmployeeRecords()
    
    function fetchEmployeeRecords() {
        fetch("http://dummy.restapiexample.com/api/v1/employees")
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
})