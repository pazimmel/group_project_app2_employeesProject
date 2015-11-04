/**
 * Created by PaulZimmel on 11/3/15.
 */
var averageSalary, totalSalary, averageTenure, totalTenure;

$(document).ready(function(){
    getEmployees();
    $("#individualEmployeeInfo").on('click', ".delete", deleteEmployee);
});

//init
    //divs

//enable

    //ajax call
function getEmployees() {
    $.ajax({
        type: "GET",
        url: "/data",
        success: function (data) {
            compute(data);
            append(data);

        }
    });
}

        //compute

function compute(employeeArray){
    totalSalary = computeTotalSalary(employeeArray).toFixed(2);
    averageSalary = computeAverageSalary(employeeArray).toFixed(2);
    totalTenure = computeTotalTenure(employeeArray);
    averageTenure = computeAverageTenure(employeeArray).toFixed(2);
}

//averageSalary = computeAverageSalary(data);

function computeTotalSalary(employeeArray) {
    var total = 0;
    for (var i =0; i<employeeArray.length; i++){
        total+= parseInt(employeeArray[i].salary);
    }

    return total;
}
function computeAverageSalary(employeeArray){
    var total = 0;
    var average = 0;
    for (var i =0; i<employeeArray.length; i++){
        total+= parseInt(employeeArray[i].salary);
    }
    average = total/employeeArray.length;

    return average;
}
function computeTotalTenure(employeeArray){
    var total =0;
    for (i=0; i<employeeArray.length; i++){
        total+=parseInt(employeeArray[i].tenure);
    }

    return total;
}
function computeAverageTenure(employeeArray){
    var total =0;
    var average =0;
    for (i=0; i<employeeArray.length; i++){
        total+=parseInt(employeeArray[i].tenure);
    }
    average = total/employeeArray.length;

    return average;
}

function deleteEmployee(){
    var deleteID = {"id" : $(this).data("id")};

    $.ajax({
        type: "DELETE",
        url: "/data",
        data: deleteID,
        success: function(data){
            compute(data);
            append(data);
        }
    })
}

function append(employeeArray){
    appendComputationalInfo();
    appendEmployees(employeeArray);
}

function appendEmployees(employeeArray){
    for (var i = 0; i < employeeArray.length; i++) {
        var el = "<div class = 'display-row'>" +
            "<p class='display-name'>" + employeeArray[i].name + "</p>" +
            "<p class='display-salary'>" +employeeArray[i].salary + "</p>" +
            "<p class='display-tenure'>"+ employeeArray[i].tenure + "</p>" +
            "<button class = 'delete btn btn-danger' data-id ='"+
            employeeArray[i]._id+"'>Delete</button>" +
            "</div>";
        $("#individualEmployeeInfo").append(el);
    }

}
function appendComputationalInfo(){
    var el = "<div class = 'computation-header'>" +
                "<p class='computed-total-salary'><span class='compute-labels'>Tot Salary:</span>$" + totalSalary + "</p>" +
                "<p class='computed-avg-salary'><span class='compute-labels'>Avg Salary:</span>$" +averageSalary + "</p>" +
                "<p class='computed-total-tenure'><span class='compute-labels'>Tot Tenure:</span>"+ totalTenure + " Years</p>" +
                "<p class='computed-avg-tenure'><span class='compute-labels'>Avg Tenure:</span>"+ averageTenure + " Years</p>"+
            "</div>";
    $("#overallEmployeeInfo").append(el);
}
//append DOM
            //append employees
            //append total computational info
    //delete
        //delete employee
            //remove employee?
        //delete call
            //compute
            //update DOM
                //remove employee?
                //append total computational info
    //freeze
        //freeze call
            //compute
            //append total computational info

//disable