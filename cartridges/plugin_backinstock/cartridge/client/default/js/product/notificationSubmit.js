'use strict';

$(document).ready(function () {
  // Handling notification form submit
  $('form.notification-form').submit(function (e) {
    var form = $(this);
    e.preventDefault();
    var url = form.attr('action');
    form.spinner().start();
    $.ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      data: form.serialize(),
      success: function (data) {
        form.spinner().stop();
        $('#notifyModal').modal('hide');
        var response = {
          error: false,
          message: form.data('submit-success')
        };
        handleNotificationResponse(response);
      },
      error: function (err) {
        form.spinner().stop();
        $('#notifyModal').modal('hide');
        var response = {
          error: true,
          message: form.data('submit-error')
        };
        handleNotificationResponse(response);
      }
    });
    return false;
  });
});

/**
 * Showing alert, based on notification subscription response
 * @param {string} response - ajax response from clicking the Save button
 */
function handleNotificationResponse(response) {
  var messageType = response.error ? 'alert-danger' : 'alert-success';

  // Adding container for the toast
  if ($('.notification-messages').length === 0) {
      $('body').prepend(
          '<div class="notification-messages"></div>'
      );
  }

  // Appending alert toast - success or danger, based on the message type
  $('.notification-messages').append(
      '<div class="alert ' + messageType + ' subscription-alert text-center alert-dismissible" role="alert">'
      + response.message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
      + '</div>'
  );

  // Remove alert after 5 seconds
  setTimeout(function () {
      $('.subscription-alert').remove();
  }, 5000);
}
