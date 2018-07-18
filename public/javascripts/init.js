(function ($) {
    $(function () {

        //initialize all modals
        $('.modal').modal();
        $('select').material_select();
        //now you can open modal from code
        // $('#modal1').modal('open');

        //or by click on trigger
       //  $('.trigger-modal').modal();

    }); // end of document ready
})(jQuery);