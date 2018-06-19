/**
 * Document loaded
 */
$(document).ready(function () {

    $('.js-submenu').each(function () {
        const $submenu = $(this);
        ['hover', 'click'].forEach(function(event) {
            $submenu.parents('.js-submenu-' + event)[event](toggle);
        });
        function toggle (e) {
            e.preventDefault();
            e.stopPropagation();
            $submenu.toggleClass('hidden');
        }
    });

});