#Layout

Classes and utilities for layout and structure.

##Usage

### A basic 2 column layout
```html
      <div class="row">
            <div class="row__col"></div>
            <div class="row__col"></div>
      </div>
```
* Columns automatically size themselves evenly across the parent containers width
* Can take any number of columns from 1 onwards - simply add more .row__col children

### Set defined column widths
```html
      <div class="row">
            <div class="row__col"></div>
            <div class="row__col u-span25"></div>
      </div>
```   
* Sets the second column to be 300px wide
* The first column automatically sizes to the remaining width
* Works with both fixed width spans and fluid width spans, eg .u-span1of3 to set 1 column to be 33.33%
* Mix and match fixed and fluid width columns

### Vertically align column content
```html
      <div class="row row--align-middle">
            <div class="row__col"></div>
            <div class="row__col"></div>
      </div>
```    
### Set margins between columns
```html
      <div class="row row--gap-s">
            <div class="row__col"></div>
            <div class="row__col"></div>
      </div>
```     
* Column margins set using the clothing size notation
* `row--gap-s`   `.row--gap-m`     `.row--gap-l`
