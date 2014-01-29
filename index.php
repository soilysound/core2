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
<div class="wrap">
  <div class="grid site-layout-primary">

    <div class="grid__col site-layout-primary__col1">
      mob nav

    </div>

    <div class="grid__col site-layout-primary__col2">



      <!-- main site 2 column layout -->
     <div class="grid site-layout-secondary">

        <div class="grid__col site-layout-secondary__col1">

          <!-- top story -->
          <?php include "components/top-story.html"; ?>

          <!-- news list -->
          <?php include "components/news-list.html"; ?>

          <!-- hot picks -->
          <?php include "components/feature-block.html"; ?>


        </div>

        <div class="grid__col site-layout-secondary__col2">
          2

        </div>

        <div class="grid__col site-layout-secondary__col3">
          3

        </div>

      </div>

      <div class="box">

        <!-- video block -->
        <?php include "components/video-block.html"; ?>


      </div>



    </div>
  </div>

</div>
</body>
<script src="/js/site.js"></script>

</html>
