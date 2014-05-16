$(function(){
			$(".more-info-container .more-info-button, .hide-info-button").click(function(){
				$(this).closest('.product').toggleClass('show-info');
			})
			// Hide all the buy now pop ups if the person clicks the more info button
			$(".button-container .more-info-button, .hide-info-link").click(function(){
				$(this).closest('.left-featured, .right-featured').toggleClass('show-info');
					$(".buy-now-email-container").each(function(){
						$(this).fadeOut(100);
					});
			})
			// Show the buy now pop for the featured items
			$(".button-container > .buy-now-button").click(function(){
				$(this).closest('.individual-featured').find('.buy-now-email-container').fadeToggle(250);
			});
			// Show the buy now pop for the featured items when they are viewing more info
			$(".product-details > .buy-now-button").click(function(){
				$(this).closest('.product-details').find('.buy-now-email-container').fadeToggle(250);
			});
			// Show the buy now pop for the small items when they are viewing more info
			$(".product > .buy-now-button").click(function(){
				$(this).next('.buy-now-email-container').fadeToggle(250);
			});
			// Track mixpanel event for buy now click
			$(".buy-now-button").click(function(){
				var product = $(this).attr('product');
				mixpanel.track("store/buy_now", {
				    "product": product
				});
			});
			// Track mixpanel event for more info click
			$(".more-info-button").click(function(){
				var product = $(this).attr('product');
				mixpanel.track("store/more-info", {
				    "product": product
				});
			});
			// Make a mixpanel person and save their email address when they request to be notified
			$(".notify-me").click(function(){
				var input_form = $($(this).closest('.buy-now-email-container').find('input'));
				var product = input_form.attr('product');
				var currentdate = new Date();
				if(input_form.val().length > 5){
					mixpanel.track("store/notify", {
					    "product": product
					});
					var email = input_form.val();
					mixpanel.people.set_once({
					    $email: email,
					    $created:currentdate
					});
					mixpanel.people.append('product_to_notify', product);
				}
				mixpanel.identify(email);
				$(this).fadeOut(200, function(){
					$(this).next(".thanks").fadeIn();
				})
				input_form.fadeOut(200);
			});
			// Hide the buy now popup if you click out of it
			$(document).mouseup(function (e){
			    var container = $(".buy-now-email-container");

			    if ((!container.is(e.target) // if the target of the click isn't the container...
			        && container.has(e.target).length === 0) && !$(".buy-now-button").is(e.target)) // ... nor a descendant of the container
			    {
			        container.fadeOut(250);
			    }
			});
		});