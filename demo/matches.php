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
  <div style="float:left;margin:10px;width:320px;background:#eee;padding:12px">
    Full version for football live blog
    <?php
    $matches_type = 'full';
    include "../components/matches-block.html"
    ?>

  </div>

   <div style="float:left;margin:10px;width:320px;background:#eee;padding:12px">
    mini version for footy homepage
    <?php
    $matches_type = 'mini';
    include "../components/matches-block.html"
    ?>

  </div>

  <div style="float:left;margin:10px;width:320px;background:#eee;padding:12px">
    mini table
    <?php
    $matches_type = 'mini';
    include "../components/tables-block.html"
    ?>

  </div>
  </body>
  <script src="/js/site.js"></script>

</html>
