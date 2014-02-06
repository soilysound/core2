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
      <div class="nav-primary-search">
        <input class="nav-primary-search-input" type="text" autocapitalize="off" autocorrect="off" autocomplete="off" placeholder="Search Sky Sports...">
      </div>
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
     <div class="grid site-layout-secondary box-gap">

        <div class="grid__col site-layout-secondary__col1">

          <!-- top story -->
          <?php include "components/top-story.html"; ?>


          <?php
          $display = "is-hidden--bp5";
          $nlftype = "full";
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

            <div class="box-gap" style="height:420px;background:#eee">
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

            <div style="height:250px;background:#ccc;margin-bottom:24px">
              <img src="_sandbox/mpu.jpg">
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
