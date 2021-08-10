// tabs -------------------------------------------------------------------------------------

// horizontal

$('.tabs').each(function () {
  let tabswitch = $(this);
  tabswitch.find('.tabs__item').not(':eq(2)').hide();
  tabswitch.find('.tabs__btn').click(function () {
    tabswitch.find('.tabs__btn').removeClass('tabs__btn--is-active').eq($(this).index()).addClass('tabs__btn--is-active');
    tabswitch.find('.tabs__item').hide().eq($(this).index()).slideDown(500)
  }).eq(2).addClass('tabs__btn--is-active');
});



// vertical

$('.vertical-tabs').each(function () {
  let tabswitch = $(this);
  tabswitch.find('.vertical-tabs__item').not(':eq(2)').hide();
  tabswitch.find('.vertical-tabs__btn').click(function () {
    tabswitch.find('.vertical-tabs__btn').removeClass('vertical-tabs__btn--is-active').eq($(this).index()).addClass('vertical-tabs__btn--is-active');
    tabswitch.find('.vertical-tabs__item').hide(500).eq($(this).index()).show(500)
  }).eq(2).addClass('vertical-tabs__btn--is-active');
});