// code to display current day
var currentDay = moment().format("MMMM Do, YYYY");
console.log(currentDay);
$("#currentDay").text(currentDay);