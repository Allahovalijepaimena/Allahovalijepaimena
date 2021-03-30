var buttonSelector = 'a[href*="-popup"]';

var parseId = function (href) {
    return href.replace('-popup', '').replace('#', '');
};
window.onload = function () {
    $('body').on('click', buttonSelector, function (event) {
        var id = parseId(event.currentTarget.getAttribute('href'));
        var modalId = 'modal-' + id;
        if ($('#' + modalId).length === 0) {
            $('body').append('<div class="flex align-center align-vert modal modal--align" id="' + modalId + '">' +
                '    <div class="modal__container">' +
                '        <span class="modal__close modal__close--x" aria-hidden="true">×</span>' +
                '        ' + document.getElementById(id).outerHTML +
                '    </div>' +
                '</div>');
        }

        $('#' + modalId).addClass('modal--show');
    });

    var closeModal = function (modal) {
        modal.removeClass('modal--show');
        modal.addClass('modal--hide');
        var afterAnimation = function () {
            modal.removeClass('modal--hide');
        };
        // This listens for the CSS animations to finish and then hides the modal
        modal[0].addEventListener("webkitAnimationEnd", afterAnimation, false);
        modal[0].addEventListener("oAnimationEnd", afterAnimation, false);
        modal[0].addEventListener("msAnimationEnd", afterAnimation, false);
        modal[0].addEventListener("animationend", afterAnimation, false);
        setTimeout(afterAnimation, 400);
    }

    // Close the modal with any element with class 'modal__close'
    $('body').on('click', '.modal__close', function (e) {
        closeModal($(e.currentTarget).closest('.modal'));
    });
    // Click outside of the modal and close it
    window.onclick = function (e) {
        if ($(e.target).is('.modal')) {
            closeModal($(e.target));
        }
    }
    // Use the escape key to close modal
    document.onkeyup = function (e) {
        e = e || window.event;
        if (e.keyCode == 27 && $('.modal--show').length === 1) {
            closeModal($('.modal--show'));
        }
    }

    var myAudio = document.getElementById('ilahijaAudio');

    if (myAudio.duration > 0 && !myAudio.paused) {
        //Its playing...do your job
        $('.fa-play-circle-o').hide();
        $('.fa-pause-circle-o').fadeIn();
    } else {
        $('.fa-pause-circle-o').hide();
        $('.fa-play-circle-o').fadeIn();
        //Not playing...maybe paused, stopped or never played.
        myAudio.play();
    }

    /**Music section */
    $(".btn .fa-play-circle-o").on('click', function () {
        $(this).hide();
        $(".fa-pause-circle-o").fadeIn();
        $("#ilahijaAudio")[0].play();
    });

    $(".btn .fa-pause-circle-o").on('click', function () {
        $(this).hide();
        $(".fa-play-circle-o").fadeIn();
        $("#ilahijaAudio")[0].pause();
    });
};

document.addEventListener("DOMContentLoaded", function (event) {
    var buttons = document.querySelectorAll(buttonSelector);
    for (var i = 0; i < buttons.length; i++) {
        var section = document.getElementById(parseId(buttons[i].getAttribute('href')));
        if (section) {
            section.style.display = 'none';
        }
    }
});