$('.carousel').carousel();
$('.collapse').on('shown.bs.collapse', function () {
  headerDiv = '#'+$(this).attr('aria-labelledby');
  $(headerDiv).toggleClass('active');
});

$('.collapse').on('hidden.bs.collapse', function () {
  headerDiv = '#'+$(this).attr('aria-labelledby');
  $(headerDiv).removeClass('active');
});


$ = jQuery;
  
//var mafs = $("#my-ajax-filter-search"); 
//var mafsForm = mafs.find("form"); 
  
// mafsForm.submit(function(e){
//     e.preventDefault(); 
  
//     console.log("form submitted");
  
// // we will add codes above this line later
// });
/**********SUNIL**********/


function myfilter(page_id=1){
	
	
        $("html").animate({ scrollTop: 400 }, "slow");

       
	
  var services = $('#services').val();
  var sector = $('#sector').val();
  var locations = $('#location').val();
  var servicesdata = $('#services').find(':selected').attr('data-location');
  var locationdata =  $('#location').find(':selected').attr('data-location');
  var sectordata = $('#sector').find(':selected').attr('data-sector');
   var globaldata = {
    action : "my_ajax_filter_search",
    services : services,
    location : locations,
    sector    : sector,
    page : page_id
    }
  $.ajax({
        url : ajax_url,
        dataType: "json",
        type: 'POST',
        data : globaldata,
        success : function(resp) {
      var response = resp.result;
      var pagination = resp.pagination;


            $("#ajax_fitler_search_results").html('');
       if(response!="" && response==="No post found"){
         $("#ajax_fitler_search_results").append("<p>No result found</p>");
       }else if(response) {
                     for(var i = 0 ;  i < response.length ; i++) {
                    
                      var html = ' <div class="col-md-6 col-sm-12 service-block">';
   
                      html += '<div class="aboutus-block " style="background:url('+response[i].img+');) no-repeat 0">';
                         html += '<a href="'+response[i].url+'"><span class="ser-title">'+response[i].title+'</span><br/><br/>';
                          html += '<div class="black-title">'+response[i].location_name+'</div><br/>';
                           html += '<div class="white-title">'+response[i].sector_name+'</div>';
                            html += '<div class="yellow-title">'+response[i].service_name+'</div>';
                            html += '</a>'
                            html += " </div>";
                            html += '</div>';
                        
                      $("#ajax_fitler_search_results").append(html);
                    }
          var pagindiv='<div class="col-md-12">'+pagination+'</div>';
                     $("#ajax_fitler_search_results").append(pagindiv);
            } else {
               console.log(resp);
                var html  = "<p>No matching movies found. Try a different filter or search keyword</p>";
                $("#ajax_fitler_search_results").append(html);
            }
        },
        error: function ( errorThrown ) {   // to develop in case of AJAX call error
                             console.log( errorThrown ); 
                        }
    }); 
	
	
  }
  /********/
$(document).ready(function(){

    if(window.location.pathname == '/projects/'){
        myfilter();
    }
//  
/****************BALU-KA-CODE**************
var sector = $('#sector').val();
var location = $('#location').val();
var locationdata =  $('#location').find(':selected').attr('data-location');
var sectordata = $(this).find(':selected').attr('data-sector');

 var globaldata = {
    action : "my_ajax_filter_search",
    location : location,
    sector    : sector
  }
  $.ajax({
        url : ajax_url,
        dataType: "json",
        type: 'POST',
        data : globaldata,
        success : function(response) {
            $("#ajax_fitler_search_results").empty();
       if(response!="" && response==="No post found"){
         $("#ajax_fitler_search_results").append("<p>"+response+"</p>");
       }else if(response) {
                     for(var i = 0 ;  i < response.length ; i++) {
                      var html = ' <div class="col-md-6 col-sm-12 service-block">';
                      html += '<div class="aboutus-block " style="background:url('+response[i].img+');) no-repeat 0">';
                         html += '<a href="'+response[i].url+'"><span class="ser-title">'+response[i].title+'</span></a><br/><br/>';
                         html += " </div>";


                          html += '<div style="position:absolute; padding: 3%; background-color: #FEDC00; top: 20%; left: 4%;">'+locationdata+'</div><br/>';
                           html += '<div style="position:absolute; padding: 3%; background-color: #FEDC00; top: 40%; left: 4%;">'+sectordata+'</div>';
                          html += " </div>";
                        
                      $("#ajax_fitler_search_results").append(html);
                    }
                
            } else {
               console.log('hifdfdf');
                var html  = "<p>No matching movies found. Try a different filter or search keyword</p>";
                $("#ajax_fitler_search_results").append(html);
            }
        },
        error: function ( errorThrown ) {   // to develop in case of AJAX call error
                             console.log( errorThrown ); 
                        }
    });


// END load


$("#location").click(function() {
    var locationid = $(this).val();
    //alert(locationid);
    var locationdata = $(this).find(':selected').attr('data-location');
     var sectordata = $('#sector').find(':selected').attr('data-sector');
    var data = {
    action : "my_ajax_filter_search",
    location : locationid,
    sector    : $('#sector').val()
  }
    $.ajax({
        url : ajax_url,
        dataType: "json",
        type: 'POST',
        data : data,
        success : function(response) {
            $("#ajax_fitler_search_results").empty();
             console.log('hi'+response);
           if(response!="" && response==="No post found"){
         $("#ajax_fitler_search_results").append("<p>"+response+"</p>");
       }else if(response){
                  
                 //$('#defaultserviceblock').hide();
                     for(var i = 0 ;  i < response.length ; i++) {

                      var html = ' <div class="col-md-6 col-sm-12 service-block">';

                      html += '<div class="aboutus-block " style="background:url('+response[i].img+');) no-repeat 0">';
                         html += '<a href="'+response[i].url+'"><span class="ser-title">'+response[i].title+'</span></a>';
                         html += " </div>";
                          html += '<div style="position:absolute; padding: 3%; background-color: #FEDC00; top: 20%; left: 4%;">'+locationdata+'</div><br/>';
                           html += '<div style="position:absolute; padding: 3%; background-color: #FEDC00; top: 40%; left: 4%;">'+sectordata+'</div>';
                          html += " </div>";
                        
                      $("#ajax_fitler_search_results").append(html);
                    }
                
            } else {
               console.log('hifdfdf');
                var html  = "<p>No matching movies found. Try a different filter or search keyword</p>";
                $("#ajax_fitler_search_results").append(html);
            }
        },
        error: function ( errorThrown ) {   // to develop in case of AJAX call error
                             console.log( errorThrown ); 
                        }
    });
    
 }); 




 $("#sector").click(function() {
    var sectorid = $(this).val();
    //alert(sectorid);

     var sectordata = $(this).find(':selected').attr('data-sector');
      var locationdata = $('#location').find(':selected').attr('data-location');
     //alert(sectordata);

     var data = {
    action : "my_ajax_filter_search",
    sector : sectorid,
    location    : $('#location').val()
}
    $.ajax({
        url : ajax_url,
        dataType: "json",
        type: 'POST',
        data : data,
        success : function(response) {
            $("#ajax_fitler_search_results").empty();
           if(response!="" && response==="No post found"){
         $("#ajax_fitler_search_results").append("<p>"+response+"</p>");
       }else if(response) {
                   //$('#defaultserviceblock').hide();
                     console.log(response);

                     for(var i = 0 ;  i < response.length ; i++) {

                      var html = ' <div class="col-md-6 col-sm-12 service-block">';

                      html += '<div class="aboutus-block " style="background:url('+response[i].img+');) no-repeat 0">';
                         html += '<a href="'+response[i].url+'"><span class="ser-title">'+response[i].title+'</span></a>';
                         html += " </div>";
                          html += '<div style="position:absolute; padding: 3%; background-color: #FEDC00; top: 20%; left: 4%;">'+locationdata+'</div><br/>';
                           html += '<div style="position:absolute; padding: 3%; background-color: #FEDC00; top: 40%; left: 4%;">'+sectordata+'</div>';
                          html += " </div>";
                        
                    $("#ajax_fitler_search_results").append(html);
                    }
                
            } else {
              console.log('fdfdsfdsf');
                var html  = "<p>No matching movies found. Try a different filter or search keyword</p>";
                $("#ajax_fitler_search_results").append(html);
            }
        } 
    });


    
 });  
*******************************/
jQuery(".loader").fadeOut(1000);
})