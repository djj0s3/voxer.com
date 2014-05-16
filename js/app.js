// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$(document).foundation({
  equalizer: {
    equalize_on_stack: true
  }
});

//show/reveal toggle
$( ".toggle" ).click(function(e) {
	e.preventDefault();
  $( this ).next( '.toToggle' ).toggle( "slow", function() {
    // Animation complete.
  });
});