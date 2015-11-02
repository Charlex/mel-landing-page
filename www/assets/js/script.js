(function() {

    var setup = function landing_page() {
        var _this = this;

        this.background_image_array = [
            "assets/img/background/gas-mask.jpg",
            "assets/img/background/pool-sharks.jpeg",
            "assets/img/background/trains-1.jpg",
            "assets/img/background/trains-2.jpg",
            "assets/img/background/wasteland-1.jpg",
            "assets/img/background/wasteland-2.jpg",
            "assets/img/background/wasteland-3.jpg",
        ];
        this.background_image_id = Math.floor(Math.random() * this.background_image_array.length);
        this.background_image = this.background_image_array[this.background_image_id];

        this.subscribe_to_list_api_endpoint = "https://fpsue7ygh4.execute-api.us-west-2.amazonaws.com/prod/ptdaiy";

        this.initialize = function() {
            this.change_background(this.background_image);
            this.fallback_svg_logo();
            this.create_subscribe_event_listeners();

            $('#logo').click(function(){
                var new_bg_array = JSON.parse(JSON.stringify(_this.background_image_array));
                new_bg_array.splice(_this.background_image_id, 1);
                _this.background_image_id = Math.floor(Math.random() * new_bg_array.length);
                _this.background_image = new_bg_array[_this.background_image_id];
                _this.change_background(_this.background_image);
            });
        };

        this.change_background = function(image_url) {
            $('body').css({
                'background-image': "url(" + image_url + ")"
            }).delay(750).animate({
                "opacity": 1
            });
        };

        this.create_subscribe_event_listeners = function() {
            $('#signup-form').submit(function(e) {
                e.preventDefault();
                $.ajax({
                    method: "POST",
                    crossDomain: true,
                    dataType: "json",
                    url: _this.subscribe_to_list_api_endpoint,
                    contentType: 'application/x-www-form-urlencoded',
                    data: JSON.stringify({
                        "email": "charley.bodkin@latimes.com"
                    })
                    // data: {
                    //     "email": "charley.bodkin@latimes.com"
                    // }
                })
                .success(function(msg) {
                    alert("Data Saved: " + msg);
                    console.log("You're now signed up and will receive the first email on November 9.");
                });
            });
        };

        this.fallback_svg_logo = function() {
            var browser_has_svg_support = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1");
            if (!browser_has_svg_support) {
                var e = document.getElementsByTagName("img");
                if (!e.length) {
                    e = document.getElementsByTagName("IMG");
                }
                for (var i = 0, n = e.length; i < n; i++) {
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
        };

    };
    window.landing_page = new setup();
})(window);

$(document).ready(function() {
    $("body").css({"opacity":0});
    landing_page.initialize();
});
