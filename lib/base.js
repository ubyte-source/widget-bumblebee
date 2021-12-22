(function (window) {

	'use strict';

	class Speech {

		static google() {
			return 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=$0';
		}
		static content() {
			return 'audioContent';
		}
		static female() {
			return 'female';
		}
		static male() {
			return 'male';
		}
		static diction() {
			let diction = {};

			diction[Speech.male()] = String.fromCharCode(100);
			diction[Speech.female()] = String.fromCharCode(97);

			return diction;
		}

		constructor(bubble) {
			this.bubble = bubble;
			this.apikey = null;

			this.elements = {};

			this.options = {};
			this.options.enable = false;
			this.options.voice = {};
			this.options.voice.voice = 'standard';

			this.xhr = {
				url: null,
				construct: new XMLHttpRequest(),
				error: 0,
				callback: {
					fail: null,
					success: null
				}
			};

			this.xhr.construct.addEventListener('load', this, false);
			this.xhr.construct.addEventListener('error', this, false);

			this.request = {};
			this.request.input = {};
			this.request.input.text = 'hello world!';
			this.request.voice = {};
			this.request.voice.languageCode = 'en-us';
			this.request.voice.name = 'en-us-standard-a';  // (string) Replaced by generate method
			this.request.voice.ssmlGender = this.constructor.female();
			this.request.audioConfig = {};
			this.request.audioConfig.audioEncoding = 'mp3';
		}

		clone(speech) {
			if (false === (speech instanceof window.Bumblebee.Bubble.Speech)) return this;

			this.setAPIKey(speech.getAPIKey());
			this.setEnable(speech.getEnable());

			this.request = speech.generate().getRequest();

			return this;
		}
		getBubble() {
			return this.bubble;
		}
		setVoice(standard) {
			this.options.voice = standard;
			return this;
		}
		getVoice() {
			return this.options.voice;
		}
		setEnable(value) {
			this.options.enable = value;
			return this;
		}
		getEnable() {
			return this.options.enable;
		}
		setAPIKey(value) {
			this.apikey = value;
			return this;
		}
		getAPIKey() {
			return this.apikey;
		}
		setCallbackSuccess(func) {
			this.xhr.callback.success = func;
			return this;
		}
		getCallbackSuccess() {
			return this.xhr.callback.success;
		}
		setCallbackFail(func) {
			this.xhr.callback.fail = func;
			return this;
		}
		getCallbackFail() {
			return this.xhr.callback.fail;
		}
		getXHR() {
			return this.xhr.construct;
		}
		setText(string) {
			this.request.input.text = string;
			return this;
		}
		setLanguageCode(code) {
			this.request.voice.languageCode = code;
			return this;
		}
		getLanguageCode() {
			return this.request.voice.languageCode;
		}
		setVoiceName(name) {
			this.request.voice.name = name;
			return this;
		}
		getVoiceName() {
			return this.request.voice.name;
		}
		setSsmlGender(gender) {
			this.request.voice.ssmlGender = gender;
			return this;
		}
		getSsmlGender() {
			return this.request.voice.ssmlGender;
		}
		setAudioEncoding() {
			this.request.audioConfig.audioEncoding;
			return this;
		}
		getAudioEncoding() {
			return this.request.audioConfig.audioEncoding;
		}
		getRequest() {
			return this.request;
		}
		generate() {
			let gender = this.getSsmlGender(),
				diction = this.constructor.diction(),
				dictiongender = diction.hasOwnProperty(gender)
					? diction[gender]
					: diction[this.constructor.female()],
				name = this.getLanguageCode()
					+ String.fromCharCode(45)
					+ this.getVoice()
					+ String.fromCharCode(45)
					+ dictiongender;

			this.setVoiceName(name);

			return this;
		}
		run() {
			let xhr = this.getXHR(),
				url = this.constructor.google().replace(/\$0/, this.getAPIKey());

			xhr.open('POST', url, !0);
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			xhr.send(JSON.stringify(this.generate().getRequest()));
		}
		getAudio() {
			if (this.elements.hasOwnProperty('audio')) return this.elements.audio;
			this.elements.audio = document.createElement('audio');
			this.elements.audio.setAttribute('autoplay', true);
			return this.elements.audio;
		}
		setAudio(base64, encoding) {
			let audio = this.getAudio();

			audio.src = 'data:audio'
				+ String.fromCharCode(47)
				+ encoding
				+ String.fromCharCode(59)
				+ 'base64'
				+ String.fromCharCode(44)
				+ base64;

			return this;
		}
		error() {
			this.xhr.error = this.xhr.error + 1;
			if (this.xhr.error <= 4)
				setTimeout(this.run.bind(this), 1e3);
		}
		load() {
			let json, xhr = this.getXHR();

			this.xhr.error = 0;

			try {
				json = JSON.parse(xhr.responseText);
			}
			catch (message) {
				json = {
					'status': false,
					'notice': message
				};
			}

			if (false === json.hasOwnProperty(this.constructor.content())) {
				let fail = this.getCallbackFail();
				if (typeof fail === 'function') fail.call(this, json);
				return;
			}

			this.setAudio(json[this.constructor.content()], this.getAudioEncoding().toLowerCase());
			this.getAudio().play();
			let success = this.getCallbackSuccess();
			if (typeof success === 'function') success.call(this, json);
		}
		handleEvent(event) {
			if (typeof this[event.type] === 'function')
				return this[event.type].call(this, event);
		}
	}

	class Bubble {

		static show() {
			return 'show';
		}
		static board() {
			return 1800;
		}
		static height() {
			return 500;
		}

		constructor(bumblebee) {
			this.bumblebee = bumblebee;
			this.speech = new window.Bumblebee.Bubble.Speech(this);
			this.elements = {};
		}

		getBumblebee() {
			return this.bumblebee;
		}
		getSpeech() {
			return this.speech;
		}
		getSVG() {
			if (this.elements.hasOwnProperty('svg')) return this.elements.svg;
			let text = this.getText(),
				aspace = [
					this.constructor.board(),
					this.constructor.height()
				];

			this.elements.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			this.elements.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
			this.elements.svg.setAttribute('class', 'vimq');
			this.elements.svg.setAttribute('version', '1.1');
			this.elements.svg.setAttribute('viewBox', '0 0' + String.fromCharCode(32) + aspace.join(String.fromCharCode(32)));
			this.elements.svg.appendChild(text);

			return this.elements.svg;
		}
		getText() {
			if (this.elements.hasOwnProperty('text')) return this.elements.text;

			this.elements.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			this.elements.text.setAttribute('dominant-baseline', 'middle');
			this.elements.text.setAttribute('text-anchor', 'middle');
			this.elements.text.setAttribute('x', '50%');
			this.elements.text.setAttribute('y', '50%');

			return this.elements.text;
		}
		setText(string) {
			let text = this.getText(),
				split = string.split(/\n/);

			text.innerHTML = '';

			for (let item = 0; item < split.length; item++) {
				let tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan'),
					text_node = document.createTextNode(split[item]);

				tspan.setAttribute('x', '50%');
				tspan.setAttribute('dy', '64px');
				tspan.appendChild(text_node);
				text.appendChild(tspan);
			}

			this.getSpeech().setText(string);

			return this;
		}
		getClassList() {
			let cloud = this.getCloud();
			return cloud.classList;
		}
		getCloud() {
			if (this.elements.hasOwnProperty('cloud')) return this.elements.cloud;
			let text = this.getSVG();
			this.elements.cloud = document.createElement('p');
			this.elements.cloud.className = 'cloud pure-u-18-24';
			this.elements.cloud.appendChild(text);
			return this.elements.cloud;
		}
		out() {
			return this.getCloud();
		}
		hide() {
			this.getClassList().remove(this.constructor.show());
			this.getSpeech().getAudio().pause();
		}
		show() {
			this.getClassList().add(this.constructor.show());
			let audio = this.getSpeech().getEnable();
			if (audio) this.getSpeech().run();
		}
	}

	class Icon {

		constructor(li) {
			this.li = li;
			this.elements = {};
		}

		getLi() {
			return this.li;
		}
		get() {
			if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
			this.elements.icon = document.createElement('i');
			this.elements.icon.className = 'material-icons';
			return this.elements.icon;
		}
		set(material) {
			let icon = this.get();
			icon.innerText = material;
			return this;
		}
		remove() {
			window.Bumblebee.removeElementDOM(this.get());
			return this;
		}
		out() {
			return this.get();
		}
	}

	class Li {

		constructor(command) {
			this.command = command;

			this.elements = {};
			this.elements.icon = new Icon();

			this.options = {};
			this.options.bswitch = [];
			this.options.onclick = null; // (function)
		}

		getCommand() {
			return this.command;
		}
		getIcon() {
			return this.elements.icon;
		}
		setBswitch(on, off) {
			this.options.bswitch = [
				off,
				on
			];

			this.getIcon().set(off);

			return this;
		}
		getBswitch() {
			return this.options.bswitch;
		}
		setOnClick(func) {
			this.options.onclick = func;
			return this;
		}
		getOnClick() {
			return this.options.onclick;
		}
		getCheckbox() {
			if (this.elements.hasOwnProperty('checkbox')) return this.elements.checkbox;
			this.elements.checkbox = document.createElement('input');
			this.elements.checkbox.type = 'checkbox';
			this.elements.checkbox.name = 'checkbox';
			this.elements.checkbox.setAttribute(window.Bumblebee.handle(), ':change');
			this.elements.checkbox.addEventListener('change', this, false);
			return this.elements.checkbox;
		}
		setCheckbox(status) {
			let checkbox = this.getCheckbox(),
				trigger = new Event('change', {
					'cancelable': false,
					'bubbles': true
				});

			checkbox.checked = status === true;
			checkbox.dispatchEvent(trigger);

			return this;
		}
		getMain() {
			if (this.elements.hasOwnProperty('li')) return this.elements.li;
			let icon = this.getIcon(),
				text = this.getText(),
				checkbox = this.getCheckbox();

			this.elements.li = document.createElement('li');
			this.elements.li.setAttribute(window.Bumblebee.handle(), ':toggle');
			this.elements.li.addEventListener('click', this, false);
			this.elements.li.appendChild(icon.out());
			this.elements.li.appendChild(text);
			this.elements.li.appendChild(checkbox);

			return this.elements.li;
		}
		getClassList() {
			let main = this.getMain();
			return main.classList;
		}
		getText() {
			if (this.elements.hasOwnProperty('span')) return this.elements.span;
			this.elements.span = document.createElement('span');
			return this.elements.span;
		}
		setText(string) {
			let text = this.getText(),
				node = document.createTextNode(string);

			text.innerText = '';
			text.appendChild(node);

			return this;
		}
		out() {
			return this.getMain();
		}
		toggle(event) {
			let checkbox = this.getCheckbox(),
				onclick = this.getOnClick();
			this.setCheckbox(!checkbox.checked);

			if (typeof onclick === 'function')
				onclick.call(this, event);
		}
		change() {
			let bswitch = this.getBswitch(),
				checkbox = this.getCheckbox(),
				status = Number(checkbox.checked);

			if (bswitch.hasOwnProperty(parseInt(status)))
				this.getIcon().set(bswitch[parseInt(status)]);
		}
		handleEvent(event) {
			let attribute = window.Bumblebee.closestAttribute(event.target, window.Bumblebee.handle());
			if (attribute === null) return;

			let attribute_split = attribute.split(/\s+/);
			for (let item = 0; item < attribute_split.length; item++) {
				let execute = attribute_split[item].split(String.fromCharCode(58));
				if (execute.length !== 2) break;
				if (execute[0] === event.type || 0 === execute[0].length) {
					if (typeof this[execute[1]] !== 'function') continue;

					this[execute[1]].call(this, event);
				}
			}
		}
	}

	class Command {

		static open() {
			return 'open';
		}
		static audio() {
			return [
				'volume_up',
				'volume_off'
			];
		}
		static hover() {
			return [
				'toggle_on',
				'toggle_off'
			];
		}

		constructor(bumblebee) {
			this.bumblebee = bumblebee;

			this.elements = {};

			this.setAudio();
			this.setGender();
			this.setHover();
		}

		getBumblebee() {
			return this.bumblebee;
		}
		setAudio() {
			this.getList().appendChild(this.getAudio().out());
			return this;
		}
		getAudio() {
			if (this.elements.hasOwnProperty('audio')) return this.elements.audio;
			this.elements.audio = new Li(this);
			this.elements.audio.setBswitch.apply(this.elements.audio,
				this.constructor.audio());
			this.elements.audio.setOnClick(function () {
				let status = this.getCheckbox();
				this.getCommand().getBumblebee().getBubble().getSpeech().setEnable(status.checked);
			});
			return this.elements.audio;
		}
		setGender() {
			this.getList().appendChild(this.getGender().out());
			return this;
		}
		getGender() {
			if (this.elements.hasOwnProperty('gender')) return this.elements.gender;
			let diction = window.Bumblebee.Bubble.Speech.diction();
			this.elements.gender = new Li(this);
			this.elements.gender.setBswitch.apply(this.elements.gender,
				Object.keys(diction));
			this.elements.gender.setOnClick(function () {
				let status = this.getCheckbox(),
					speech = this.getCommand().getBumblebee().getBubble().getSpeech(),
					gender = Number(status.checked) ? window.Bumblebee.Bubble.Speech.female() : window.Bumblebee.Bubble.Speech.male();

				speech.setSsmlGender(gender);

			});
			return this.elements.gender;
		}
		setHover() {
			this.getList().appendChild(this.getHover().out());
			return this;
		}
		getHover() {
			if (this.elements.hasOwnProperty('hover')) return this.elements.hover;
			this.elements.hover = new Li(this);
			this.elements.hover.setBswitch.apply(this.elements.hover,
				this.constructor.hover());
			this.elements.hover.setOnClick(function () {
				let status = this.getCheckbox();
				this.getCommand().getBumblebee().setEnable(status.checked);
			});
			return this.elements.hover;
		}
		setTutorial() {
			this.getList().appendChild(this.getTutorial().out());
			return this;
		}
		getTutorial() {
			if (this.elements.hasOwnProperty('tutorial')) return this.elements.tutorial;
			this.elements.tutorial = new Li(this);
			this.elements.tutorial.setText('Tutorial');
			this.elements.tutorial.getIcon().set('play_arrow');
			this.elements.tutorial.setOnClick(function () {
				this.getCommand().getBumblebee().getTutorial().play();
			});
			return this.elements.tutorial;
		}
		getList() {
			if (this.elements.hasOwnProperty('list')) return this.elements.list;
			this.elements.list = document.createElement('ul');
			this.elements.list.className = 'bumblebee command';
			return this.elements.list;
		}
		getListClass() {
			let list = this.getList();
			return list.classList;
		}
		getWrapper() {
			if (this.elements.hasOwnProperty('wrapper')) return this.elements.wrapper;
			this.elements.wrapper = document.createElement('p');
			this.elements.wrapper.className = 'bumblebee command';
			return this.elements.wrapper;
		}
		setClickable(element) {
			this.elements.clickable = element;
			this.elements.clickable.addEventListener('click', this, false);
			this.elements.clickable.setAttribute(window.Bumblebee.handle(), ':open');
			this.elements.clickable.appendChild(this.getList());
			this.getWrapper().appendChild(this.elements.clickable);
			this.getWrapper().appendChild(this.getList());
			return this;
		}
		out() {
			return this.getWrapper();
		}
		handleEvent(event) {
			let attribute = window.Bumblebee.closestAttribute(event.target, window.Bumblebee.handle());
			if (attribute === null) return;

			let attribute_split = attribute.split(/\s+/);
			for (let item = 0; item < attribute_split.length; item++) {
				let execute = attribute_split[item].split(String.fromCharCode(58));
				if (execute.length !== 2) break;
				if (execute[0] === event.type || 0 === execute[0].length) {
					if (typeof this[execute[1]] !== 'function') continue;

					this[execute[1]].call(this, event);
				}
			}
		}
		close(event) {
			let status = this.status();
			if (status === false) return;
			if (typeof event === 'object') {
				let action = window.Bumblebee.closestAttribute(event.target, window.Bumblebee.handle());
				if (action !== null) return;
			}
			this.getListClass().remove(this.constructor.open());
		}
		open() {
			this.getListClass().add(this.constructor.open());
		}
		status() {
			return this.getListClass().contains(this.constructor.open());
		}
	}

	class Step {

		static lighten() {
			return 'tutorial';
		}

		constructor(tutorial, callback) {
			this.tutorial = tutorial;
			this.callback = callback;

			this.options = {};
			this.options.lightens = [];
			this.options.terminator = null; // (function)

			this.elements = {};
			this.elements.bubble = new window.Bumblebee.Bubble(this);
		}

		getTutorial() {
			return this.tutorial;
		}
		getCallback() {
			return this.callback;
		}
		getBubble() {
			return this.elements.bubble;
		}
		getLightens() {
			return this.options.lightens;
		}
		setTerminator(callback) {
			this.options.terminator = callback;
			return this;
		}
		getTerminator() {
			return this.options.terminator;
		}
		addLighten(element) {
			this.getLightens().push(element);
			return this;
		}
		get() {
			let previous = this.getTutorial().getPrevious(this);
			return function () {

				this.getTutorial().getController().setStep(this);

				if (previous instanceof window.Bumblebee.Tutorial.Step) {
					let terminator = previous.getTerminator();
					if (typeof terminator === 'function') terminator.call(previous);
				}

				let steps = this.getTutorial().getGenerator();
				for (let item of steps)
					item.deactivate();

				this.getCallback().call(this);
				this.activate();
			};
		}
		activate() {
			let lightens = this.getLightens();
			for (let item = 0; item < lightens.length; item++)
				lightens[item].classList.add(window.Bumblebee.Tutorial.Step.lighten());

			return this;
		}
		deactivate() {
			this.getBubble().hide();

			let lightens = this.getLightens();
			for (let item = 0; item < lightens.length; item++)
				lightens[item].classList.remove(window.Bumblebee.Tutorial.Step.lighten());

			return this;
		}
	}

	class Tutorial {

		static event() {
			return 'ended';
		}

		constructor(bumblebee) {
			this.bumblebee = bumblebee;

			this.elements = {};
			this.elements.controller = new window.Bumblebee.Tutorial.Controller(this);

			this.steps = [];
		}

		getBumblebee() {
			return this.bumblebee;
		}
		getController() {
			return this.elements.controller;
		}
		getSteps() {
			return this.steps;
		}
		*getGenerator() {
			for (let item = 0; item < this.steps.length; item++)
				yield this.steps[item];
		}
		getCurtain() {
			if (this.elements.hasOwnProperty('curtain')) return this.elements.curtain;
			let controller = this.getController();
			this.elements.curtain = document.createElement('div');
			this.elements.curtain.className = 'bumblebee curtain pure-g';
			this.elements.curtain.appendChild(controller.out());
			return this.elements.curtain;
		}
		add(callback, after) {
			let step = new window.Bumblebee.Tutorial.Step(this, callback),
				step_index = this.getSteps().indexOf(after);

			this.getBumblebee().getCommand().setTutorial();

			if (step_index !== -1) {
				this.getSteps().splice(step_index + 1, 0, step);
			} else {
				this.getSteps().push(step);
			}

			return step;
		}
		getPrevious(step) {
			let steps = this.getGenerator(),
				previous = null;
			while (true) {
				let item = steps.next();
				if (item.done === true
					|| step === item.value) return previous;
				previous = item.value;
			}
		}
		getNext(step) {
			let steps = this.getGenerator();
			while (true) {
				let item = steps.next();
				if (item.done === true) return null;
				if (step !== item.value) continue;
				let next = steps.next();
				if (next.value instanceof window.Bumblebee.Tutorial.Step) return next.value;
				return null;
			}
		}
		play() {
			this.getBumblebee().getCommand().close();

			document.body.appendChild(this.getCurtain());

			let steps = this.getGenerator(),
				i = 0;

			while (true) {
				let step = steps.next();
				if (step.done === true) break;

				step.value.getTutorial().getBumblebee().out().appendChild(step.value.getBubble().out());

				let next = this.getNext(step.value);
				if (next instanceof window.Bumblebee.Tutorial.Step) {
					step.value.getBubble().getSpeech().clone(next.getBubble().getSpeech().clone(this.getBumblebee().getBubble().getSpeech().setEnable(true)));
					step.value.getBubble().getSpeech().getAudio().addEventListener(this.constructor.event(), next.get().bind(next), false);
				} else {
					step.value.getBubble().getSpeech().getAudio().addEventListener(this.constructor.event(), this.stop.bind(this), false);
				}
				if (i++ === 0)
					step.value.get().call(step.value);
			}
		}
		stop() {
			let steps = this.getGenerator(),
				previous = null;

			for (let item of steps)
				previous = item.deactivate();

			if (previous instanceof window.Bumblebee.Tutorial.Step) {
				let terminator = previous.getTerminator();
				if (typeof terminator === 'function') terminator.call(previous);
			}

			window.Bumblebee.removeElementDOM(this.getCurtain());
		}
	}

	class Button extends Li {

		static previous() {
			return 'skip_previous';
		}
		static play() {
			return [
				'play_circle',
				'pause_circle'
			];
		}
		static stop() {
			return 'stop_circle';
		}
		static next() {
			return 'skip_next';
		}

		getController() {
			return this.getCommand();
		}
	}

	class Controller {

		static grid() {
			return 'pure-u-6-24';
		}

		constructor(tutorial) {
			this.tutorial = tutorial;

			this.options = {};
			this.options.step = null;

			this.elements = {};
		}

		getTutorial() {
			return this.tutorial;
		}
		setStep(step) {
			this.options.step = step;
			return this;
		}
		getStep() {
			if (this.options.step instanceof window.Bumblebee.Tutorial.Step) return this.options.step;
			return null;
		}
		getPrevious() {
			if (this.elements.hasOwnProperty('previous')) return this.elements.previous;
			this.elements.previous = new window.Bumblebee.Tutorial.Controller.Button(this);
			this.elements.previous.getClassList().add(this.constructor.grid());
			this.elements.previous.getIcon().set(window.Bumblebee.Tutorial.Controller.Button.previous());
			this.elements.previous.setOnClick(function () {
				let step = this.getController().getStep(),
					step_previous = this.getController().getTutorial().getPrevious(step);
				if (step_previous !== null) {
					step.getBubble().hide();
					step_previous.get().call(step_previous);
					this.getController().getPlay().setCheckbox(false);
				}
			});
			return this.elements.previous;
		}
		getPlay() {
			if (this.elements.hasOwnProperty('play')) return this.elements.play;
			this.elements.play = new window.Bumblebee.Tutorial.Controller.Button(this);
			this.elements.play.getClassList().add(this.constructor.grid());
			this.elements.play.setBswitch.apply(this.elements.play,
				window.Bumblebee.Tutorial.Controller.Button.play());
			this.elements.play.setOnClick(function () {
				let status = this.getCheckbox();
				if (status.checked) {
					this.getController().getStep().getBubble().getSpeech().getAudio().pause();
				} else {
					this.getController().getStep().getBubble().getSpeech().getAudio().play();
				}
			});
			return this.elements.play;
		}
		getStop() {
			if (this.elements.hasOwnProperty('stop')) return this.elements.stop;
			this.elements.stop = new window.Bumblebee.Tutorial.Controller.Button(this);
			this.elements.stop.getClassList().add(this.constructor.grid());
			this.elements.stop.getIcon().set(window.Bumblebee.Tutorial.Controller.Button.stop());
			this.elements.stop.setOnClick(function () {
				this.getController().getStep().getBubble().getSpeech().getAudio().pause();
				this.getController().getTutorial().stop();
				this.getController().getPlay().setCheckbox(false);
			});
			return this.elements.stop;
		}
		getNext() {
			if (this.elements.hasOwnProperty('next')) return this.elements.next;
			this.elements.next = new window.Bumblebee.Tutorial.Controller.Button(this);
			this.elements.next.getClassList().add(this.constructor.grid());
			this.elements.next.getIcon().set(window.Bumblebee.Tutorial.Controller.Button.next());
			this.elements.next.setOnClick(function () {
				let step = this.getController().getStep(),
					step_next = this.getController().getTutorial().getNext(step);
				if (step_next !== null) {
					step.getBubble().hide();
					step_next.get().call(step_next);
					this.getController().getPlay().setCheckbox(false);
				}
			});
			return this.elements.next;
		}
		getController() {
			if (this.elements.hasOwnProperty('controller')) return this.elements.controller;
			let previous = this.getPrevious(),
				play = this.getPlay(),
				stop = this.getStop(),
				next = this.getNext();

			this.elements.controller = document.createElement('ul');
			this.elements.controller.className = 'controller pure-u-12-24';
			this.elements.controller.appendChild(previous.out());

			this.elements.controller.appendChild(play.out());

			this.elements.controller.appendChild(stop.out());
			this.elements.controller.appendChild(next.out());

			return this.elements.controller;
		}
		out() {
			return this.getController();
		}
	}

	class Callback {

		constructor(element, func) {
			this.element = element;
			this.callback = func;
		}

		getElement() {
			return this.element;
		}
		get() {
			return this.callback;
		}
	}

	class Bumblebee {

		static handle() {
			return 'data-handle-event-bumblebee';
		}
		static presentation() {
			return 'data-help';
		}
		static lighten() {
			return 'bumblebee-action-special-lighten';
		}

		constructor() {
			this.elements = {};
			this.elements.bubble = new window.Bumblebee.Bubble(this);
			this.elements.command = new window.Bumblebee.Command(this);

			this.options = {};
			this.options.enable = false; // (bool)
			this.options.callbacks = [];

			this.tutorial = new window.Bumblebee.Tutorial(this);
		}

		getBubble() {
			return this.elements.bubble;
		}
		setEnable(value) {
			this.options.enable = value;
			return this;
		}
		getEnable() {
			return this.options.enable;
		}
		getCommand() {
			return this.elements.command;
		}
		getCallbacks() {
			return this.options.callbacks;
		}
		getTutorial() {
			return this.tutorial;
		}
		findCallback(element) {
			let callbacks = this.getCallbacks();
			for (let item = 0; item < callbacks.length; item++)
				if (element === callbacks[item].getElement())
					return callbacks[item].get();
			return null;
		}
		set(element, text, callback) {

			if (false === (element instanceof HTMLElement)) return this;

			element.setAttribute(this.constructor.handle(), 'mouseenter:show mouseleave:hide');
			element.setAttribute(this.constructor.presentation(), text);
			element.addEventListener('mouseenter', this, true);
			element.addEventListener('mouseleave', this, true);
			if (typeof callback !== 'function') return this;

			let before = this.findCallback(element);
			if (before === null) {
				let generated = new window.Bumblebee.Callback(element, callback);
				this.getCallbacks().push(generated);
			}

			return this;
		}
		getList() {
			if (this.elements.hasOwnProperty('ul')) return this.elements.ul;
			this.elements.ul = document.createElement('ul');
			return this.elements.ul;
		}
		getContainer() {
			if (this.elements.hasOwnProperty('container')) return this.elements.container;
			let bubble = this.getBubble();
			this.elements.container = document.createElement('article');
			this.elements.container.className = 'bumblebee';
			this.elements.container.appendChild(bubble.out());
			return this.elements.container;
		}
		out() {
			return this.getContainer();
		}
		close(event) {
			this.getCommand().close(event);
		}
		show(event) {
			let hover = this.getEnable();
			if (hover !== true
				|| event.target instanceof Element === false
				|| !event.target.hasAttribute(this.constructor.handle())) return;

			let text = event.target.getAttribute(this.constructor.presentation());
			if (text.length === 0) return;

			let callback = this.findCallback(event.target);
			if (typeof callback === 'function') callback.call(this, event);

			this.constructor.activate(event.target);

			this.getBubble().setText(text);
			this.getBubble().show(callback);
		}
		hide(event) {
			if (event.target instanceof Element === false
				|| !event.target.hasAttribute(this.constructor.handle())) return;

			let text = event.target.getAttribute(this.constructor.presentation());
			if (text.length === 0) return;

			this.constructor.deactivate(event.target);
			this.getBubble().hide();
		}
		handleEvent(event) {
			let attribute = this.constructor.closestAttribute(event.target, this.constructor.handle());
			if (attribute === null) return;

			let attribute_split = attribute.split(/\s+/);
			for (let item = 0; item < attribute_split.length; item++) {
				let execute = attribute_split[item].split(String.fromCharCode(58));
				if (execute.length !== 2) break;
				if (execute[0] === event.type || 0 === execute[0].length) {
					if (typeof this[execute[1]] !== 'function') continue;

					this[execute[1]].call(this, event);
				}
			}
		}
		static activate(element) {
			element.classList.add(window.Bumblebee.lighten());
		}
		static deactivate(element) {
			element.classList.remove(window.Bumblebee.lighten());
		}
		static closestAttribute(target, attribute, html) {
			if (typeof attribute === 'undefined'
				|| !attribute.length) return null;

			let result = null, element = target;

			do {
				let tagname = element.tagName.toLowerCase();
				if (tagname === 'body') return null;

				result = element.getAttribute(attribute);
				if (result !== null) {
					result = result.toString();
					if (result.length) break;
				}

				element = element.parentNode;
			} while (element !== null
				|| typeof element === 'undefined');

			if (typeof html === 'undefined'
				|| html !== true) return result;

			return element;
		}
		static removeElementDOM(element) {
			let parent = element === null || typeof element === 'undefined' || typeof element.parentNode === 'undefined' ? null : element.parentNode;
			if (parent === null) return false;
			parent.removeChild(element);
			return true;
		}
	};

	window.Bumblebee = Bumblebee;
	window.Bumblebee.Bubble = Bubble;
	window.Bumblebee.Bubble.Speech = Speech;
	window.Bumblebee.Tutorial = Tutorial;
	window.Bumblebee.Tutorial.Step = Step;
	window.Bumblebee.Tutorial.Controller = Controller;
	window.Bumblebee.Tutorial.Controller.Button = Button;
	window.Bumblebee.Callback = Callback;
	window.Bumblebee.Command = Command;
	window.Bumblebee.Command.Li = Li;
	window.Bumblebee.Command.Li.Icon = Icon;

})(window);