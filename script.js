// code to display current day
var currentDay = moment().format("MMMM Do, YYYY");
console.log(currentDay);
$("#currentDay").text(currentDay);

// color code function to set their colors
var colorCode = function () {

    // remove all time related classes before inputting the update
    $(".time-block .description").removeClass("past present future");

    // get current hour to compare to the block hour
    var currentHour = moment().hour();
    console.log(currentHour);

    // Loop to check each time block
    $(".time-block").each(function() {
        // obtain timeblock hour via id, remove "Hr-" for the actual time
        var blockHour = $(this).attr("id").replace("Hr-","");

        // make blockHour a number for comparison sake for if, if else, else statements
        blockHour = parseInt(blockHour);

        //if currentHour is greater than the block time, the block time is in the past, set child(description) class to past
        if (currentHour > blockHour) {
            $(this).children(".description").addClass("past");
        } 
        // if currentHour = blocktime, block time is referencing to current hour. Set description child to present
        else if (currentHour === blockHour) {
            $(this).children(".description").addClass("present");
        }
         // if currentHour < blocktime, block time is referencing to future hour. Set description child to present
        else if (currentHour < blockHour) {
            $(this).children(".description").addClass("future");
        }
        else {
            console.log("There is a bug in your code")
        };
    });

}
// set interval to run color coding every 5 minutes as well as the beginning
setInterval(function() {
    colorCode();
}, (30000));
colorCode();


// add general eventlistener to savebuttons and save the related text
$(".saveBtn").on("click", function() {
    // get textInput from sibling element
    var textInput = $(this).siblings(".description").val().trim();

    // get blockID from the button ID
    var blockID = $(this).attr("id").replace("btn","");

    // save string from text input into local storage
    localStorage.setItem(blockID, textInput);
});

//load local storage on page load
// probably could have done this more efficiently, but.... lazy
var loadLocalStorage = function () {
    // $("#Hr-9txt").val(localStorage.getItem("Hr-9"));
    // $("#Hr-10txt").val(localStorage.getItem("Hr-10"));
    // $("#Hr-11txt").val(localStorage.getItem("Hr-11"));
    // $("#Hr-12txt").val(localStorage.getItem("Hr-12"));
    // $("#Hr-13txt").val(localStorage.getItem("Hr-13"));
    // $("#Hr-14txt").val(localStorage.getItem("Hr-14"));
    // $("#Hr-15txt").val(localStorage.getItem("Hr-15"));
    // $("#Hr-16txt").val(localStorage.getItem("Hr-16"));
    // $("#Hr-17txt").val(localStorage.getItem("Hr-17"));

    // Do not repeat thyself renders the above pretty bad for scaling purposes
    
    $(".time-block").each(function() {
        // obtain timeblock id
        var blockID = $(this).attr("id");

        console.log
        // textbox ID is timeblock id with txt at the end
        var textboxID = blockID.concat("txt");

        //get textbox value which is set by timeblock ID
        var textboxValue = localStorage.getItem(blockID);

        //set textbox value to the localstorage value, add # to reference ID
        $("#" + textboxID).val(textboxValue);
    });
};

//apply once on load
loadLocalStorage();