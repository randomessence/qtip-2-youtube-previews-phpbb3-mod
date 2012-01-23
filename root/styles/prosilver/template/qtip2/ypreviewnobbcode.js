$(document).ready(function()
{
   // Use each method to gain access to all youtube links
   $('a[href*="youtube.com/watch"]').each(function()
   {
      // Grab video ID from the url
      var videoID = $(this).attr('href').match(/watch\?v=(.+)+/);
 
      /*
       * We'll also add a unique identifier to the end so we can have multiple tooltips
       * with the same youtube URL... awesome.
       */
      videoID = videoID[1] + $.fn.qtip.nextid;
 
      // Create our tooltip
      $(this).qtip(
      {
         // Stick in a dummy <div /> we can use to embed the player and set it's ID
         content: $('<div />', { id: videoID }),
         position: {
			at: "top center",
			my: "bottom center",
            viewport: $(window) // Keep it on-screen at all times if possible
         },
         show: {
            event: 'click', // Show it on click...
            solo: true, // ...and hide all others when its shown
            
            /*
             * Unfortunately for us, FF reloads iframe contents when any of its parents
             * visibility is toggled, meaning we lose the player API reference on first hide.
             * Luckily for us, setting and resetting the display property also causes the onReady
             * event of the API palyer to fire! Woop. So we'll just reload it manually.
             */
            effect: function() {
               var style = this[0].style;
               style.display = 'none';
               setTimeout(function() { style.display = 'block'; }, 1);
            }
         },
         hide: 'unfocus', // Hide when the tooltip loses focus
         style: {
            classes: 'ui-tooltip-youtube', // Use a custom tooltip class
            width: 275 // Set a static width
         },
         events: {
            render: function(event, api) {
               new YT.Player(videoID, {
                  playerVars: {
                     autoplay: 1,
                     enablejsapi: 1,
					 iv_load_policy: 3,
                     origin: document.location.host
                  },
                  origin: document.location.host,
                  height: 180,
                  width: 275,
                  videoId: videoID.substr(0, 11), // YouTube ID's are only 11 characters long :)
                  events: {
                     'onReady': function(e) {
                        // Store the player in the API
                        api.player = e.target;
                     },
                  }
               });
            },
            hide: function(event, api){
               // Pause the video when tooltip is hidden
               if(api.player && api.player.stopVideo) {
                  api.player.stopVideo();
               }
            }
         }
      })
      // Prevent the link from being followed when we click it
      .click(false)
   });
});