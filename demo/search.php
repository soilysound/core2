<?php
  $blank_image = "data:image/gif;base64,R0lGODdhAQABAPAAAO7u7gAAACH/C1hNUCBEYXRhWE1QAyI/PgAsAAAAAAEAAQAAAgJEAQA7";
?>
<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8">
    <title>Football Homepage</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Scorecentre">
    <meta name="application-name" content="SkySports">
    <meta name="viewport" id="viewport" content="width=device-width,maximum-scale=1,minimum-scale=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <link rel="stylesheet" href="/css/core.css" type="text/css">
    <script src="/js/head.js"></script>
    <style>
    .item-on {
      background:#aaa;
      }
      </style>
  </head>

  <body>
  <div class="nav-primary-search">
          <input class="nav-primary-search__input" type="text" autocapitalize="off" autocorrect="off" autocomplete="off" placeholder="Find Teams &amp; Competitions">
          <button type="submit" class="nav-primary-search__button"><span class="nav-primary-search__button-text">submit</span></button>
          <div class="nav-primary-search__autocomplete">
            <ul>

            </ul>
          </div>
        </div>
  </body>
  <script src="/js/site.js"></script>
<script>
var searchTerms;
var script = document.createElement('script');
window.callback = function(json){
  searchTerms = json;
}

script.src = 'http://www1.skysports.com/watch/video/search?callback=callback';
document.head.appendChild(script);


 var input = document.querySelector('.nav-primary-search__input');
var autocomplete = document.querySelector('.nav-primary-search__autocomplete ul');
var links = autocomplete.getElementsByTagName('a');

  function buildList(matches){
    var html = '';
    for(var i = -1;++i<matches.length;){
      var onClass = '';
      if(i===0){
        onClass = 'item-on';
      };


      if(matches[i].error === true){
        html = "<li>NO MATCHES</li>";
      }
      else {
      html += '<li class="nav-primary-search__autocomplete-item"><a class="'+onClass+' nav-primary-search__autocomplete-link" href="'+matches[i].itemLink+'">' + matches[i].t + '<br><small>' +  matches[i].itemLabel + '</small></a></li>';
    }
    }

    autocomplete.innerHTML = html;


  }


  var matches = [];
  input.addEventListener('keyup', function(e){
    if(e.keyCode > 36 && e.keyCode < 41){
      return;
    }

    if(e.keyCode === 13){
      var selected = autocomplete.querySelector('.item-on');
      if(selected){
        location.href = selected.href;
        return;
      }
    }

    matches = [];
    var searchTerm = e.target.value;
    if(searchTerm.length < 1){
      buildList([]);
      return;
    }

    for(var i = -1;++i<searchTerms.terms.length;){
      var t = searchTerms.terms[i];
      var regex = new RegExp('^' + searchTerm + '', 'i')
      if(t.t.match(regex)){
        matches.push(t);
      }

    }
    if(matches.length){
    buildList(matches);
  }
  else {
    buildList([{t:'NO MATCHES', error:true}])
  }
  }, false);

  input.addEventListener('keydown', function(e){
     if(e.keyCode !== 38 && e.keyCode !== 40){
      return;
     }
     var visibleItems = [];
     for(var i = -1;++i<links.length;){
      if(links[i].offsetWidth){
        visibleItems.push(links[i])
      }
     }
    
    var iterator = 1;
    var reset = 0;

    if(e.keyCode === 38){
      iterator = -1;
      reset = visibleItems.length - 1;
    }

  
       for(var i = -1;++i<visibleItems.length;){
        
        if(visibleItems[i].classList.contains('item-on')){
          visibleItems[i].classList.remove('item-on');
          if(visibleItems[i + iterator]){
            visibleItems[i + iterator].classList.add('item-on');
          }
          else {
            visibleItems[reset].classList.add('item-on');
          }
          break;
        }
      }

  })


</script>
</html>

