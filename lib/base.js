(function (window) {

	'use strict';

	class Speech {

		/**
		 * The function returns a URL that can be used to call the Google Cloud Text-to-Speech API.
		 * @returns The URL to the Google Cloud Text-to-Speech API.
		 */

		static google() {
			return 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=$0';
		}

		/**
		 * This function returns the audio content for the audio player.
		 * @returns The audioContent string.
		 */
		
		static content() {
			return 'audioContent';
		}
		
		/**
		 * Returns the string 'female' to set the gender of the voice
		 * @returns The string 'female'
		 */
		
		static female() {
			return 'female';
		}

		/**
		 * Returns the gender 'male' to set the gender of the voice
		 * @returns The string 'male'
		 */
		
		static male() {
			return 'male';
		}

		/**
		 * It creates a dictionary of the male and female characters.
		 * @returns The dictionary object.
		 */
		
		static diction() {
			let diction = {};

			diction[Speech.male()] = String.fromCharCode(100);
			diction[Speech.female()] = String.fromCharCode(97);

			return diction;
		}

		/**
		 * The constructor function creates a new instance of the class
		 * @param bubble - The Bubble object that is calling the API.
		 */
		
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

		/**
		 * Clone the speech object
		 * @param speech - The speech bubble to clone.
		 * @returns Nothing.
		 */
		
		clone(speech) {
			if (false === (speech instanceof window.Bumblebee.Bubble.Speech)) return this;

			this.setAPIKey(speech.getAPIKey());
			this.setEnable(speech.getEnable());

			this.request = speech.generate().getRequest();

			return this;
		}

		/**
		 * Get the bubble object
		 * @returns The bubble object.
		 */
		
		getBubble() {
			return this.bubble;
		}

		/**
		 * Set the voice to use for the synthesized speech
		 * @param standard - The standard voice, which is the default voice.
		 * @returns The `setVoice` method returns the `this` object, which is the `Speech` object.
		 */
		
		setVoice(standard) {
			this.options.voice = standard;
			return this;
		}

		/**
		 * Get the voice of the text to speech engine
		 * @returns The voice that was selected in the options.
		 */
		
		getVoice() {
			return this.options.voice;
		}

		/**
		 * Set the enable option to the given value
		 * @param value - The value to set the checkbox to.
		 * @returns The `setEnable` method returns the `this` object, which is the `options` object.
		 */
		
		setEnable(value) {
			this.options.enable = value;
			return this;
		}

		/**
		 * Returns the value of the enable option
		 * @returns The value of the enable option.
		 */
		
		getEnable() {
			return this.options.enable;
		}

		/**
		 * Set the API key for the current session
		 * @param value - The value to set the API key to.
		 * @returns The `setAPIKey` method returns the `this` object.
		 */
		
		setAPIKey(value) {
			this.apikey = value;
			return this;
		}

		/**
		 * Get the API key from the user
		 * @returns The API key.
		 */
		
		getAPIKey() {
			return this.apikey;
		}

		/**
		 * Set the success callback for the XHR object
		 * @param func - The function to be called when the request is successful.
		 * @returns Nothing.
		 */
		
		setCallbackSuccess(func) {
			this.xhr.callback.success = func;
			return this;
		}

		/**
		 * Get the callback function for the success event
		 * @returns The success callback function.
		 */
		
		getCallbackSuccess() {
			return this.xhr.callback.success;
		}

		/**
		 * Set the callback function for the XHR request
		 * @param func - The function to call when the request is successful.
		 * @returns The `ajax` function is returning the `ajax` object.
		 */
		
		setCallbackFail(func) {
			this.xhr.callback.fail = func;
			return this;
		}

		/**
		 * Get the callback function for the fail event
		 * @returns The callback function for the fail event.
		 */
		
		getCallbackFail() {
			return this.xhr.callback.fail;
		}

		/**
		 * Returns the XHR object
		 * @returns The constructor function for XMLHttpRequest.
		 */
		
		getXHR() {
			return this.xhr.construct;
		}

		/**
		 * Set the text of the request
		 * @param string - The string to be displayed.
		 * @returns The question object.
		 */
		
		setText(string) {
			this.request.input.text = string;
			return this;
		}

		/**
		 * Sets the language code for the voice request
		 * @param code - The language code of the voice.
		 * @returns The request object.
		 */
		
		setLanguageCode(code) {
			this.request.voice.languageCode = code;
			return this;
		}

		/**
		 * Returns the language code of the voice
		 * @returns The language code of the voice.
		 */
		
		getLanguageCode() {
			return this.request.voice.languageCode;
		}

		/**
		 * Set the voice name
		 * @param name - The name of the voice.
		 * @returns The question object.
		 */
		
		setVoiceName(name) {
			this.request.voice.name = name;
			return this;
		}

		/**
		 * Get the name of the voice that the user selected
		 * @returns The name of the voice.
		 */
		
		getVoiceName() {
			return this.request.voice.name;
		}

		/**
		 * Sets the SSML Voice Gender of the request
		 * @param gender - The gender of the voice.
		 * @returns The object itself.
		 */
		
		setSsmlGender(gender) {
			this.request.voice.ssmlGender = gender;
			return this;
		}

		/**
		 * Returns the SSML Voice Gender of the request
		 * @returns The SSML Voice Gender.
		 */
		
		getSsmlGender() {
			return this.request.voice.ssmlGender;
		}

		/**
		 * Sets the audio encoding for the request
		 * @returns The audio encoding.
		 */
		
		setAudioEncoding() {
			this.request.audioConfig.audioEncoding;
			return this;
		}

		/**
		 * Get the audio encoding of the audio file
		 * @returns The audio encoding format.
		 */
		
		getAudioEncoding() {
			return this.request.audioConfig.audioEncoding;
		}

		/**
		 * Get the request object from the current context
		 * @returns The request object.
		 */
		
		getRequest() {
			return this.request;
		}
		
		/**
		 * Generate the name to set to the voice
		 * @returns The object itself.
		 */
		
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

		/**
		 * It sends a POST request to the Google API.
		 */
		
		run() {
			let xhr = this.getXHR(),
				url = this.constructor.google().replace(/\$0/, this.getAPIKey());

			xhr.open('POST', url, !0);
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			xhr.send(JSON.stringify(this.generate().getRequest()));
		}

		/**
		 * Create an audio element if it doesn't exist, and return it
		 * @returns The audio element.
		 */
		
		getAudio() {
			if (this.elements.hasOwnProperty('audio')) return this.elements.audio;
			this.elements.audio = document.createElement('audio');
			this.elements.audio.setAttribute('autoplay', true);
			return this.elements.audio;
		}

		/**
		 * * Set the audio element's source to a data URI containing the audio data
		 * @param base64 - The base64 encoded audio data.
		 * @param encoding - The encoding of the audio.
		 * @returns Nothing.
		 */
		
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
		
		/**
		 * The function is called when an error occurs. 
		 * 
		 * The function increments the error count and if the error count is less than or equal to 4, it will
		 * wait 1 second and then call the run function
		 */
		
		error() {
			this.xhr.error = this.xhr.error + 1;
			if (this.xhr.error <= 4)
				setTimeout(this.run.bind(this), 1e3);
		}

		/**
		 * Load the audio file from the server and play it
		 * @returns The audio file.
		 */
		
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

		/**
		 * If the event type is a function defined in the object, call that function
		 * @param event - The event object that was passed to the handler.
		 * @returns The function called.
		 */
		
		handleEvent(event) {
			if (typeof this[event.type] === 'function')
				return this[event.type].call(this, event);
		}
	}

	class Bubble {

		/**
		 * It returns the string 'show'
		 * @returns The string 'show'
		 */
		
		static show() {
			return 'show';
		}

		/**
		 * The JavaScript function `board` returns the number 1800
		 * @returns 1800
		 */
		
		static board() {
			return 1800;
		}

		/**
		 * Return the default height of the element
		 * @returns The height of the element.
		 */
		
		static height() {
			return 500;
		}

		/**
		 * It creates a new JavaScript object that is a child of the bumblebee object.
		 * @param bumblebee - The Bumblebee object that is calling the constructor.
		 */

		constructor(bumblebee) {
			this.bumblebee = bumblebee;
			this.speech = new window.Bumblebee.Bubble.Speech(this);
			this.elements = {};
		}

		/**
		 * Get the Bumblebee JavaScript object
		 * @returns The bumblebee object.
		 */
		
		getBumblebee() {
			return this.bumblebee;
		}

		/**
		 * Get the speech from the speech property
		 * @returns The speech property is being returned.
		 */
		
		getSpeech() {
			return this.speech;
		}

		/**
		 * Create a new SVG element with the text of the current element
		 * @returns The SVG element.
		 */
		
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

		/**
		 * Create a text element if it doesn't exist, and return it
		 * @returns The text element.
		 */
		
		getText() {
			if (this.elements.hasOwnProperty('text')) return this.elements.text;

			this.elements.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			this.elements.text.setAttribute('dominant-baseline', 'middle');
			this.elements.text.setAttribute('text-anchor', 'middle');
			this.elements.text.setAttribute('x', '50%');
			this.elements.text.setAttribute('y', '50%');

			return this.elements.text;
		}

		/**
		 * * Set the text of the text element
		 * @param string - The text to be displayed.
		 * @returns The object itself.
		 */
		
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

		/**
		 * Get the classList property of the cloud element
		 * @returns The classList property of the cloud object.
		 */
		
		getClassList() {
			let cloud = this.getCloud();
			return cloud.classList;
		}

		/**
		 * Get the cloud SVG and append it to the DOM
		 * @returns The cloud element.
		 */
		
		getCloud() {
			if (this.elements.hasOwnProperty('cloud')) return this.elements.cloud;
			let text = this.getSVG();
			this.elements.cloud = document.createElement('p');
			this.elements.cloud.className = 'cloud pure-u-18-24';
			this.elements.cloud.appendChild(text);
			return this.elements.cloud;
		}

		/**
		 * Get the cloud name from the Azure environment
		 * @returns The getCloud() function returns the cloud variable.
		 */
		
		out() {
			return this.getCloud();
		}

		/**
		 * Hide the element
		 */
		
		hide() {
			this.getClassList().remove(this.constructor.show());
			this.getSpeech().getAudio().pause();
		}

		/**
		 * Show the element
		 */
		
		show() {
			this.getClassList().add(this.constructor.show());
			let audio = this.getSpeech().getEnable();
			if (audio) this.getSpeech().run();
		}
	}

	class Icon {

		/**
		 * Creates a new JavaScript object and stores a reference to the HTML list element in the object
		 * @param li - The list item that contains the button.
		 */

		constructor(li) {
			this.li = li;
			this.elements = {};
		}

		/**
		 * Returns the `li` element of the element
		 * @returns The getLi() method returns the value of the li property.
		 */
		
		getLi() {
			return this.li;
		}

		/**
		 * Create an icon element if it doesn't exist, and return it
		 * @returns The icon element.
		 */
		
		get() {
			if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
			this.elements.icon = document.createElement('i');
			this.elements.icon.className = 'material-icons';
			return this.elements.icon;
		}

		/**
		 * Set the inner text of the icon element
		 * @param material - The material to display in the icon.
		 * @returns The icon element.
		 */
		
		set(material) {
			let icon = this.get();
			icon.innerText = material;
			return this;
		}

		/**
		 * Remove the element from the DOM
		 * @returns The object itself.
		 */
		
		remove() {
			window.Bumblebee.removeElementDOM(this.get());
			return this;
		}

		/**
		 * Get the value of the current node and return it
		 * @returns The value of the variable.
		 */
		
		out() {
			return this.get();
		}
	}

	class Li {

		/**
		 * The constructor function creates a new instance of the class. 
		 * @param command - The command that will be executed when the button is clicked.
		 */
		
		constructor(command) {
			this.command = command;

			this.elements = {};
			this.elements.icon = new Icon();

			this.options = {};
			this.options.bswitch = [];
			this.options.onclick = null; // (function)
		}

		/**
		 * Get the command that was executed
		 * @returns The command that was passed in the constructor.
		 */
		
		getCommand() {
			return this.command;
		}

		/**
		 * Get the icon element
		 * @returns The icon element.
		 */
		
		getIcon() {
			return this.elements.icon;
		}

		/**
		 * Set the icon to the "on" state
		 * @param on - The icon to display when the switch is on.
		 * @param off - The icon to display when the switch is off.
		 * @returns The object itself.
		 */
		
		setBswitch(on, off) {
			this.options.bswitch = [
				off,
				on
			];

			this.getIcon().set(off);

			return this;
		}

		/**
		 * Get the value of the bswitch option
		 * @returns The value of the bswitch option.
		 */
		
		getBswitch() {
			return this.options.bswitch;
		}

		/**
		 * It sets the onclick property of the button to the function passed in.
		 * @param func - The function to be called when the button is clicked.
		 * @returns The object itself.
		 */
		
		setOnClick(func) {
			this.options.onclick = func;
			return this;
		}

		/**
		 * Get the onclick event handler for the button
		 * @returns The onclick event handler.
		 */
		
		getOnClick() {
			return this.options.onclick;
		}

		/**
		 * Create a checkbox element
		 * @returns The checkbox element.
		 */
		
		getCheckbox() {
			if (this.elements.hasOwnProperty('checkbox')) return this.elements.checkbox;
			this.elements.checkbox = document.createElement('input');
			this.elements.checkbox.type = 'checkbox';
			this.elements.checkbox.name = 'checkbox';
			this.elements.checkbox.setAttribute(window.Bumblebee.handle(), ':change');
			this.elements.checkbox.addEventListener('change', this, false);
			return this.elements.checkbox;
		}

		/**
		 * Set the checkbox to the given status
		 * @param status - The status of the checkbox.
		 * @returns The object itself.
		 */
		
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

		/**
		 * Create a new `<li>` element and set its `data-toggle` attribute to `:toggle`
		 * @returns The <li> element.
		 */
		
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

		/**
		 * Get the classList property of the main element
		 * @returns The classList property of the main element.
		 */
		
		getClassList() {
			let main = this.getMain();
			return main.classList;
		}

		/**
		 * Create a span element if it doesn't already exist, and return it
		 * @returns The text of the question.
		 */
		
		getText() {
			if (this.elements.hasOwnProperty('span')) return this.elements.span;
			this.elements.span = document.createElement('span');
			return this.elements.span;
		}

		/**
		 * Set the text of the element
		 * @param string - The string to be appended to the text node.
		 * @returns The object itself.
		 */
		
		setText(string) {
			let text = this.getText(),
				node = document.createTextNode(string);

			text.innerText = '';
			text.appendChild(node);

			return this;
		}

		/**
		 * Get the main element of the page
		 * @returns The main function.
		 */
		
		out() {
			return this.getMain();
		}

		/**
		 * Toggle the checkbox and call the onclick function
		 * @param event - The event object that was triggered.
		 */
		
		toggle(event) {
			let checkbox = this.getCheckbox(),
				onclick = this.getOnClick();
			this.setCheckbox(!checkbox.checked);

			if (typeof onclick === 'function')
				onclick.call(this, event);
		}

		/**
		 * *If the checkbox is checked, set the icon to the value of the corresponding key in the bswitch
		 * object
		 */
		
		change() {
			let bswitch = this.getBswitch(),
				checkbox = this.getCheckbox(),
				status = Number(checkbox.checked);

			if (bswitch.hasOwnProperty(parseInt(status)))
				this.getIcon().set(bswitch[parseInt(status)]);
		}

		/**
		 * * For each attribute in the element, split the attribute into a list of commands.
		 * * For each command, split the command into a command type and a command name.
		 * * If the command type is the same as the event type, or if the command type is empty, then execute
		 * the command
		 * @param event - The event object that was passed to the function.
		 * @returns The `handleEvent` method is being returned.
		 */
		
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

		/**
		 * Open the file
		 * @returns The string 'open'
		 */
		
		static open() {
			return 'open';
		}

		/**
		 * Returns an array of audio files that can be played by the browser
		 * @returns An array of strings.
		 */
		
		static audio() {
			return [
				'volume_up',
				'volume_off'
			];
		}

		/**
		 * The hover() function returns an array of strings that represent the JavaScript events that will be
		 * bound to the button
		 * @returns The hover() method returns an array of strings.
		 */
		
		static hover() {
			return [
				'toggle_on',
				'toggle_off'
			];
		}

		/**
		 * The constructor function sets up the JavaScript object that will be used to interact with the
		 * Bumblebee API
		 * @param bumblebee - The bumblebee object that is calling the constructor.
		 */
		
		constructor(bumblebee) {
			this.bumblebee = bumblebee;

			this.elements = {};

			this.setAudio();
			this.setGender();
			this.setHover();
		}

		/**
		 * It returns the bumblebee object.
		 * @returns The bumblebee object.
		 */
		
		getBumblebee() {
			return this.bumblebee;
		}

		/**
		 * Create an audio element and append it to the list
		 * @returns The question object.
		 */
		
		setAudio() {
			this.getList().appendChild(this.getAudio().out());
			return this;
		}

		/**
		 * It creates an audio checkbox.
		 * @returns The audio checkbox.
		 */
		
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

		/**
		 * Create a new HTML element and append it to the list
		 * @returns The object itself.
		 */
		
		setGender() {
			this.getList().appendChild(this.getGender().out());
			return this;
		}

		/**
		 * Create a new Li element if it not exists and set it to the gender property of the Bubble.Speech object
		 * @returns The gender checkbox.
		 */
		
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

		/**
		 * Add the hover element to the list
		 * @returns The object itself.
		 */
		
		setHover() {
			this.getList().appendChild(this.getHover().out());
			return this;
		}

		/**
		 * Get the hover element, if it exists. If it doesn't exist, create it
		 * @returns The hover element.
		 */
		
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

		/**
		 * *Append the tutorial to the list.*
		 * @returns The object itself.
		 */
		
		setTutorial() {
			this.getList().appendChild(this.getTutorial().out());
			return this;
		}

		/**
		 * Create a new Li element and set its text to 'Tutorial'
		 * @returns The tutorial button.
		 */
		
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

		/**
		 * Create a list element if it doesn't already exist
		 * @returns The list element.
		 */
		
		getList() {
			if (this.elements.hasOwnProperty('list')) return this.elements.list;
			this.elements.list = document.createElement('ul');
			this.elements.list.className = 'bumblebee command';
			return this.elements.list;
		}

		/**
		 * Get the list element for the current page
		 * @returns The classList of the list element.
		 */
		
		getListClass() {
			let list = this.getList();
			return list.classList;
		}

		/**
		 * Create a wrapper element for the command
		 * @returns The wrapper element.
		 */
		
		getWrapper() {
			if (this.elements.hasOwnProperty('wrapper')) return this.elements.wrapper;
			this.elements.wrapper = document.createElement('p');
			this.elements.wrapper.className = 'bumblebee command';
			return this.elements.wrapper;
		}

		/**
		 * Set the clickable element to the element passed in
		 * @param element - The element that will be used to open the dropdown.
		 * @returns The object itself.
		 */
		
		setClickable(element) {
			this.elements.clickable = element;
			this.elements.clickable.addEventListener('click', this, false);
			this.elements.clickable.setAttribute(window.Bumblebee.handle(), ':open');
			this.elements.clickable.appendChild(this.getList());
			this.getWrapper().appendChild(this.elements.clickable);
			this.getWrapper().appendChild(this.getList());
			return this;
		}

		/**
		 * Returns the JavaScript representation of the object
		 * @returns The getWrapper method is returning the HTML code for the form.
		 */
		
		out() {
			return this.getWrapper();
		}

		/**
		 * * For each attribute in the element, split the attribute into a list of commands.
		 * * For each command, split the command into a command type and a command name.
		 * * If the command type is the same as the event type, or if the command type is empty, execute the
		 * command
		 * @param event - The event object that was passed to the function.
		 * @returns The `handleEvent` method is being returned.
		 */
		
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

		/**
		 * The function is called when the user clicks on the close button
		 * @param event - The event object that triggered the close.
		 * @returns Nothing.
		 */
		
		close(event) {
			let status = this.status();
			if (status === false) return;
			if (typeof event === 'object') {
				let action = window.Bumblebee.closestAttribute(event.target, window.Bumblebee.handle());
				if (action !== null) return;
			}
			this.getListClass().remove(this.constructor.open());
		}

		/**
		 * Open the dialog
		 */
		
		open() {
			this.getListClass().add(this.constructor.open());
		}

		/**
		 * Returns a boolean indicating whether the list is open
		 * @returns The status() method returns a boolean value.
		 */
		
		status() {
			return this.getListClass().contains(this.constructor.open());
		}
	}

	class Step {

		/**
		 * *lighten* returns the string *tutorial*
		 * @returns The string "tutorial" is being returned.
		 */
		
		static lighten() {
			return 'tutorial';
		}

		/**
		 * * Create a new JavaScript object that will be used to control the tutorial
		 * @param tutorial - The tutorial object that this bubble belongs to.
		 * @param callback - A function that will be called when the tutorial is completed.
		 */
		
		constructor(tutorial, callback) {
			this.tutorial = tutorial;
			this.callback = callback;

			this.options = {};
			this.options.lightens = [];
			this.options.terminator = null; // (function)

			this.elements = {};
			this.elements.bubble = new window.Bumblebee.Bubble(this);
		}

		/**
		 * Get the tutorial
		 * @returns The tutorial object.
		 */
		
		getTutorial() {
			return this.tutorial;
		}

		/**
		 * Get the callback function that was passed to the function
		 * @returns The callback function.
		 */
		
		getCallback() {
			return this.callback;
		}

		/**
		 * Get the bubble element
		 * @returns The bubble element.
		 */
		
		getBubble() {
			return this.elements.bubble;
		}

		/**
		 * Get the lightens option
		 * @returns The getLightens() method returns the lightens array.
		 */
		
		getLightens() {
			return this.options.lightens;
		}

		/**
		 * Set the terminator callback
		 * @param callback - A function that is called when the stream is finished.
		 * @returns The `setTerminator` method returns the `this` object.
		 */
		
		setTerminator(callback) {
			this.options.terminator = callback;
			return this;
		}

		/**
		 * Get the terminator value from the options object
		 * @returns The terminator option.
		 */
		
		getTerminator() {
			return this.options.terminator;
		}

		/**
		 * Add a lighten to the lightens array
		 * @param element - The element to add to the lighten list.
		 * @returns The current object.
		 */
		
		addLighten(element) {
			this.getLightens().push(element);
			return this;
		}

		/**
		 * The get() function returns a function that calls the callback function and activates the step
		 * @returns A function that calls the callback function and activates the step.
		 */
		
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

		/**
		 * Activate the tutorial step by adding the lighten class to the step's elements
		 * @returns The element itself.
		 */
		
		activate() {
			let lightens = this.getLightens();
			for (let item = 0; item < lightens.length; item++)
				lightens[item].classList.add(window.Bumblebee.Tutorial.Step.lighten());

			return this;
		}


		/**
		 * Deactivates the tutorial step
		 * @returns The element itself.
		 */
		
		deactivate() {
			this.getBubble().hide();

			let lightens = this.getLightens();
			for (let item = 0; item < lightens.length; item++)
				lightens[item].classList.remove(window.Bumblebee.Tutorial.Step.lighten());

			return this;
		}
	}

	class Tutorial {

		/**
		 * It returns the string "ended"
		 * @returns The event() method returns the string 'ended'.
		 */
		
		static event() {
			return 'ended';
		}

		/**
		 * The constructor function creates a new instance of the Controller class and stores it in the
		 * elements.controller property
		 * @param bumblebee - The Bumblebee object that is used to communicate with the Bumblebee server.
		 */
		
		constructor(bumblebee) {
			this.bumblebee = bumblebee;

			this.elements = {};
			this.elements.controller = new window.Bumblebee.Tutorial.Controller(this);

			this.steps = [];
		}

		/**
		 * It returns the bumblebee object.
		 * @returns The bumblebee object.
		 */
		
		getBumblebee() {
			return this.bumblebee;
		}

		/**
		 * Get the controller element from the view
		 * @returns The controller element.
		 */
		
		getController() {
			return this.elements.controller;
		}

		/**
		 * Get the steps for the recipe
		 * @returns The getSteps method returns the steps array.
		 */
		
		getSteps() {
			return this.steps;
		}
		
		/**
		 * It returns a generator function that can be used to iterate over the steps in the recipe.
		 */
		
		*getGenerator() {
			for (let item = 0; item < this.steps.length; item++)
				yield this.steps[item];
		}

		/**
		 * Create a curtain div and append it to the DOM
		 * @returns The curtain element.
		 */
		
		getCurtain() {
			if (this.elements.hasOwnProperty('curtain')) return this.elements.curtain;
			let controller = this.getController();
			this.elements.curtain = document.createElement('div');
			this.elements.curtain.className = 'bumblebee curtain pure-g';
			this.elements.curtain.appendChild(controller.out());
			return this.elements.curtain;
		}

		/**
		 * Add a step to the tutorial
		 * @param callback - The function that will be called when the step is reached.
		 * @param after - The step after which this step will be added.
		 * @returns The step that was just added.
		 */
		
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

		/**
		 * Get the previous step in the generator
		 * @param step - The current step in the generator.
		 * @returns The previous step.
		 */
		
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

		/**
		 * * Get the next step in the tutorial
		 * @param step - The step to get the next step for.
		 * @returns The next step in the tutorial.
		 */
		
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

		/**
		 * It plays the tutorial.
		 */
		
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

		/**
		 * *Stop the tutorial.*
		 * 
		 * The function is called when the user clicks the "Stop" button. It first gets the generator of the
		 * tutorial steps, then it calls the deactivate method on each step. The deactivate method returns
		 * the previous step, so the function keeps a reference to the previous step. If the previous step is
		 * a step object, it calls the terminator function on the step. The terminator function is a function
		 * that is defined in the step object
		 */
		
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

		/**
		 * *The previous() function returns the string 'skip_previous'*
		 * @returns The string 'skip_previous'
		 */
		
		static previous() {
			return 'skip_previous';
		}

		/**
		 * Returns an array of two strings, each of which is a valid icon name
		 * @returns An array of strings.
		 */
		
		static play() {
			return [
				'play_circle',
				'pause_circle'
			];
		}

		/**
		 * It returns a string.
		 * @returns The string 'stop_circle'
		 */
		
		static stop() {
			return 'stop_circle';
		}

		/**
		 * Skip the next iteration of the loop
		 * @returns The string 'skip_next'
		 */
		
		static next() {
			return 'skip_next';
		}

		/**
		 * Get the controller for the current command
		 * @returns The command object.
		 */
		
		getController() {
			return this.getCommand();
		}
	}

	class Controller {

		/**
		 * Returns the grid class for the grid layout
		 * @returns The string 'pure-u-6-24'
		 */
		
		static grid() {
			return 'pure-u-6-24';
		}

		/**
		 * The constructor function creates a new instance of the Tutorial class. 
		 * 
		 * The constructor function takes a single parameter, which is the tutorial object that was created
		 * in the previous step. 
		 * The constructor function creates a new instance of the Tutorial class.
		 * @param tutorial - The tutorial object that this step belongs to.
		 */
		
		constructor(tutorial) {
			this.tutorial = tutorial;

			this.options = {};
			this.options.step = null;

			this.elements = {};
		}

		/**
		 * Get the tutorial
		 * @returns The tutorial object.
		 */
		
		getTutorial() {
			return this.tutorial;
		}

		/**
		 * Set the step size for the slider
		 * @param step - The step size of the slider.
		 * @returns The object itself.
		 */
		
		setStep(step) {
			this.options.step = step;
			return this;
		}

		/**
		 * Get the current step.
		 * @returns The step that is being returned is the step that is being passed in the options.
		 */
		
		getStep() {
			if (this.options.step instanceof window.Bumblebee.Tutorial.Step) return this.options.step;
			return null;
		}

		/**
		 * Get the previous button if it exists otherwise it creates a new one.
		 * @returns The previous button.
		 */
		
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

		/**
		 * It creates a button that can be used to play or pause the audio if it exists otherwise
		 * it creates a new one.
		 * @returns The play button.
		 */
		
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

		/**
		 * * Create a new button element.
		 * * Add the button to the tutorial's grid.
		 * * Set the button's icon to the stop icon.
		 * * Set the button's onclick event to pause the audio and stop the tutorial.
		 * * Return the button
		 * @returns The stop button.
		 */
		
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

		/**
		 * Get the next button
		 * @returns The next button.
		 */
		
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

		/**
		 * Create a controller that contains the previous, play, stop, and next buttons
		 * @returns The controller is being returned.
		 */
		
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

		/**
		 * Get the controller for the current view
		 * @returns The controller.
		 */
		
		out() {
			return this.getController();
		}
	}

	class Callback {

		/**
		 * The constructor function takes two parameters, an element and a function. 
		 * It creates a new object and assigns the element and function to the object
		 * @param element - The element to be observed.
		 * @param func - The function to be called when the event is triggered.
		 */
		
		constructor(element, func) {
			this.element = element;
			this.callback = func;
		}

		/**
		 * Returns the element that the `<div>` is attached to
		 * @returns The element that was created.
		 */
		
		getElement() {
			return this.element;
		}

		/**
		 * Get the callback function from the JavaScript object
		 * @returns The callback function.
		 */
		
		get() {
			return this.callback;
		}
	}

	class Bumblebee {

		/**
		 * *This function returns a string that is used as a JavaScript event handler.*
		 * @returns The handle function returns a string.
		 */
		
		static handle() {
			return 'data-handle-event-bumblebee';
		}

		/**
		 * *Returns the HTML attribute that will be used to mark the help text for a field.*
		 * @returns The string 'data-help' is being returned.
		 */
		
		static presentation() {
			return 'data-help';
		}
		
		/**
		 * *Lighten* the background color of the current element
		 * @returns The string 'bumblebee-action-special-lighten'
		 */

		static lighten() {
			return 'bumblebee-action-special-lighten';
		}

		/**
		 * The constructor function creates the elements that will be used by the Bumblebee object
		 */
		
		constructor() {
			this.elements = {};
			this.elements.bubble = new window.Bumblebee.Bubble(this);
			this.elements.command = new window.Bumblebee.Command(this);

			this.options = {};
			this.options.enable = false; // (bool)
			this.options.callbacks = [];

			this.tutorial = new window.Bumblebee.Tutorial(this);
		}

		/**
		 * Get the bubble element
		 * @returns The bubble element.
		 */
		
		getBubble() {
			return this.elements.bubble;
		}

		/**
		 * Set the enable option to the given value
		 * @param value - The value to set the checkbox to.
		 * @returns The `setEnable` method returns the `this` object, which is the `options` object.
		 */
		
		setEnable(value) {
			this.options.enable = value;
			return this;
		}

		/**
		 * Returns the value of the enable option
		 * @returns The value of the enable option.
		 */
		
		getEnable() {
			return this.options.enable;
		}

		/**
		 * Get the command textbox element
		 * @returns The command element.
		 */
		
		getCommand() {
			return this.elements.command;
		}

		/**
		 * Returns the callbacks object
		 * @returns The callbacks object.
		 */
		
		getCallbacks() {
			return this.options.callbacks;
		}

		/**
		 * Get the tutorial
		 * @returns The tutorial object.
		 */
		
		getTutorial() {
			return this.tutorial;
		}

		/**
		 * Find the callback that is associated with the specified element
		 * @param element - The element to find the callback for.
		 * @returns The callback function.
		 */
		
		findCallback(element) {
			let callbacks = this.getCallbacks();
			for (let item = 0; item < callbacks.length; item++)
				if (element === callbacks[item].getElement())
					return callbacks[item].get();
			return null;
		}

		/**
		 * * Set the text of the tooltip
		 * @param element - The element to bind the callback to.
		 * @param text - The text that will be displayed in the tooltip.
		 * @param callback - The function that will be called when the mouse enters the element.
		 * @returns The object itself.
		 */
		
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

		/**
		 * Create a list element if it doesn't already exist
		 * @returns The ul element.
		 */
		
		getList() {
			if (this.elements.hasOwnProperty('ul')) return this.elements.ul;
			this.elements.ul = document.createElement('ul');
			return this.elements.ul;
		}

		/**
		 * Create a container element for the bubble if it doesn't already exist
		 * @returns The container element.
		 */
		
		getContainer() {
			if (this.elements.hasOwnProperty('container')) return this.elements.container;
			let bubble = this.getBubble();
			this.elements.container = document.createElement('article');
			this.elements.container.className = 'bumblebee';
			this.elements.container.appendChild(bubble.out());
			return this.elements.container;
		}

		/**
		 * Returns the HTML container for the chart
		 * @returns The container element.
		 */
		
		out() {
			return this.getContainer();
		}

		/**
		 * The close function is called when the user clicks the close button on the command bar
		 * @param event - The event that triggered the command.
		 */
		
		close(event) {
			this.getCommand().close(event);
		}

		/**
		 * Show the bubble when the user hovers over the element
		 * @param event - The event object that was passed to the callback.
		 */
		
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

		/**
		 * When the user clicks on a word, the word is highlighted and a tooltip is shown
		 * @param event - The event object that was triggered.
		 */
		
		hide(event) {
			if (event.target instanceof Element === false
				|| !event.target.hasAttribute(this.constructor.handle())) return;

			let text = event.target.getAttribute(this.constructor.presentation());
			if (text.length === 0) return;

			this.constructor.deactivate(event.target);
			this.getBubble().hide();
		}

		/**
		 * * For each attribute in the closest element to the target, split the attribute into a type and a
		 * function name.
		 * * If the type matches the event type or is empty, execute the function
		 * @param event - The event object that was passed to the event handler.
		 * @returns The return value is the result of the last expression in the block.
		 */
		
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

		/**
		 * *Activate* the given *element* by adding the class `lighten` to it
		 * @param element - The element to be activated.
		 */
		
		static activate(element) {
			element.classList.add(window.Bumblebee.lighten());
		}

		/**
		 * *Activates* the given element by adding the `lighten` class to it
		 * @param element - The element to be deactivated.
		 */
		
		static deactivate(element) {
			element.classList.remove(window.Bumblebee.lighten());
		}

		/**
		 * Find the closest attribute to the target element
		 * @param target - The element to search for the attribute.
		 * @param attribute - The attribute to search for.
		 * @param html - If true, the result will be the HTML of the closest attribute.
		 * @returns The closest attribute to the target element.
		 */
		
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

		/**
		 * Remove an element from the DOM
		 * @param element - The element to remove from the DOM.
		 * @returns The return value is a boolean value.
		 */
		
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