/**
 * Created by PaulZimmel on 11/3/15.
 */
var averageSalary, totalSalary, averageTenure, totalTenure;

$(document).ready(function(){
    getEmployees();
    $("#individualEmployeeInfo").on('click', ".delete", deleteEmployee);
    $("#individualEmployeeInfo").on('click', ".freeze", toggleFreeze);
});


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



function compute(employeeArray){

    totalSalary = computeTotalSalary(employeeArray).toFixed(2);
    averageSalary = computeAverageSalary(employeeArray).toFixed(2);
    totalTenure = computeTotalTenure(employeeArray);
    averageTenure = computeAverageTenure(employeeArray).toFixed(2);
}



function computeTotalSalary(employeeArray) {
    var total = 0;
    for (var i =0; i<employeeArray.length; i++){

        if (!employeeArray[i].frozen) {
            total+= parseInt(employeeArray[i].salary);
        }
    }

    return total;
}
function computeAverageSalary(employeeArray){
    var unfrozenEmployee = 0;
    var total = 0;
    var average = 0;
    for (var i =0; i<employeeArray.length; i++){
        if (!employeeArray[i].frozen){
            unfrozenEmployee++;
            total+= parseInt(employeeArray[i].salary);
        }
    }
    average = total/unfrozenEmployee;

    return average;
}
function computeTotalTenure(employeeArray){
    var total =0;
    for (i=0; i<employeeArray.length; i++){
        if (!employeeArray[i].frozen) {
            total+=parseInt(employeeArray[i].tenure);
        }
    }

    return total;
}
function computeAverageTenure(employeeArray){
    var unfrozenEmployee = 0;
    var total =0;
    var average =0;
    for (i=0; i<employeeArray.length; i++){
        if (!employeeArray[i].frozen) {
            unfrozenEmployee++;
            total+=parseInt(employeeArray[i].tenure);
        }
    }
    average = total/unfrozenEmployee;

    return average;
}

function deleteEmployee(){
    var deleteID = {"id" : $(this).data("id")};

    $.ajax({
        type: "DELETE",
        url: "/data",
        data: deleteID,
        success: function(data){
            getEmployees();
        }
    });
}
function toggleFreeze(){
    var freezeID = {"id" : $(this).data("id")};
    if($(this).parent().hasClass('frozen')){
        console.log('about to unfreeze');
        unfreezeEmployee(freezeID);
    }else{
        console.log('about to freeze');
        freezeEmployee(freezeID);
    }
}
function freezeEmployee(freezeID){
    $.ajax({
        type: "PUT",
        url: "/data/freeze",
        data: freezeID,
        success: function(data){
            getEmployees();

        }
    });
}
function unfreezeEmployee(freezeID){
    $.ajax({
        type: "PUT",
        url: "/data/unfreeze",
        data: freezeID,
        success: function(data){
            getEmployees();
            //add data-freeze
            //getEmployees();
        }
    });
}
//freeze button
    //freeze call
        //a put call?


//promote



function append(employeeArray){

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
            "<button class = 'freeze btn btn-warning' data-id ='"+
            employeeArray[i]._id+"'>Freeze</button>" +
            "</div>";
        $("#individualEmployeeInfo").append(el);
        if (employeeArray[i].frozen) {
            $("#individualEmployeeInfo").children().last().addClass("frozen");
            $("#individualEmployeeInfo").children().last().find('.freeze').text("Unfreeze")
        }
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
