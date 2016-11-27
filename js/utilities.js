// data  - {path:'/about'}
// (getOrPost, data, idForSpinner)
function myXhr(t, d, id){
    console.log("myXhr");
    return $.ajax({
        type: t,
        url: 'proxy.php', 
        dataType: 'xml', 
        data: d,
        cache: false,
        async: true,
        beforeSend: function(){
//            $(id).append('<img src="assets/img/gears.gif" class="spin"/>');
        }
        }).always(function(){ // always fires when it comes back, no matter what. so this is where we turn off the spinner
//        $(id).find('.spin').fadeOut(500, function(){
//            $(this).remove();
//        });
    }).fail(function(){
        //handle failure
    });
}
