(function($) {
    "use strict";

    var tpj = jQuery;
    var revapi24;
	
	// Preloader 
	jQuery(window).on('load', function() {
		jQuery("#status").fadeOut();
		jQuery("#preloader").delay(550).fadeOut("slow");
	});
	
	// on ready function
    jQuery(document).ready(function($) {
		
	// Menu js for Position fixed
        $(window).scroll(function() {
            var window_top = $(window).scrollTop() + 1;
            if (window_top > 160) {
                $('.pd_navigation_wrapper').addClass('menu_fixed animated fadeInDown');
            } else {
                $('.pd_navigation_wrapper').removeClass('menu_fixed animated fadeInDown');
            }
        });
		
	// Filter Toggle
		$('.filter_btn').click(function() {
			$('#filter_form').slideToggle('fast').addClass( "demo" );
			$(this).val( $(this).val() == '+ Filter Option' ? '- Filter Option' : '+ Filter Option' );
			return false;
		});
	
	// Password SHow Hide js
    $(window).scroll(function() {
    if ($(this).scrollTop() >= 100) {       
        $('#return-to-top').fadeIn(200);   
    } else {
        $('#return-to-top').fadeOut(200);  
    }
});
    $('#return-to-top').click(function() {     
        $('body,html').animate({
            scrollTop : 0                
        }, 500);
    });


	
	// Video Auto Play js

	



	    $('#search_button').on("click", function(e) {
                  $('#search_open').slideToggle();
                  e.stopPropagation(); 
               });
               
               $(document).on("click", function(e){
                  if(!(e.target.closest('#search_open'))){  
                     $("#search_open").slideUp();        
                  }
                 });


    // fur_single_product_slider
      $('.fur_single_product_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:0,
                    nav:false,
                    autoplay:false,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        900:{
                            items:2
                        },
                        1000:{
                            items:3
                        }
                        
                    }
                });



        // fur_single_product_slider

      $('.cosmatics_testi_slider .owl-carousel').owlCarousel({
            loop:true,
            margin:0,
            nav:false,
            autoplay:false,
            navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
            dots:false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                900:{
                    items:1
                },
                1000:{
                    items:1
                }
                
            }
        });



		  // product slider
      $('.product_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:18,
                    nav:false,
                    autoplay:false,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        900:{
                            items:2
                        },
                        1000:{
                            items:4
                        },
                        1200:{
                            items:4
                        }
                    }
                });




          // mobile_product_slider

      $('.mobile_product_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:18,
                    nav:false,
                    autoplay:false,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        900:{
                            items:3
                        },
                        1000:{
                            items:4
                        },
                        1200:{
                            items:4
                        }
                    }
                });


                // mobile_seller_slider

                    $('.mobile_seller_slider .owl-carousel').owlCarousel({
                        loop:true,
                        margin:18,
                        nav:false,
                        autoplay:false,
                        navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                        dots:false,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:1
                            },
                            900:{
                                items:2
                            },
                            1000:{
                                items:3
                            },
                            1200:{
                                items:3
                            }
                        }
                    });



                    $('.discover_slider .owl-carousel').owlCarousel({
                        loop:true,
                        margin:18,
                        nav:false,
                        autoplay:false,
                        navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                        dots:false,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:1
                            },
                            900:{
                                items:1
                            },
                            1000:{
                                items:2
                            },
                            1200:{
                                items:2
                            }
                        }
                    });



           // poster_slider
      $('.poster_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:18,
                    nav:false,
                    autoplay:false,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        900:{
                            items:1
                        },
                        1000:{
                            items:1
                        },
                        1200:{
                            items:1
                        }
                    }
                });




            // post_slider
             $('.post_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:18,
                    nav:false,
                    autoplay:false,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        900:{
                            items:3
                        },
                        1000:{
                            items:4
                        }
                        
                    }
                });


	        // washing_slider
                 $('.washing_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:18,
                    nav:false,
                    autoplay:false,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        900:{
                            items:1
                        },
                        1000:{
                            items:3
                        }
                        
                    }
                });

                // camera_slider

                 $('.camera_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:18,
                    nav:false,
                    autoplay:false,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        900:{
                            items:1
                        },
                        1000:{
                            items:3
                        }
                        
                    }
                });

                 // related_post_slider

                 $('.related_post_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:18,
                    nav:false,
                    autoplay:false,
                    navText:["<i class='fas fa-arrow-left'></i>" , "<i class='fas fa-arrow-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        900:{
                            items:3
                        },
                        1000:{
                            items:4
                        }
                        
                    }
                });



                // testimonial_slider

                 $('.testimonial_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:0,
                    nav:false,
                    dots:true,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        1000:{
                            items:1
                        }
                    }
                });


                  // blog_slider

                 $('.blog_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:25,
                    nav:false,
                    autoplay:false,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        900:{
                            items:1
                        },
                        1000:{
                            items:2
                        }
                        
                    }
                });

                
                  // partner_slider

                 $('.partner_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:18,
                    nav:false,
                    autoplay:true,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        900:{
                            items:4
                        },
                        1000:{
                            items:5
                        }
                        
                    }
                });

                  // partner_slider

                 $('.mobile_partner_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:18,
                    nav:false,
                    autoplay:true,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        900:{
                            items:4
                        },
                        1000:{
                            items:5
                        }
                        
                    }
                });


                 // 
                 // delivery_slider

                 $('.delivery_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:18,
                    nav:false,
                    autoplay:true,
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        900:{
                            items:4
                        },
                        1000:{
                            items:5
                        }
                        
                    }
                });


                 
                 // 
                 $('.bz_home_slider .owl-carousel').owlCarousel({
                        loop:true,
                        margin:10,
                        nav:false,
                        autoplay:true,
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:1
                            },
                            1000:{
                                items:1
                            }
                        }
                    });

		  
            // offer_slider

                 $('.offer_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:0,
                    nav:false,
                    dots:false,
                    autoplay:true,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        1000:{
                            items:1
                        }
                    }
                });

                 // fur_testimonial_slider

                 $('.fur_testimonial_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:0,
                    nav:false,
                    dots:false,
                    autoplay:true,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        1000:{
                            items:1
                        }
                    }
                });

                 // new_blog_slider

                 $('.new_blog_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:0,
                    nav:false,
                    dots:false,
                    autoplay:true,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        1000:{
                            items:1
                        }
                    }
                });



                 // company_logo_slider

                 $('.company_logo_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:0,
                    nav:false,
                    dots:false,
                    autoplay:true,
                    responsive:{
                        0:{
                            items:2
                        },
                        600:{
                            items:3
                        },
                        1000:{
                            items:5
                        }
                    }
                });


                 // new_hot_deal_slider

                   $('.new_hot_deal_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:30,
                    nav:false,
                    autoplay:true,
                    navText:["<i class='fas fa-arrow-left'></i>" , "<i class='fas fa-arrow-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        1000:{
                            items:3
                        }
                    }
                });

                    // new_feature_slider

                   $('.new_feature_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:30,
                    nav:false,
                    autoplay:true,
                    navText:["<i class='fas fa-arrow-left'></i>" , "<i class='fas fa-arrow-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        1000:{
                            items:3
                        }
                    }
                });



                    // wins_testimonial_slider

                   $('.wins_testimonial_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:30,
                    nav:false,
                    autoplay:false,
                    navText:["<i class='fas fa-arrow-left'></i>" , "<i class='fas fa-arrow-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        1000:{
                            items:2
                        }
                    }
                });

 
                    // wins_update_slider

                   $('.wins_update_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:30,
                    nav:false,
                    autoplay:true,
                    navText:["<i class='fas fa-arrow-left'></i>" , "<i class='fas fa-arrow-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        1000:{
                            items:2
                        }
                    }
                });


                   // mobile_post_slider

                   $('.mobile_post_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:30,
                    nav:false,
                    autoplay:true,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    dots:false,
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        1000:{
                            items:2
                        }
                    }
                });


                     // best seller slider

                $('.best_slider .owl-carousel').owlCarousel({
                    loop:true,
                    margin:18,
                    nav:false,
                    autoplay:false,
                    navText:["<i class='fa fa-angle-left'></i>" , "<i class='fa fa-angle-right'></i>"],
                    dots:false,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        900:{
                            items:2
                        },
                        1000:{
                            items:3
                        },
                        1200:{
                            items:3
                        }
                    }
                });



                // 
                
    // scrolling animation js
    
     var $winW = function() {
        return $(window).width();
    };
    var $winH = function() {
        return $(window).height();
    };
    var $screensize = function(element) {
        $(element).width($winW()).height($winH());
    };
    var screencheck = function(mediasize) {
        if (typeof window.matchMedia !== "undefined") {
            var screensize = window.matchMedia("(max-width:" + mediasize + "px)");
            if (screensize.matches) {
                return true;
            } else {
                return false;
            }
        } else {
            if ($winW() <= mediasize) {
                return true;
            } else {
                return false;
            }
        }
    };
            $('.animated-row').each(function() {
                var $this = $(this);
                $this.find('.animate').each(function(i) {
                    var $item = $(this);
                    var animation = $item.data('animate');
                    $item.on('inview', function(event, isInView) {
                        if (isInView) {
                            setTimeout(function() {
                                $item.addClass('animated ' + animation).removeClass('animate');
                            }, i * 50);
                        } else if (!screencheck(767)) {
                            $item.removeClass('animated ' + animation).addClass('animate');
                        }
                    });
                });
            });
    


                    // accordian

                $(document).ready(function(){
                        // Add minus icon for collapse element which is open by default
                        $(".collapse.show").each(function(){
                            $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
                        });
                        
                        // Toggle plus minus icon on show hide of collapse element
                        $(".collapse").on('show.bs.collapse', function(){
                            $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
                        }).on('hide.bs.collapse', function(){
                            $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
                        });
                    });





                // map

                





	/*--- Responsive Menu Start ----*/

$("#toggle").on("click", function(){
  var w = $('#sidebar').width();
  var pos = $('#sidebar').offset().left;
 
  if(pos == 0){
  $("#sidebar").animate({"left": -w}, "slow");
  }
  else
  {
  $("#sidebar").animate({"left": "0"}, "slow");
  }
  
});

$("#toggle_close").on("click", function(){
  var w = $('#sidebar').width();
  var pos = $('#sidebar').offset().left;
 
  if(pos == 0){
  $("#sidebar").animate({"left": -w}, "slow");
  }
  else
  {
  $("#sidebar").animate({"left": "0"}, "slow");
  }
  
});

(function($){
$(document).ready(function(){

$('#cssmenu li.active').addClass('open').children('ul').show();
	$('#cssmenu li.has-sub>a').on('click', function(){
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp(200);
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown(200);
			element.siblings('li').children('ul').slideUp(200);
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp(200);
		}
	});

});
})(jQuery);

//--------- scrolling animation js ----------//
			
			 var $winW = function() {
				return $(window).width();
			};
			var $winH = function() {
				return $(window).height();
			};
			var $screensize = function(element) {
				$(element).width($winW()).height($winH());
			};
			var screencheck = function(mediasize) {
				if (typeof window.matchMedia !== "undefined") {
					var screensize = window.matchMedia("(max-width:" + mediasize + "px)");
					if (screensize.matches) {
						return true;
					} else {
						return false;
					}
				} else {
					if ($winW() <= mediasize) {
						return true;
					} else {
						return false;
					}
				}
			};
            $('.animated-row').each(function() {
                var $this = $(this);
                $this.find('.animate').each(function(i) {
                    var $item = $(this);
                    var animation = $item.data('animate');
                    $item.on('inview', function(event, isInView) {
                        if (isInView) {
                            setTimeout(function() {
                                $item.addClass('animated ' + animation).removeClass('animate');
                            }, i * 50);
                        } else if (!screencheck(767)) {
                            $item.removeClass('animated ' + animation).addClass('animate');
                        }
                    });
                });
            });     
	
 });

})(jQuery);	