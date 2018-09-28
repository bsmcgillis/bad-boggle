$(function() {
    $('#mazeForm').on('submit', function(event) {
        var answer = 'Word: "", Score: '; 
        $('#mazeSolution').html(answer);
        event.preventDefault();
    });
});