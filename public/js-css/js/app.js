$(document).foundation();

/*$("button[name*='test']").click(function(){
  //var form = $('form').serializeArray();
  var form = $("#file").prop('files')[0];
  console.log(form);
    /*var jsonData = {};
    jsonData.identification = $("input[name*='identification']").val();
    jsonData.name = $("input[name*='name']").val();
    jsonData.speciality = $("input[name*='speciality']").val();
    jsonData.phone = $("input[name*='phone']").val();
    jsonData.type = $("input[name*='type']:checked").val();
    jsonData.email = $("input[name*='email']").val();
    jsonData.password = $("input[name*='password']").val();
    jsonData.img = $("#file").prop('files')[0];*/
    /*const reader = new FileReader();
    reader.onloadend = (e) =>{
      jsonData.img = reader.result;
    };
    reader.readAsDataURL($("#file").prop('files')[0]);*/

    /*console.log(jsonData);
    console.log(jsonData.img);
    console.log(jsonData.name);
    $.post("/lawyer-web", form, function(data,status){
       alert("Data: " + data + "\nStatus: " + status);
    });
});*/
/*
  Switch actions
*/
$('.unmask').on('click', function(){

  if($(this).prev('input').attr('type') == 'password')
    changeType($(this).prev('input'), 'text');

  else
    changeType($(this).prev('input'), 'password');

  return false;
});

function changeType(x, type) {
  if(x.prop('type') == type)
  return x; //That was easy.
  try {
    return x.prop('type', type); //Stupid IE security will not allow this
  } catch(e) {
    //Try re-creating the element (yep... this sucks)
    //jQuery has no html() method for the element, so we have to put into a div first
    var html = $("<div>").append(x.clone()).html();
    var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"
    //If no match, we add the type attribute to the end; otherwise, we replace
    var tmp = $(html.match(regex) == null ?
      html.replace(">", ' type="' + type + '">') :
      html.replace(regex, 'type="' + type + '"') );
    //Copy data from old element
    tmp.data('type', x.data('type') );
    var events = x.data('events');
    var cb = function(events) {
      return function() {
            //Bind all prior events
            for(i in events)
            {
              var y = events[i];
              for(j in y)
                tmp.bind(i, y[j].handler);
            }
          }
        }(events);
        x.replaceWith(tmp);
    setTimeout(cb, 10); //Wait a bit to call function
    return tmp;
  }
}


