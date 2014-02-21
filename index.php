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
  <!--[if IE 8]>
  <link rel="stylesheet" type="text/css" href="/css/ie8.css">
  <![endif]-->
  <script src="/js/head.js"></script>
  <style>
  .message {
    background: #ffcc00;
    color: black;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 99;
    padding: 12px;
    text-align: center;
    font-family: sans-serif
  }

  .chrome .message,
  .ios .message {
    display: none
  }

  .advert--banner {
    height: 120px;
    background: #f4f4f4;
    background-image: url(/_sandbox/banner-728x90.jpg);
    background-position: 50% 50%;
    background-repeat: no-repeat
  }

  @media all and (max-width: 1024px){
    .advert--banner {
      height: 110px;
    }

  }

  @media all and (max-width: 800px){
    .advert--banner {
      background-image: url(/_sandbox/banner-468x60.jpg);
      position: fixed;
      z-index: 2;
      height: 80px;
      bottom: 0;
      width: 100%;
    }
  }

  @media all and (max-width: 600px){
    .advert--banner {
      height: 50px;
      background-image: url(/_sandbox/banner-300x50.jpg);
    }
  }

  body:after {

    content: "";
    position: absolute;
    top: 1024px;
    width: 100%;
    height: 18px;
    background: red;
    opacity: 0;
    left: 0;
    display: block


  }

  </style>
</head>

<body>
<div class="message">
  This prototype should be viewed in chrome on a desktop and IOS on a mobile device
</div>
<!-- site header -->
<?php include "components/site-header.html"; ?>

<div class="advert--banner"></div>

<div class="wrap">

  <div class="grid site-layout-primary callfn" data-fn="site-layout-primary">

    <div class="grid__col site-layout-primary__col1">
      <?php include "components/primary-nav-mobile.html"; ?>
    </div>

    <div class="grid__col site-layout-primary__col2">

    <!-- page title -->
    <div class="page-header">
      <h1 class="page-header__title">
        Football
      </h1>
    </div>

    <!-- page nav -->
    <?php include "components/page-nav.html"; ?>

    <div class="nav-secondary-all__offset">
      <!-- main site 2 column layout -->
     <div class="grid site-layout-secondary block">

        <div class="grid__col site-layout-secondary__col1">

          <!-- top story -->
          <?php include "components/top-story.html"; ?>


          <?php
          $display = "";
          $nlftype = "full";
          include "components/news-list-featured.html"; ?>

          <!-- news list -->
           <!-- featured stories -->
          <a href="#" class="block-header is-hidden--bp5">
            <h2 class="block-header__title">More News</h2>
          </a>
          <?php
          $type = "news-list-secondary--2cols";
          include "components/news-list.html"; ?>

          <!-- matches block -->
          <a href="#" class="block-header block-header--no-gap is-hidden--bp10 is-hidden--bp5">
            <h2 class="block-header__title">Matches</h2>
          </a>
          <?php
            $display = "is-hidden--bp10 is-hidden--bp5";
            $matches_type = 'mini';
            include "components/matches-block.html";
           ?>
          <!-- feature promos -->
          <a href="#" class="block-header is-hidden--bp10 is-hidden--bp5">
            <h2 class="block-header__title">Don't Miss</h2>
          </a>
          <?php include "components/feature-promos.html"; ?>

          <a href="#" class="block-header">
            <h2 class="block-header__title">Features</h2>
          </a>
          <!-- hot picks -->
          <?php include "components/feature-block.html"; ?>


        </div>

        <div class="grid__col site-layout-secondary__col2 callfn adaptive-html" data-fn="adaptive-html">
          <script type="html/template">
            <!-- secondary news list -->
            <?php
              $display = "";
              $nlftype = "mini";
              include "components/news-list-featured.html";
            ?>

            <!-- secondary news list -->
            <?php
            $type = "";
            include "components/news-list-secondary.html"; ?>

            <div class="box-gap" style="height:423px;border:3px solid #eee;border-radius:5px;text-align: center;color: #aaa;padding-top: 200px;font-size: 20px;">
              sky bet
            </div>
          </script>
        </div>

        <div class="grid__col site-layout-secondary__col3 callfn adaptive-html" data-fn="adaptive-html">
          <script type="html/template">


            <!-- matches block -->
            <a href="#" class="block-header--aside block-header--no-gap">
              <h2 class="block-header--aside__title">Featured Matches</h2>
            </a>

            <?php
              $display = "";
              include "components/matches-block.html";
            ?>

            <!-- mpu -->
            <div style="height:600px;background:#ccc;margin-bottom:24px">
              <img src="_sandbox/halfpage-300x600.jpg" height="600">
            </div>

            <!-- feature promos -->
            <a href="#" class="block-header--aside block-header--no-gap">
              <h2 class="block-header--aside__title">Don't Miss</h2>
            </a>
            <?php include "components/feature-promos.html"; ?>

            <!-- mini table
            <a href="#" class="block-header--aside">
              <h2 class="block-header--aside__title">Premier League Table</h2>
            </a>
            <?php include "components/tables-block.html"; ?>
            -->

          </script>

        </div>

      </div>

      <div class="box site-layout-secondary">

        <!-- video block -->
        <a href="#" class="block-header">
          <h2 class="block-header__title">Video</h2>
        </a>
        <?php include "components/video-block.html"; ?>

        <!-- opinion block -->
        <a href="#" class="block-header">
          <h2 class="block-header__title">Opinion</h2>
        </a>
        <?php include "components/opinion-block.html"; ?>

        <!-- opinion block -->
        <a href="#" class="block-header">
          <h2 class="block-header__title">Photos</h2>
        </a>
        <?php include "components/photo-feature.html"; ?>


      </div>
    </div>


    </div>
  </div>

</div>
<?php include "components/site-footer.html"; ?>
</body>
<script src="/js/site.js"></script>

</html>
