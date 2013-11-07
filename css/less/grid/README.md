#Layout

Classes and utilities for layout and structure.

##Usage

### A basic 2 column layout
```html
<div class="grid">
      <div class="grid__col"></div>
      <div class="grid__col"></div>
</div>
```
* Columns automatically size themselves evenly across the parent containers width
* Can take any number of columns from 1 onwards - simply add more .grid__col children

### Set defined column widths
```html
<div class="grid">
      <div class="grid__col"></div>
      <div class="grid__col u-span25"></div>
</div>
```
* Sets the second column to be 300px wide
* The first column automatically sizes to the remaining width
* Works with both fixed width spans and fluid width spans, eg .u-span1of3 to set 1 column to be 33.33%
* Mix and match fixed and fluid width columns

### Vertically align column content
```html
<div class="grid grid--align-middle">
      <div class="grid__col">I am vertically aligned</div>
      <div class="grid__col">I am vertically aligned too</div>
</div>
```

### Horizontally and vertically aligned content
```html
<div class="grid grid--align-middle">
      <div class="grid__col">
      		<div class="overlay-box grid--align-middle__center">
      		      I am vertically and horizontally aligned
      		</div>
      </div>
</div>
```
* Requires a height to be set on the `.grid` container


### Set margins between columns
```html
<div class="grid grid--gap-s">
      <div class="grid__col"></div>
      <div class="grid__col"></div>
</div>
```
* Column margins set using the clothing size notation
* `grid--gap-s`   `.grid--gap-m`     `.grid--gap-l`


### collapsing columns
```html
<div class="grid grid--collapse-bp20">
      <div class="grid__col"></div>
      <div class="grid__col"></div>
</div>
```
* This layout will collapse into 1 column at breakpoint 20.
* If `.grid--collapse-bp20` is set, this will cascade to breakpoint 30 too. To just target breakpoint 30, use `.grid--collapse-bp30`


### swap column order
```html
<div class="grid grid--swap-order">
      <div class="grid__col"></div>
      <div class="grid__col"></div>
</div>
```
* This built in function is limited to 2 columns to maintain compatibility with IE8 and 9
* Swaps columns so 1:2 is 2:1
* Will also vertically if the columns are collapsed into rows using `.grid--collapse-bp20` or `.grid--collapse-bp30`
* Row reordering does not work in IE8 and 9
