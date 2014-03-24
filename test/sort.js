
$(document).ready(function(){
	$('.container').sort(
		function (a, b) {
  		return $(a).find('.terminal').data('sort') - $(b).find('.terminal').data('sort');
		})
	.each(function (_, container) {
  	$(container).parent().append(container);
});

})