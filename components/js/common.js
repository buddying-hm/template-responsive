$(function(){
	// #で始まるアンカーをクリックした場合に処理
	$('a[href^=#]').click(function() {
		// スクロールの速度
		var speed = 400; // ミリ秒
		// アンカーの値取得
		var href= $(this).attr("href");
		// 移動先を取得
		var target = $(href == "#" || href == "" ? 'html' : href);
		// 移動先を数値で取得
		var position = target.offset().top;
		// スムーススクロール
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});

	// scrollしてスライディング表示
	var tablet = 1024;
	if ($(window).width() > tablet) {
		$(window).on('scroll', function () {
			$('.sliding').each(function() {
				var elemPos = $(this).offset().top;
				var scroll = $(window).scrollTop();
				var windowHeight = $(window).height();
				if (scroll > elemPos - windowHeight) {
					$(this).addClass('action');
				}
			});
		});
	} else {
		//mobile size
		$('.sliding').each(function() {
			$(this).addClass('action');
		});
	}
});