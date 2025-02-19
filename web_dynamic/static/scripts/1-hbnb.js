$(() => {
    const amenidict = {};
    $(':checkbox').css('margin-right', '10px');
    $(':checkbox').change(() => {
      if (this.checked) {
        amenidict[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenidict[$(this).data('id')];
      }
      if ($.isEmptyObject(amenidict)) {
        $('.amenities h4').html('&nbsp');
      } else {
        $('.amenities h4').text(Object.values(amenidict).join(', '));
      }
    });
  });
