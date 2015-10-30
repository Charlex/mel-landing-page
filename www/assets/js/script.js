$(document).ready(function(){

  var background_images = [
    "assets/img/background/gas-mask.jpg",
    "assets/img/background/pool-sharks.jpeg",
    "assets/img/background/trains-1.jpg",
    "assets/img/background/trains-2.jpg",
    "assets/img/background/wasteland-1.jpg",
    "assets/img/background/wasteland-2.jpg",
    "assets/img/background/wasteland-3.jpg",
  ];

  var background = background_images[Math.floor(Math.random() * background_images.length)];

  $('body').css({'background-image': "url(" + background + ")"}).animate({"opacity": 1});

  /* SVG LOGO FALLBACK */
  function svgasimg() {
    return document.implementation.hasFeature(
      "http://www.w3.org/TR/SVG11/feature#Image", 
      "1.1"
    );
  }
  if (!svgasimg()){
    var e = document.getElementsByTagName("img");
    if (!e.length){
      e = document.getElementsByTagName("IMG");
    }
    for (var i=0, n=e.length; i<n; i++){
      var img = e[i],
          src = img.getAttribute("src");
      if (src.match(/svgz?$/)) {
        /* URL ends in svg or svgz */
        img.setAttribute(
          "src", 
          img.getAttribute("data-fallback")
        );
      }
    }    
  }


});
