$(document).ready(function() {
  $('.ypreview').each(function() {
    var a = $(this).attr("href").match(/watch\?v=(.+)+/);
    a = a[1] + $.fn.qtip.nextid;
    $(this).qtip({
      content: $("<div />", {
        id: a
      }),
      position: {
        at: "top center",
        my: "bottom center",
        viewport: $(window)
      },
      show: {
        event: "click",
        solo: true,
        effect: function() {
          var b = this[0].style;
          b.display = "none";
          setTimeout(function() {
            b.display = "block"
          }, 1)
        }
      },
      hide: "unfocus",
      style: {
        classes: "ui-tooltip-youtube",
        width: 275
      },
      events: {
        render: function(c, b) {
          new YT.Player(a, {
            playerVars: {
              autoplay: 1,
              enablejsapi: 1,
              iv_load_policy: 3,
              origin: document.location.host
            },
            origin: document.location.host,
            height: 180,
            width: 275,
            videoId: a.substr(0, 11),
            events: {
              onReady: function(d) {
                b.player = d.target
              },
            }
          })
        },
        hide: function(c, b) {
          if (b.player && b.player.stopVideo) {
            b.player.stopVideo()
          }
        }
      }
    }).click(false)
  })
});