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
    totalSalary = computeTotalSalary(employeeArray);
    averageSalary = computeAverageSalary(employeeArray);
    totalTenure = computeTotalTenure(employeeArray);
    averageTenure = computeAverageTenure(employeeArray);
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
        var el = "<div class = 'well'>" +
            "<p>" + employeeArray[i].name + "</p>" +
            "<p>" +employeeArray[i].salary + "</p>" +
            "<p>"+ employeeArray[i].tenure + "</p>" +
            "<button class = 'delete btn btn-danger' data-id ='"+
            employeeArray[i]._id+"'>Delete</button>" +
            "</div>";
        $("#individualEmployeeInfo").append(el);
    }

}
function appendComputationalInfo(){
    var el = "<div class = 'well computation_header'>" +
                "<p>" + totalSalary + "</p>" +
                "<p>" +averageSalary + "</p>" +
                "<p>"+ totalTenure + "</p>" +
                "<p>"+ averageTenure + "</p>"+
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