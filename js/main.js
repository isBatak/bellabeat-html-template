$(function() {

    /* Youtube Lightbox */
    if (!isMobile.any){
        $(".fancybox-media").fancybox({
            openEffect  : 'none',
            closeEffect : 'none',
            width: 640,
            height: 360,
            helpers : {
                media : {}
            }
        });
    }

    /* Newsletter */
    var form = $('#newsletterForm'),
        sendBtn = form.find('#signUp'),
        serverMesage = $('<div>', { 'class' : 'server-message'});

    form.validator().on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            e.preventDefault();

            sendBtn.attr("disabled", true);

            var data = form.serializeJSON(),
                url = 'https://test.bellabeat.com/api/web/mailing-list/f04939c8-88c8-42cf-bd1c-a771177adc2c/subscribe';

            $.postJSON(url, data,
            function(data, textStatus, jqXHR) {
                serverMesage.html('Your email has been saved in our database!').removeClass('error').addClass('success');
                form.after(serverMesage);
                form.remove();
            },
            function(jqXHR, textStatus, errorThrown) {
                var response = $.parseJSON( jqXHR.responseText );
                switch (response.type) {
                    case 'DataIntegrityViolationException':
                        serverMesage.html(response.message).removeClass('success').addClass('error').appendTo(form);
                        break;
                    case 'BellabeatWebException':
                        serverMesage.html(response.message).removeClass('success').addClass('error').appendTo(form);
                        break;
                    default:
                        serverMesage.html(response.message).removeClass('success').addClass('error').appendTo(form);
                }

                sendBtn.removeAttr("disabled");
            });
        }
    });

    form.find('input').click(function () {
        serverMesage.remove();
    });

    $.postJSON = function(url, data, callbackSuccess, callbackError) {
        return jQuery.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': url,
            'data': data,
            'error': callbackError,
            'success': callbackSuccess
        });
    };
});
