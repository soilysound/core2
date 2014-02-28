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
<?php
  include "search-lookup.json";

?>
 var input = document.querySelector('.nav-primary-search__input');
var autocomplete = document.querySelector('.nav-primary-search__autocomplete ul');


  function buildList(matches){
    var html = '';
    for(var i = -1;++i<matches.length;){
      html += '<li class="nav-primary-search__autocomplete-item"><a class="nav-primary-search__autocomplete-link" href="'+matches[i].itemLink+'">' + matches[i].t + '<br><small>' +  matches[i].itemLabel + '</small></a></li>';
    }

    autocomplete.innerHTML = html;


  }


  var matches = [];
  input.addEventListener('keyup', function(e){
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

    buildList(matches);
  }, false);

  input.addEventListener('keydown', function(e){

    if(e.keyCode === 9){
      console.log('tab');
    }

    if(e.keyCode === 38){
      console.log('arrow up');
    }

    if(e.keyCode === 40){
      console.log('arrow down');
    }



  })


</script>
</html>

