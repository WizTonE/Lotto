$(document).ready(function() {
	/**
	* Global variables
	*/
	var completed = 0,
		imgHeight = 607,
		posArr = [
			0 //orange
			,68
			,136
			,204
			,272
			,340
			,408
			,476
			,544
		];
	
	var win = [];
	win[0] = win[454] = win[913] = 1;
	win[80] = win[539] = win[1000] = 2;
	win[165] = win[624] = win[1085] = 3;
	win[237] = win[696] = win[1157] = 4;
	win[310] = win[769] = win[1230] = 5;
	win[378] = win[837] = win[1298] = 6;

	/**
	* @class Slot
	* @constructor
	*/
	function Slot(el, max, step) {
		this.speed = 0; //speed of the slot at any point of time
		this.step = step; //speed will increase at this rate
		this.si = null; //holds setInterval object for the given slot
		this.el = el; //dom element of the slot
		this.maxSpeed = max; //max speed this slot can have
		this.pos = null; //final position of the slot	

		$(el).pan({
            fps:30,
            dir:'down'
        });
		$(el).spStop();
	}

	/**
	* @method start
	* Starts a slot
	*/
	Slot.prototype.start = function() {
		var _this = this;
		$(_this.el).addClass('motion');
		$(_this.el).spStart();
		_this.si = window.setInterval(function() {
			if(_this.speed < _this.maxSpeed) {
				_this.speed += _this.step;
				$(_this.el).spSpeed(_this.speed);
			}
		}, 100);
	};

	/**
	* @method stop
	* Stops a slot
	*/
	Slot.prototype.stop = function() {
		var _this = this,
			limit = 5;
		clearInterval(_this.si);
		_this.si = window.setInterval(function() {
			if(_this.speed > limit) {
				_this.speed -= _this.step;
				$(_this.el).spSpeed(_this.speed);
			}
			if(_this.speed <= limit) {
				_this.finalPos(_this.el);
				$(_this.el).spSpeed(0);
				$(_this.el).spStop();
				clearInterval(_this.si);
				$(_this.el).removeClass('motion');
				_this.speed = 0;
			}
		}, 100);
	};

	/**
	* @method finalPos
	* Finds the final position of the slot
	*/
	Slot.prototype.finalPos = function() {
		var el = this.el,
			el_id,
			pos,
			posMin = 2000000000,
			best,
			bgPos,
			i,
			j,
			k;

		el_id = $(el).attr('id');
		//pos = $(el).css('background-position'); //for some unknown reason, this does not work in IE
		pos = document.getElementById(el_id).style.backgroundPosition;
		console.log('el_id:'+el_id);
		console.log('pos:'+pos);
		pos = pos.split(' ')[1];
		pos = parseInt(pos, 10);
		console.log('pos:'+pos);
		console.log('posArr:'+posArr.length);
		for(i = 0; i < posArr.length; i++) {
			console.log('i:'+i);
			for(j = 0;;j++) {
				k = posArr[i] + (imgHeight * j);
				console.log('j:'+j);
				console.log('K:'+k);
				if(k > pos) {
					if((k - pos) < posMin) {
						posMin = k - pos;
						best = k;
						this.pos = posArr[i]; //update the final position of the slot
						console.log('posMin:'+posMin);
						console.log('best:'+best);
					}
					break;
				}
			}
		}

		best += imgHeight + 4;
		bgPos = "0 " + best + "px";
		console.log('best1:'+best);
		console.log('bgPos:'+bgPos);
		$(el).animate({
			backgroundPosition:"(" + bgPos + ")"
		}, {
			duration: 200,
			complete: function() {
				completed ++;
            }
		});
	};
	
	/**
	* @method reset
	* Reset a slot to initial state
	*/
	Slot.prototype.reset = function() {
		var el_id = $(this.el).attr('id');
        $._spritely.instances[el_id].t = 0;
		$(this.el).css('background-position', '0px 4px');
		this.speed = 0;
		completed = 0;
		$('#result').html('');
	};

	function enableControl() {
		$('#control').attr("disabled", false);
	}

	function disableControl() {
		$('#control').attr("disabled", true);
	}

	function printResult() {
		var res;
		if(win[a.pos] === win[b.pos] && win[a.pos] === win[c.pos]) {
			res = "You Win!";
		} else {
			res = "You Lose";
		}
		$('#result').html(res);
	}

	//create slot objects
	var a = new Slot('#slot1', 30, 1)

	/**
	* Slot machine controller
	*/
	$('#control').click(function() {
		var x;
		if(this.innerHTML == "Start") {
			a.start();
			this.innerHTML = "Stop";
			
			disableControl(); //disable control until the slots reach max speed
			
			//check every 100ms if slots have reached max speed 
			//if so, enable the control
			x = window.setInterval(function() {
				if(a.speed >= a.maxSpeed) {
					enableControl();
					window.clearInterval(x);
				}
			}, 100);
		} else if(this.innerHTML == "Stop") {
			a.stop();
			this.innerHTML = "Reset";

			disableControl(); //disable control until the slots stop
            
            //check every 100ms if slots have stopped
            //if so, enable the control
            x = window.setInterval(function() {
                if(a.speed === 0 ) {
                    enableControl();
                    window.clearInterval(x);
					//printResult();
                }
            }, 100);
		} else { //reset
			a.reset();
			this.innerHTML = "Start";
		}
	});
});
