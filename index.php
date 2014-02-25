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
      <a href="#" class="page-header__sponsor">
        <span class="page-header__sponsor-text">Sponsorsed by</span> <img src="/_sandbox/ford-logo.png" class="page-header__sponsor-image">
      </a>
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
          <div class="block-header is-hidden--bp5">
            <h2 class="block-header__title">
              <a href="#" class="block-header__link">Latest News</a>
            </h2>
            <a href="#link" class="block-header__related-link action-link">News Wire</a>
          </div>


          <?php
          $type = "news-list-secondary--2cols";
          include "components/news-list.html"; ?>

          <?php
          $type = "news-list-secondary--2cols is-hidden--bp20 is-hidden--bp30";
          include "components/news-list-secondary.html"; ?>

          <!-- matches block -->
          <div class="block-header block-header--no-gap is-hidden--bp5 is-hidden--bp10">
            <h2 class="block-header__title">
              <a href="#" class="block-header__link">Matches</a>
            </h2>
          </div>
          <?php
            $display = "is-hidden--bp10 is-hidden--bp5";
            $matches_type = 'mini';
            include "components/matches-block.html";
           ?>

          <!-- feature promos -->
          <div class="block-header is-hidden--bp10 is-hidden--bp5">
            <h2 class="block-header__title">
              <a href="#" class="block-header__link">Don't Miss</a>
            </h2>
          </div>
          <?php include "components/feature-promos.html"; ?>

           <div class="block-header">
            <h2 class="block-header__title">
              <a href="#" class="block-header__link">Sky Bet</a>
            </h2>
            <a href="#link" class="block-header__related-link action-link">More betting</a>
          </div>
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
            <div class="block-header-aside block-header--no-gap">
              <h2 class="block-header-aside__title">
                <a class="block-header-aside__link">Matches</a>
              </h2>
            </div>

            <?php
              $display = "";
              include "components/matches-block.html";
            ?>

            <!-- mpu -->
            <div style="height:600px;background:#ccc;margin-bottom:24px">
              <img src="_sandbox/halfpage-300x600.jpg" height="600">
            </div>

            <!-- feature promos -->
            <div class="block-header-aside block-header--no-gap">
              <h2 class="block-header-aside__title">
                <a class="block-header-aside__link">Don't Miss</a>
              </h2>
            </div>
            <?php include "components/feature-promos.html"; ?>

            <!-- mini table
            <div class="block-header--aside">
              <h2 class="block-header--aside__title">
                <a href="#" class="block-header--aside__link">League table</a>
              </h2>
            </div>
            <?php include "components/tables-block.html"; ?>
            -->

          </script>

        </div>

      </div>

      <div class="box site-layout-secondary">

         <!-- features block -->
        <div class="block-header">
          <h2 class="block-header__title">
            <a href="#" class="block-header__link">Features</a>
          </h2>
          <a href="#link" class="block-header__related-link action-link">link</a>
        </div>
        <?php
        $feature_block_type = "feature";
        include "components/video-block.html"; ?>

        <!-- video block -->
        <div class="block-header">
          <h2 class="block-header__title">
            <a href="#" class="block-header__link">Video</a>
          </h2>
          <a href="#link" class="block-header__related-link action-link">link</a>
        </div>
        <?php
        $feature_block_type = "video";
        include "components/video-block.html"; ?>

        <!-- opinion block -->
        <div class="block-header">
          <h2 class="block-header__title">
            <a href="#" class="block-header__link">Opinion</a>
          </h2>
          <a href="#link" class="block-header__related-link action-link">link</a>
        </div>
        <?php include "components/opinion-block.html"; ?>

        <!-- opinion block -->
       <div class="block-header">
          <h2 class="block-header__title">
            <a href="#" class="block-header__link">Photos</a>
          </h2>
          <a href="#link" class="block-header__related-link action-link">link</a>
        </div>
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
