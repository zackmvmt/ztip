#Z Tip: A Super Simple Tooltip System
ztip is a very simple tooltip system that allows for some basic styles,
without all the fluff that other solutions provide.

##How to use
Before using the plugin, make sure that you have it included in the head as well as 
jQuery (only dependancy).

First, you need to add a title to the element you would like to have a tooltip. Ztip
Handle removing this so you don't have to worry about default browser tootips:
```html
<div class="tip" title="This is a cool tooltip">rollover this!</div>
```
To actually make the tooltips, simply call the `ztip()` when the DOM and jQuery are loaded.
```js
$('.tip').ztip();
```

##Optional Customization
The `ztip()` function can accept a number of different options (in the form of an object)
that will allow you to alter the animation and look of the tooltips:
* speed [number (ms)]: how fast the tip animation is (300 default, 0 for instant)
* delay [number (ms)]: how long before the animation starts (400 default, 0 for instant)
* bgColor [string]: convenience property for changing the background color
* css [object]: a key/value hash of css attributes for the main box
* carrot [object]: a key/value hash of css attributes for the carrrot