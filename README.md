# Documentation widget-bumblebee

> Widget Javascript Bumblebee is a library used to create tutorial inside page with the help of a speech synthesizer.

> ## ***Class window.Bumblebee usable methods***

# Documentation

## `static handle()`

*This function returns a string that is used as a JavaScript event handler.*

 * **Returns:** `h` — handle function returns a string.

## `static presentation()`

*Returns the HTML attribute that will be used to mark the help text for a field.*

 * **Returns:** `h` — string 'data-help' is being returned.

## `static lighten()`

*Lighten* the background color of the current element

 * **Returns:** `h` — string 'bumblebee-action-special-lighten'

## `constructor()`

The constructor function creates the elements that will be used by the Bumblebee object

## `getBubble()`

Get the bubble element

 * **Returns:** `h` — bubble element.

## `setEnable(value)`

Set the enable option to the given value

 * **Parameters:** `value` — The value to set the checkbox to.
 * **Returns:** `h` — `setEnable` method returns the `this` object, which is the `options` object.

## `getEnable()`

Returns the value of the enable option

 * **Returns:** `h` — value of the enable option.

## `getCommand()`

Get the command textbox element

 * **Returns:** `h` — command element.

## `getCallbacks()`

Returns the callbacks object

 * **Returns:** `h` — callbacks object.

## `getTutorial()`

Get the tutorial

 * **Returns:** `h` — tutorial object.

## `findCallback(element)`

Find the callback that is associated with the specified element

 * **Parameters:** `element` — The element to find the callback for.
 * **Returns:** `h` — callback function.

## `set(element, text, callback)`

* Set the text of the tooltip

 * **Parameters:**
   * `element` — The element to bind the callback to.
   * `text` — The text that will be displayed in the tooltip.
   * `callback` — The function that will be called when the mouse enters the element.
 * **Returns:** `h` — object itself.

## `getList()`

Create a list element if it doesn't already exist

 * **Returns:** `h` — ul element.

## `getContainer()`

Create a container element for the bubble if it doesn't already exist

 * **Returns:** `h` — container element.

## `out()`

Returns the HTML container for the chart

 * **Returns:** `h` — container element.

## `close(event)`

The close function is called when the user clicks the close button on the command bar

 * **Parameters:** `event` — The event that triggered the command.

## `show(event)`

Show the bubble when the user hovers over the element

 * **Parameters:** `event` — The event object that was passed to the callback.

## `hide(event)`

When the user clicks on a word, the word is highlighted and a tooltip is shown

 * **Parameters:** `event` — The event object that was triggered.

## `handleEvent(event)`

* For each attribute in the closest element to the target, split the attribute into a type and a function name. * If the type matches the event type or is empty, execute the function

 * **Parameters:** `event` — The event object that was passed to the event handler.
 * **Returns:** `h` — return value is the result of the last expression in the block.

## `static activate(element)`

*Activate* the given *element* by adding the class `lighten` to it

 * **Parameters:** `element` — The element to be activated.

## `static deactivate(element)`

*Activates* the given element by adding the `lighten` class to it

 * **Parameters:** `element` — The element to be deactivated.

## `static closestAttribute(target, attribute, html)`

Find the closest attribute to the target element

 * **Parameters:**
   * `target` — The element to search for the attribute.
   * `attribute` — The attribute to search for.
   * `html` — If true, the result will be the HTML of the closest attribute.
 * **Returns:** `h` — closest attribute to the target element.

## `static removeElementDOM(element)`

Remove an element from the DOM

 * **Parameters:** `element` — The element to remove from the DOM.
 * **Returns:** `h` — return value is a boolean value.

> ## ***Class window.Bumblebee.Bubble usable methods***

# Documentation

## `static show()`

It returns the string 'show'

 * **Returns:** `h` — string 'show'

## `static board()`

The JavaScript function `board` returns the number 1800

 * **Returns:** `80` — 

## `static height()`

Return the default height of the element

 * **Returns:** `h` — height of the element.

## `constructor(bumblebee)`

It creates a new JavaScript object that is a child of the bumblebee object.

 * **Parameters:** `bumblebee` — The Bumblebee object that is calling the constructor.

## `getBumblebee()`

Get the Bumblebee JavaScript object

 * **Returns:** `h` — bumblebee object.

## `getSpeech()`

Get the speech from the speech property

 * **Returns:** `h` — speech property is being returned.

## `getSVG()`

Create a new SVG element with the text of the current element

 * **Returns:** `h` — SVG element.

## `getText()`

Create a text element if it doesn't exist, and return it

 * **Returns:** `h` — text element.

## `setText(string)`

* Set the text of the text element

 * **Parameters:** `string` — The text to be displayed.
 * **Returns:** `h` — object itself.

## `getClassList()`

Get the classList property of the cloud element

 * **Returns:** `h` — classList property of the cloud object.

## `getCloud()`

Get the cloud SVG and append it to the DOM

 * **Returns:** `h` — cloud element.

## `out()`

Get the cloud name from the Azure environment

 * **Returns:** `h` — getCloud() function returns the cloud variable.

## `hide()`

Hide the element

## `show()`

Show the element

> ## ***Class window.Bumblebee.Bubble usable methods***

# Documentation

## `static google()`

The function returns a URL that can be used to call the Google Cloud Text-to-Speech API.

 * **Returns:** `h` — URL to the Google Cloud Text-to-Speech API.

## `static content()`

This function returns the audio content for the audio player.

 * **Returns:** `h` — audioContent string.

## `static female()`

Returns the string 'female' to set the gender of the voice

 * **Returns:** `h` — string 'female'

## `static male()`

Returns the gender 'male' to set the gender of the voice

 * **Returns:** `h` — string 'male'

## `static diction()`

It creates a dictionary of the male and female characters.

 * **Returns:** `h` — dictionary object.

## `constructor(bubble)`

The constructor function creates a new instance of the class

 * **Parameters:** `bubble` — The Bubble object that is calling the API.

## `clone(speech)`

Clone the speech object

 * **Parameters:** `speech` — The speech bubble to clone.
 * **Returns:** `othing` — 

## `getBubble()`

Get the bubble object

 * **Returns:** `h` — bubble object.

## `setVoice(standard)`

Set the voice to use for the synthesized speech

 * **Parameters:** `standard` — The standard voice, which is the default voice.
 * **Returns:** `h` — `setVoice` method returns the `this` object, which is the `Speech` object.

## `getVoice()`

Get the voice of the text to speech engine

 * **Returns:** `h` — voice that was selected in the options.

## `setEnable(value)`

Set the enable option to the given value

 * **Parameters:** `value` — The value to set the checkbox to.
 * **Returns:** `h` — `setEnable` method returns the `this` object, which is the `options` object.

## `getEnable()`

Returns the value of the enable option

 * **Returns:** `h` — value of the enable option.

## `setAPIKey(value)`

Set the API key for the current session

 * **Parameters:** `value` — The value to set the API key to.
 * **Returns:** `h` — `setAPIKey` method returns the `this` object.

## `getAPIKey()`

Get the API key from the user

 * **Returns:** `h` — API key.

## `setCallbackSuccess(func)`

Set the success callback for the XHR object

 * **Parameters:** `func` — The function to be called when the request is successful.
 * **Returns:** `othing` — 

## `getCallbackSuccess()`

Get the callback function for the success event

 * **Returns:** `h` — success callback function.

## `setCallbackFail(func)`

Set the callback function for the XHR request

 * **Parameters:** `func` — The function to call when the request is successful.
 * **Returns:** `h` — `ajax` function is returning the `ajax` object.

## `getCallbackFail()`

Get the callback function for the fail event

 * **Returns:** `h` — callback function for the fail event.

## `getXHR()`

Returns the XHR object

 * **Returns:** `h` — constructor function for XMLHttpRequest.

## `setText(string)`

Set the text of the request

 * **Parameters:** `string` — The string to be displayed.
 * **Returns:** `h` — question object.

## `setLanguageCode(code)`

Sets the language code for the voice request

 * **Parameters:** `code` — The language code of the voice.
 * **Returns:** `h` — request object.

## `getLanguageCode()`

Returns the language code of the voice

 * **Returns:** `h` — language code of the voice.

## `setVoiceName(name)`

Set the voice name

 * **Parameters:** `name` — The name of the voice.
 * **Returns:** `h` — question object.

## `getVoiceName()`

Get the name of the voice that the user selected

 * **Returns:** `h` — name of the voice.

## `setSsmlGender(gender)`

Sets the SSML Voice Gender of the request

 * **Parameters:** `gender` — The gender of the voice.
 * **Returns:** `h` — object itself.

## `getSsmlGender()`

Returns the SSML Voice Gender of the request

 * **Returns:** `h` — SSML Voice Gender.

## `setAudioEncoding()`

Sets the audio encoding for the request

 * **Returns:** `h` — audio encoding.

## `getAudioEncoding()`

Get the audio encoding of the audio file

 * **Returns:** `h` — audio encoding format.

## `getRequest()`

Get the request object from the current context

 * **Returns:** `h` — request object.

## `generate()`

Generate the name to set to the voice

 * **Returns:** `h` — object itself.

## `run()`

It sends a POST request to the Google API.

## `getAudio()`

Create an audio element if it doesn't exist, and return it

 * **Returns:** `h` — audio element.

## `setAudio(base64, encoding)`

* Set the audio element's source to a data URI containing the audio data

 * **Parameters:**
   * `base64` — The base64 encoded audio data.
   * `encoding` — The encoding of the audio.
 * **Returns:** `othing` — 

## `error()`

The function is called when an error occurs.

The function increments the error count and if the error count is less than or equal to 4, it will wait 1 second and then call the run function

## `load()`

Load the audio file from the server and play it

 * **Returns:** `h` — audio file.

## `handleEvent(event)`

If the event type is a function defined in the object, call that function

 * **Parameters:** `event` — The event object that was passed to the handler.
 * **Returns:** `h` — function called.

> ## ***Class window.Bumblebee.Tutorial usable methods***

# Documentation

## `static event()`

It returns the string "ended"

 * **Returns:** `h` — event() method returns the string 'ended'.

## `constructor(bumblebee)`

The constructor function creates a new instance of the Controller class and stores it in the elements.controller property

 * **Parameters:** `bumblebee` — The Bumblebee object that is used to communicate with the Bumblebee server.

## `getBumblebee()`

It returns the bumblebee object.

 * **Returns:** `h` — bumblebee object.

## `getController()`

Get the controller element from the view

 * **Returns:** `h` — controller element.

## `getSteps()`

Get the steps for the recipe

 * **Returns:** `h` — getSteps method returns the steps array.

## `*getGenerator()`

It returns a generator function that can be used to iterate over the steps in the recipe.

## `getCurtain()`

Create a curtain div and append it to the DOM

 * **Returns:** `h` — curtain element.

## `add(callback, after)`

Add a step to the tutorial

 * **Parameters:**
   * `callback` — The function that will be called when the step is reached.
   * `after` — The step after which this step will be added.
 * **Returns:** `h` — step that was just added.

## `getPrevious(step)`

Get the previous step in the generator

 * **Parameters:** `step` — The current step in the generator.
 * **Returns:** `h` — previous step.

## `getNext(step)`

* Get the next step in the tutorial

 * **Parameters:** `step` — The step to get the next step for.
 * **Returns:** `h` — next step in the tutorial.

## `play()`

It plays the tutorial.

## `stop()`

*Stop the tutorial.*

The function is called when the user clicks the "Stop" button. It first gets the generator of the tutorial steps, then it calls the deactivate method on each step. The deactivate method returns the previous step, so the function keeps a reference to the previous step. If the previous step is a step object, it calls the terminator function on the step. The terminator function is a function that is defined in the step object

> ## ***Class window.Bumblebee.Tutorial.Step usable methods***

# Documentation

## `static lighten()`

*lighten* returns the string *tutorial*

 * **Returns:** `h` — string "tutorial" is being returned.

## `constructor(tutorial, callback)`

* Create a new JavaScript object that will be used to control the tutorial

 * **Parameters:**
   * `tutorial` — The tutorial object that this bubble belongs to.
   * `callback` — A function that will be called when the tutorial is completed.

## `getTutorial()`

Get the tutorial

 * **Returns:** `h` — tutorial object.

## `getCallback()`

Get the callback function that was passed to the function

 * **Returns:** `h` — callback function.

## `getBubble()`

Get the bubble element

 * **Returns:** `h` — bubble element.

## `getLightens()`

Get the lightens option

 * **Returns:** `h` — getLightens() method returns the lightens array.

## `setTerminator(callback)`

Set the terminator callback

 * **Parameters:** `callback` — A function that is called when the stream is finished.
 * **Returns:** `h` — `setTerminator` method returns the `this` object.

## `getTerminator()`

Get the terminator value from the options object

 * **Returns:** `h` — terminator option.

## `addLighten(element)`

Add a lighten to the lightens array

 * **Parameters:** `element` — The element to add to the lighten list.
 * **Returns:** `h` — current object.

## `get()`

The get() function returns a function that calls the callback function and activates the step

 * **Returns:** `` — function that calls the callback function and activates the step.

## `activate()`

Activate the tutorial step by adding the lighten class to the step's elements

 * **Returns:** `h` — element itself.

## `deactivate()`

Deactivates the tutorial step

 * **Returns:** `h` — element itself.

> ## ***Class window.Bumblebee.Tutorial.Controller usable methods***

# Documentation

## `static grid()`

Returns the grid class for the grid layout

 * **Returns:** `h` — string 'pure-u-6-24'

## `constructor(tutorial)`

The constructor function creates a new instance of the Tutorial class.

The constructor function takes a single parameter, which is the tutorial object that was created in the previous step. The constructor function creates a new instance of the Tutorial class.

 * **Parameters:** `tutorial` — The tutorial object that this step belongs to.

## `getTutorial()`

Get the tutorial

 * **Returns:** `h` — tutorial object.

## `setStep(step)`

Set the step size for the slider

 * **Parameters:** `step` — The step size of the slider.
 * **Returns:** `h` — object itself.

## `getStep()`

Get the current step.

 * **Returns:** `h` — step that is being returned is the step that is being passed in the options.

## `getPrevious()`

Get the previous button if it exists otherwise it creates a new one.

 * **Returns:** `h` — previous button.

## `getPlay()`

It creates a button that can be used to play or pause the audio if it exists otherwise it creates a new one.

 * **Returns:** `h` — play button.

## `getStop()`

* Create a new button element. * Add the button to the tutorial's grid. * Set the button's icon to the stop icon. * Set the button's onclick event to pause the audio and stop the tutorial. * Return the button

 * **Returns:** `h` — stop button.

## `getNext()`

Get the next button

 * **Returns:** `h` — next button.

## `getController()`

Create a controller that contains the previous, play, stop, and next buttons

 * **Returns:** `h` — controller is being returned.

## `out()`

Get the controller for the current view

 * **Returns:** `h` — controller.

> ## ***Class window.Bumblebee.Tutorial.Controller.Button usable methods***

# Documentation

## `static previous()`

*The previous() function returns the string 'skip_previous'*

 * **Returns:** `h` — string 'skip_previous'

## `static play()`

Returns an array of two strings, each of which is a valid icon name

 * **Returns:** `` — array of strings.

## `static stop()`

It returns a string.

 * **Returns:** `h` — string 'stop_circle'

## `static next()`

Skip the next iteration of the loop

 * **Returns:** `h` — string 'skip_next'

## `getController()`

Get the controller for the current command

 * **Returns:** `h` — command object.

> ## ***Class window.Bumblebee.Callback usable methods***

# Documentation

## `constructor(element, func)`

The constructor function takes two parameters, an element and a function. It creates a new object and assigns the element and function to the object

 * **Parameters:**
   * `element` — The element to be observed.
   * `func` — The function to be called when the event is triggered.

## `getElement()`

Returns the element that the `<div>` is attached to

 * **Returns:** `h` — element that was created.

## `get()`

Get the callback function from the JavaScript object

 * **Returns:** `h` — callback function.

> ## ***Class window.Bumblebee.Command usable methods***

# Documentation

## `static open()`

Open the file

 * **Returns:** `h` — string 'open'

## `static audio()`

Returns an array of audio files that can be played by the browser

 * **Returns:** `` — array of strings.

## `static hover()`

The hover() function returns an array of strings that represent the JavaScript events that will be bound to the button

 * **Returns:** `h` — hover() method returns an array of strings.

## `constructor(bumblebee)`

The constructor function sets up the JavaScript object that will be used to interact with the Bumblebee API

 * **Parameters:** `bumblebee` — The bumblebee object that is calling the constructor.

## `getBumblebee()`

It returns the bumblebee object.

 * **Returns:** `h` — bumblebee object.

## `setAudio()`

Create an audio element and append it to the list

 * **Returns:** `h` — question object.

## `getAudio()`

It creates an audio checkbox.

 * **Returns:** `h` — audio checkbox.

## `setGender()`

Create a new HTML element and append it to the list

 * **Returns:** `h` — object itself.

## `getGender()`

Create a new Li element if it not exists and set it to the gender property of the Bubble.Speech object

 * **Returns:** `h` — gender checkbox.

## `setHover()`

Add the hover element to the list

 * **Returns:** `h` — object itself.

## `getHover()`

Get the hover element, if it exists. If it doesn't exist, create it

 * **Returns:** `h` — hover element.

## `setTutorial()`

*Append the tutorial to the list.*

 * **Returns:** `h` — object itself.

## `getTutorial()`

Create a new Li element and set its text to 'Tutorial'

 * **Returns:** `h` — tutorial button.

## `getList()`

Create a list element if it doesn't already exist

 * **Returns:** `h` — list element.

## `getListClass()`

Get the list element for the current page

 * **Returns:** `h` — classList of the list element.

## `getWrapper()`

Create a wrapper element for the command

 * **Returns:** `h` — wrapper element.

## `setClickable(element)`

Set the clickable element to the element passed in

 * **Parameters:** `element` — The element that will be used to open the dropdown.
 * **Returns:** `h` — object itself.

## `out()`

Returns the JavaScript representation of the object

 * **Returns:** `h` — getWrapper method is returning the HTML code for the form.

## `handleEvent(event)`

* For each attribute in the element, split the attribute into a list of commands. * For each command, split the command into a command type and a command name. * If the command type is the same as the event type, or if the command type is empty, execute the command

 * **Parameters:** `event` — The event object that was passed to the function.
 * **Returns:** `h` — `handleEvent` method is being returned.

## `close(event)`

The function is called when the user clicks on the close button

 * **Parameters:** `event` — The event object that triggered the close.
 * **Returns:** `othing` — 

## `open()`

Open the dialog

## `status()`

Returns a boolean indicating whether the list is open

 * **Returns:** `h` — status() method returns a boolean value.

> ## ***Class window.Bumblebee.Command.Li usable methods***

# Documentation

## `constructor(command)`

The constructor function creates a new instance of the class.

 * **Parameters:** `command` — The command that will be executed when the button is clicked.

## `getCommand()`

Get the command that was executed

 * **Returns:** `h` — command that was passed in the constructor.

## `getIcon()`

Get the icon element

 * **Returns:** `h` — icon element.

## `setBswitch(on, off)`

Set the icon to the "on" state

 * **Parameters:**
   * `on` — The icon to display when the switch is on.
   * `off` — The icon to display when the switch is off.
 * **Returns:** `h` — object itself.

## `getBswitch()`

Get the value of the bswitch option

 * **Returns:** `h` — value of the bswitch option.

## `setOnClick(func)`

It sets the onclick property of the button to the function passed in.

 * **Parameters:** `func` — The function to be called when the button is clicked.
 * **Returns:** `h` — object itself.

## `getOnClick()`

Get the onclick event handler for the button

 * **Returns:** `h` — onclick event handler.

## `getCheckbox()`

Create a checkbox element

 * **Returns:** `h` — checkbox element.

## `setCheckbox(status)`

Set the checkbox to the given status

 * **Parameters:** `status` — The status of the checkbox.
 * **Returns:** `h` — object itself.

## `getMain()`

Create a new `<li>` element and set its `data-toggle` attribute to `:toggle`

 * **Returns:** `h` — <li> element.

## `getClassList()`

Get the classList property of the main element

 * **Returns:** `h` — classList property of the main element.

## `getText()`

Create a span element if it doesn't already exist, and return it

 * **Returns:** `h` — text of the question.

## `setText(string)`

Set the text of the element

 * **Parameters:** `string` — The string to be appended to the text node.
 * **Returns:** `h` — object itself.

## `out()`

Get the main element of the page

 * **Returns:** `h` — main function.

## `toggle(event)`

Toggle the checkbox and call the onclick function

 * **Parameters:** `event` — The event object that was triggered.

## `change()`

*If the checkbox is checked, set the icon to the value of the corresponding key in the bswitch object

## `handleEvent(event)`

* For each attribute in the element, split the attribute into a list of commands. * For each command, split the command into a command type and a command name. * If the command type is the same as the event type, or if the command type is empty, then execute the command

 * **Parameters:** `event` — The event object that was passed to the function.
 * **Returns:** `h` — `handleEvent` method is being returned.

> ## ***Class window.Bumblebee.Command.Li.Icon usable methods***

# Documentation

## `constructor(li)`

Creates a new JavaScript object and stores a reference to the HTML list element in the object

 * **Parameters:** `li` — The list item that contains the button.

## `getLi()`

Returns the `li` element of the element

 * **Returns:** `h` — getLi() method returns the value of the li property.

## `get()`

Create an icon element if it doesn't exist, and return it

 * **Returns:** `h` — icon element.

## `set(material)`

Set the inner text of the icon element

 * **Parameters:** `material` — The material to display in the icon.
 * **Returns:** `h` — icon element.

## `remove()`

Remove the element from the DOM

 * **Returns:** `h` — object itself.

## `out()`

Get the value of the current node and return it

 * **Returns:** `h` — value of the variable.

## Built With

* [Javascript](https://www.javascript.com/) - Javascript

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details