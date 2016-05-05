/* global $ o2 Tag
 */
(function() {
	Tag.actions.playse.rules.o2_repeat = {type: "INT"};
	Tag.actions.playse.rules.o2_repeat_delay = {type: "TIME", defaultValue:0};

	var original = Tag.actions.playse.action;
	Tag.actions.playse.action = function(args) {

		if (args.loop) {
			if ('o2_repeat' in args) {
				o2.warn('loop=trueですからo2_repeatは無視されます。');
			}
			args.o2_repeat = Infinity;
		}

		var result = original.apply(this, arguments);

		if (!('o2_repeat' in args)) {
			return result;
		}

		if (args.o2_repeat <= 0) {
			this.warn("o2_repeatは0以上の数字じゃないとダメです");
			return result;
		}

		var currentCount = 0;
		var thisSound = o2.se[args.buf];

		if (!thisSound.loadDefer) {
			return result;
		}

		thisSound.loadDefer.done(function(audio) {
			// override the original end event
			$(audio).off();
			$(audio).one('ended', function audioEnded() {
				currentCount++;
				if (currentCount === args.o2_repeat) {
					thisSound.stop();
					$(thisSound).trigger('ended');
					delete thisSound.stop;
				} else {
					// loop
					setTimeout(function() {

						// stopped during delay wait
						if (currentCount === args.o2_repeat) return;

						$(audio).one('ended', audioEnded);
						audio.currentTime = 0;
						audio.play();
					}, args.o2_repeat_delay);
				}
			});
		});

		var originalStop = thisSound.stop;
		thisSound.stop = function() {
			originalStop.apply(this, arguments);
			currentCount = args.o2_repeat;
			delete thisSound.stop;
		};

		return result;
	};

})();