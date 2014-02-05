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
</head>

<body>

<!-- site header -->
<?php include "components/site-header.html"; ?>

<div class="wrap">

  <div class="grid site-layout-primary callfn" data-fn="site-layout-primary">

    <div class="grid__col site-layout-primary__col1">

    </div>

    <div class="grid__col site-layout-primary__col2">

    <!-- page nav -->
    <?php include "components/page-nav.html"; ?>

    <div class="nav-secondary-all__offset">
      <!-- main site 2 column layout -->
     <div class="grid site-layout-secondary box-gap">

        <div class="grid__col site-layout-secondary__col1">

          <!-- top story -->
          <?php include "components/top-story.html"; ?>


          <?php
          $display = "is-hidden--bp5";
          include "components/news-list-featured.html"; ?>

          <!-- news list -->
           <!-- featured stories -->
          <a href="#" class="block-header is-hidden--bp5 is-hidden--bp10">
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
            include "components/matches-block.html";
           ?>

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
            include "components/news-list-featured.html"; ?>

            <!-- secondary news list -->
            <?php
            $type = "";
            include "components/news-list-secondary.html"; ?>
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

            <div style="height:250px;background:#ccc;margin-bottom:24px">

            </div>

            <!-- mini table -->
            <a href="#" class="block-header--aside">
              <h2 class="block-header--aside__title">Premier League Table</h2>
            </a>
            <?php include "components/tables-block.html"; ?>

          </script>

        </div>

      </div>

      <div class="box site-layout-secondary">

        <!-- video block -->
        <a href="#" class="block-header">
          <h2 class="block-header__title">Video</h2>
        </a>
        <?php include "components/video-block.html"; ?>


      </div>
    </div>


    </div>
  </div>

</div>
</body>
<script src="/js/site.js"></script>

</html>
