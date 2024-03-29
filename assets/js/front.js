// Set date in UTC to end counter at the same time in all countries.
// Spain time is 2017 10 14 18:30:00:00 UTC is + 2, so in utc 2017 10 14 16:30:00:00
var targetDate = new Date(Date.UTC(2017,9,14, 16, 30, 0, 0));

$(function () {
    animations();
    fullScreenContainer();
    sliders();
    utils();
    sliding();
});

$(window).load(function () {
    windowWidth = $(window).width();
    $(this).alignElementsSameHeight();

});
$(window).resize(function () {
    newWindowWidth = $(window).width();

    if (windowWidth !== newWindowWidth) {
        setTimeout(function () {
            $(this).alignElementsSameHeight();
            fullScreenContainer();
            waypointsRefresh();
        }, 205);
        windowWidth = newWindowWidth;
    }
});


/* =========================================
 * sliders 
 *  =======================================*/

function sliders() {
    if ($('.owl-carousel').length) {

        $(".testimonials").owlCarousel({
            items: 4,
            itemsDesktopSmall: [1170, 3],
            itemsTablet: [970, 2],
            itemsMobile: [750, 1]
        });
    }

}


/* =========================================
 *  animations
 *  =======================================*/

function animations() {
    if (Modernizr.csstransitions) {
        delayTime = 0;
        $('[data-animate]').css({opacity: '0'});
        $('[data-animate]').waypoint(function (direction) {
            delayTime += 150;
            $(this).delay(delayTime).queue(function (next) {
                $(this).toggleClass('animated');
                $(this).toggleClass($(this).data('animate'));
                delayTime = 0;
                next();
                //$(this).removeClass('animated');
                //$(this).toggleClass($(this).data('animate'));
            });
        },
                {
                    offset: '95%',
                    triggerOnce: true
                });
        $('[data-animate-hover]').hover(function () {
            $(this).css({opacity: 1});
            $(this).addClass('animated');
            $(this).removeClass($(this).data('animate'));
            $(this).addClass($(this).data('animate-hover'));
        }, function () {
            $(this).removeClass('animated');
            $(this).removeClass($(this).data('animate-hover'));
        });
    }

}

/* =========================================
 * sliding 
 *  =======================================*/

function sliding() {
    $('.scrollTo, #navigation a').click(function (event) {
        event.preventDefault();
        var full_url = this.href;
        var parts = full_url.split("#");
        var trgt = parts[1];

        $('body').scrollTo($('#' + trgt), 800, {offset: -80});

    });
}

/* =========================================
 * full screen intro 
 *  =======================================*/

function fullScreenContainer() {

    var screenWidth = $(window).width() + "px";
    var screenHeight = '';
    if ($(window).width() > 1000) {
        screenHeight = $(window).height() + "px";
    } else {
        screenHeight = "auto";
    }

    $("#intro, #intro .item").css({
        width: screenWidth,
        height: screenHeight
    });
}


/* =========================================
 *  UTILS
 *  =======================================*/

function utils() {

    /* tooltips */

    $('[data-toggle="tooltip"]').tooltip();

    /* external links in new window*/

    $('.external').on('click', function (e) {

        e.preventDefault();
        window.open($(this).attr("href"));
    });
    /* animated scrolling */

}

$.fn.alignElementsSameHeight = function () {
    $('.same-height-row').each(function () {

        var maxHeight = 0;
        var children = $(this).find('.same-height');
        children.height('auto');
        if ($(window).width() > 768) {
            children.each(function () {
                if ($(this).innerHeight() > maxHeight) {
                    maxHeight = $(this).innerHeight();
                }
            });
            children.innerHeight(maxHeight);
        }

        maxHeight = 0;
        children = $(this).find('.same-height-always');
        children.height('auto');
        children.each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).innerHeight();
            }
        });
        children.innerHeight(maxHeight);
    });
}

/* refresh scrollspy */
function scrollSpyRefresh() {
    setTimeout(function () {
        $('body').scrollspy('refresh');
    }, 1000);
}

/* refresh waypoints */
function waypointsRefresh() {
    setTimeout(function () {
        $.waypoints('refresh');
    }, 1000);
}

/* ajax contact form */

function contactForm() {
    $("#contact-form").submit(function () {

        var url = "contact.php"; // the script where you handle the form input.

        $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(), // serializes the form's elements.
            success: function (data)
            {
                var messageAlert = 'alert-' + data.type;
                var messageText = data.message;
                var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable animated bounceIn"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                if (messageAlert && messageText) {
                    $('#contact-form').find('.messages').html(alertBox);
                }
            }
        });
        return false; // avoid to execute the actual submit of the form.
    });
}

/* =========================================
 *  COUNTDOWN
 *  =======================================*/
$('#countdown').countdown(targetDate, function(event) {
  var $this = $(this).html(event.strftime(''
    + '<div class="col-xs-3 col-md-2 col-md-offset-2"><h2 class="text-center"><strong>%D</strong></h2><p>dias</p></div>'
    + '<div class="col-xs-3 col-md-2"><h2 class="text-center"><strong>%H</strong></h2><p>horas</p></div>'
    + '<div class="col-xs-3 col-md-2"><h2 class="text-center"><strong>%M</strong></h2><p>min</p></div>'
    + '<div class="col-xs-3 col-md-2"><h2 class="text-center"><strong>%S</strong></h2><p>seg</p></div>'));
});

/* =========================================
 *  MAP
 *  =======================================*/
function initMap() {
    var myLatLng = {lat: 39.4884388, lng: -0.3254504};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'La Ferradura'
    });

    marker.addListener('click', function() {
        map.setZoom(15);
        map.setCenter(marker.getPosition());
    });

}