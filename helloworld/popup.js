$(function() {function() {
    $('#name').keyup(function() {
        $('#greet').text('Hello ' + $('#name').val());
    });
    console.log("hello");
}})