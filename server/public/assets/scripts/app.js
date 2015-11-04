/**
 * Created by PaulZimmel on 11/3/15.
 */
var averageSalary, totalSalary, averageTenure, totalTenure;

$(document).ready(function(){
    getEmployees();
    $("#individualEmployeeInfo").on('click', ".delete", deleteEmployee);
});


function getEmployees() {
    console.log("getting data");
    $.ajax({
        type: "GET",
        url: "/data",
        success: function (data) {
            compute(data);
            append(data);

        }
    });
}



function compute(employeeArray){
    console.log("computing data");
    totalSalary = computeTotalSalary(employeeArray).toFixed(2);
    averageSalary = computeAverageSalary(employeeArray).toFixed(2);
    totalTenure = computeTotalTenure(employeeArray);
    averageTenure = computeAverageTenure(employeeArray).toFixed(2);
}



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
            console.log(data);
            getEmployees();
        }
    })
}

function append(employeeArray){
    console.log("appending data");
    appendComputationalInfo();
    appendEmployees(employeeArray);
}

function appendEmployees(employeeArray){
    $("#individualEmployeeInfo").empty();
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
    $("#overallEmployeeInfo").empty();
    var el = "<div class = 'computation-header'>" +
                "<p class='computed-total-salary'><span class='compute-labels'>Tot Salary:</span>$" + totalSalary + "</p>" +
                "<p class='computed-avg-salary'><span class='compute-labels'>Avg Salary:</span>$" +averageSalary + "</p>" +
                "<p class='computed-total-tenure'><span class='compute-labels'>Tot Tenure:</span>"+ totalTenure + " Years</p>" +
                "<p class='computed-avg-tenure'><span class='compute-labels'>Avg Tenure:</span>"+ averageTenure + " Years</p>"+
            "</div>";
    $("#overallEmployeeInfo").append(el);
}
