#Box

* A simple container for content
* Use to set bottom margins globally

##Usage

### A basic box div

```html
<div class="box"></div>
```

* Columns automatically size themselves evenly across the parent containers width
* Can take any number of columns from 1 onwards - simply add more .row__col children

### Inline block version

```html
<div class="box--inline"></div>
```   

### Set a margin

```html
<div class="box box--s"></div>
```    

* Uses the clothing size notation for sizes
* `.box--s`   `.box--m`     `.box--l`

### Set an island around the content using padding

```html
<div class="box box--island-s"></div>
```

* Uses the clothing size notation for sizes
* `.box--moat-s`   `.box--moat-m`     `.box--moat-l`
