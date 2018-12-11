$(function() {
  let swap = true
  $(window).on('scroll', function() {
    // console.log($(this).scrollTop())
    if ($(this).scrollTop() > 62) {
      if (swap) {
        $('.navbar').hide()
        $('.navbar').slideDown(400)
      }
      $('.navbar').addClass('fixed-top')
      swap = false
    } else if ($(this).scrollTop() == 0) {
      $('.navbar').removeClass('fixed-top')
      if (!swap) {
        $('.navbar').hide()
        $('.navbar').slideDown(200)
      }
      swap = true
    }
  })
})
