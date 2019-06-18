$(document).ready(function() {   
    
    $('.connectedSortable').on('click', 'li', function () {
        var staticGroup = ["disabled_item"];
        var selectedVal = $(this).attr('rel');
        
        var parentId = $(this).closest('ul').attr("id");
        var resetSelectedFields = 'sortable1';
        if (parentId == 'sortable1') {
            resetSelectedFields = 'sortable2';            
        }
        
        $("#"+resetSelectedFields).find("li").removeClass("multiple_selected");
        if (jQuery.inArray(selectedVal, staticGroup) !== -1) {
            return false;
        }
        $(this).toggleClass('multiple_selected');
    });
    
    $("#sortable1, #sortable2").sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();
    $("#sortable1, #sortable2").css('minHeight', $("#sortable1").height() + "px");

    $( "#sortable2" ).sortable({
        items: "li:not(.static)", 
        receive: function( event, ui ) {
            ui.item.after(ui.item.data('items'));
            if (ui.item.hasClass("sortable_disabled_item")) {
                ui.sender.sortable("cancel");
            } 
        },
        connectWith: 'ul.connectedSortable',
        opacity: 0.0,
        helper: function (e, item) {
            if(!item.hasClass('multiple_selected')) {                
                item.addClass('multiple_selected').siblings().removeClass('multiple_selected');
            }
            var elements = item.parent().children('.multiple_selected').clone();
            item.data('multidrag', elements).siblings('.multiple_selected').remove();
            var helper = $('<li/>');
            return helper.append(elements);
            
        },
        start: function (e, ui) {
            var elements = ui.item.siblings('.multiple_selected.hiddenli').not('.ui-sortable-placeholder');
            ui.item.data('items', elements);
        },        
        stop: function (e, ui) {
            var elements = ui.item.data('multidrag');
            ui.item.after(elements).remove();
            $("#sortable1").find('.multiple_selected').each(function() {
                var dropped_field_value = $(this).attr('rel');
            });
            $('.multiple_selected').removeClass('multiple_selected');
        },
        cancel: '.static'
    });

    $( "#sortable1" ).sortable({
        receive: function( event, ui ) {  
            ui.item.after(ui.item.data('items'));
        },
        connectWith: 'ul.connectedSortable',
        opacity: 0.0,
        helper: function (e, item) {
            if(!item.hasClass('multiple_selected')) {                
                item.addClass('multiple_selected').siblings().removeClass('multiple_selected');
            }
            
            var elements = item.parent().children('.multiple_selected').clone();
            item.data('multidrag', elements).siblings('.multiple_selected').remove();
            var helper = $('<li/>');
            return helper.append(elements);
        },
        start: function (e, ui) {
            var elements = ui.item.siblings('.multiple_selected.hiddenli').not('.ui-sortable-placeholder');
            ui.item.data('items', elements);
        },        
        stop: function (e, ui) {
            var elements = ui.item.data('multidrag');
            ui.item.after(elements).remove();
            $("#sortable2").find('.multiple_selected').each(function() {
                var dropped_field_value = $(this).attr('rel');  
            });
            $('.multiple_selected').removeClass('multiple_selected');                            
        }
    }); 
    
    $("#deselect_all_btn").click(function(){
       $("#sortable1").find("li").removeClass("multiple_selected"); 
       $("#sortable2").find("li").removeClass("multiple_selected"); 
    });
    
    $("#select_all_btn").click(function(){
       $("#sortable2").find("li").removeClass("multiple_selected"); 
       $("#sortable1").find("li:not(.sortable_disabled_item)").addClass("multiple_selected"); 
    });
    
    
    
    
});
