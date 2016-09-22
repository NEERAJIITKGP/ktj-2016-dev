jQuery('document').ready(function($) {
  $('.required').keyup(function() {
    var empty = false;
    $('.required').each(function() {
      if ($(this).val() === '') {
        empty = true;
      }
    });

    if (empty) {
      $('.send').prop('disabled', true);
      $('.send').css('background-color', '#ccc');
    } else {
      $('.send').prop('disabled', false);
      $('.send').css({
        'background-color': '#21759b',
        'color': '#ffffff'
      });
    }
  });
});