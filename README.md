# pageCached
A module that calls a specific function, depending on whether the page is cached or not.


The script uses cookies to determine when to visit the page. And the generated meta tag that contains the time of the last caching of the page in timestamp UTC.

## How to use? ##

Add to head page.

```html
<meta name="site:cache-page-time" content="{timestamp}">
```

Where **{timestamp}** is the time of the last page change in the timestamp format **UTC**

Initialize the script.
```javascript
pageCached(
    function () {
        //Not cached page
    },
    function () {
        //Page is cached
    }
);
```
## Example ##
```php
    <?php
    $utc_str = gmdate("M d Y H:i:s", time());
    $utc = strtotime($utc_str);
    ?>

    <meta name="site:cache-page-time" content="<?= $utc ?>">
```


```javascript
(function (d) {
    var preload = d.getElementById('preloader');
    var body = d.getElementById('body');

    pageCached(
        function () {
            window.onload = function(){
                setTimeout(function(){
                    preload.remove()
                },1300)
            };
        },
        function () {
            preload.remove();
            console.log('Page is cached');
        }
    );
})(document);
```

```html
<div id="preloader">Loading...</div>
```