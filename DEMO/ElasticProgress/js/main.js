$(document).ready(function() {
		var e = new ElasticProgress(document.querySelectorAll('.Download')[0], {
				colorFg: "#ed7499",
				colorBg: "#635c73",
				highlightColor: "#ed7499",
				barHeight: 14,
				barInset: 10,
				fontFamily: "Indie Flower"
		});
		e.onClick(function() {
				e.open();
		})
		e.onOpen(function() {
				fakeLoading(e, 2, 1);
		});
		e.onFail(function() {
				e.close();
		})
		e.onComplete(function() {
			$('.box.box--centered').hide();
		})

		function fakeLoading($obj, speed, failAt) {
				if (typeof speed == "undefined") speed = 2;
				if (typeof failAt == "undefined") failAt = -1;
				var v = 0;
				var l = function() {
						if (failAt > -1) {
								if (v >= failAt) {
										if (typeof $obj.jquery != "undefined") {
												$obj.ElasticProgress("fail");
										} else {
												$obj.fail();
										}
										return;
								}
						}
						v += Math.pow(Math.random(), 2) * 0.1 * speed;

						if (typeof $obj.jquery != "undefined") {
								$obj.ElasticProgress("setValue", v);
						} else {
								$obj.setValue(v);
						}
						if (v < 1) {
								TweenMax.delayedCall(0.05 + (Math.random() * 0.14), l)
						}
				};
				l();
		}
});
