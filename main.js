$(function () {
    "use strict";
    // Document ready.

    $('#ajax-form').on('submit', function(ev) {
        // Prevent submitting the form
        ev.preventDefault();
        ev.stopPropagation();

        // If form is valid, do Ajax post
        if(this.checkValidity() === true) {
            // Do POST to server
            var formData = $(this).serialize();
            postMessage(formData);
        }
        $(this).addClass('was-validated');
    });

    function postMessage(formData) {

        // Do Ajax Post to server
        $.ajax({
            type: "POST",
            // url: 'https://jsonplaceholder.typicode.com/posts',
            url: 'https://actum-form-ulcrunoxba.now.sh/api/submit',
            data: formData,
            success: handleDataOnSuccess,
            error: handleDataOnError
        });
    }

    function handleDataOnSuccess(data, status) {
        // Do something on success
        console.log(data);
        alertMessage(status, 'success ajax')
    }

    function handleDataOnError(status, errorCode) {
        // Do something on error
        console.log(status);
        alertMessage(errorCode, 'error ajax')
    }

    // Function for alerting some message
    function alertMessage(status, message) {
        var alert = $('#pageAlert');
        switch (status) {
            case 'success':
                alert.addClass('alert-success');
                break;
            case 'error':
                alert.addClass('alert-danger');
                break;
            default:
                alert.addClass('alert-info');
        }

        alert.find('.status').text(status);
        alert.find('.message').text(message);
        alert.fadeIn(500, function() {
            // Automatic fade-out after 3 seconds
            setTimeout(function () {
                alert.fadeOut(500);
            }, 3000);
        });
    }


});