# Documentation widget-bumblebee

Widget Javascript Bumblebee is a library used to create tutorial inside page with the help of a speech synthesizer.

## Usage

So the basic setup looks something like this:

```

let bumblebee = new Bumblebee();

// bumblebee.set(<HTMLElement>, 'Text that will be played at the hover event on the selected item.');

bumblebee.getTutorial().add(function () {

    // this.addLighten(<HTMLElement>); Element to which the tutorial style will be added

    this.getBubble().setText('Text that bumblebee will reproduce on automatic step tutorial.');
    this.getBubble().show();

}).setTerminator(function () {
    // Function to do when the speech is finished
});

document.appendChild(bumblebee.out());

```

## Structure

library:
- [window.Bumblebee](https://github.com/energia-source/widget-bumblebee/tree/main/lib)
- [window.Bumblebee.Bubble](https://github.com/energia-source/widget-bumblebee/tree/main/lib)
- [window.Bumblebee.Bubble.Speech](https://github.com/energia-source/widget-bumblebee/tree/main/lib)
- [window.Bumblebee.Tutorial](https://github.com/energia-source/widget-bumblebee/tree/main/lib)
- [window.Bumblebee.Tutorial.Step](https://github.com/energia-source/widget-bumblebee/tree/main/lib)
- [window.Bumblebee.Tutorial.Controller](https://github.com/energia-source/widget-bumblebee/tree/main/lib)
- [window.Bumblebee.Tutorial.Controller.Button](https://github.com/energia-source/widget-bumblebee/tree/main/lib)
- [window.Bumblebee.Callback](https://github.com/energia-source/widget-bumblebee/tree/main/lib)
- [window.Bumblebee.Command](https://github.com/energia-source/widget-bumblebee/tree/main/lib)
- [window.Bumblebee.Command.Li](https://github.com/energia-source/widget-bumblebee/tree/main/lib)
- [window.Bumblebee.Command.Li.Icon](https://github.com/energia-source/widget-bumblebee/tree/main/lib)

<br>

## Contributing

Please read [CONTRIBUTING.md](https://github.com/energia-source/widget-bumblebee/blob/main/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting us pull requests.

## Versioning

We use [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/energia-source/widget-bumblebee/tags). 

## Authors

* **Paolo Fabris** - *Initial work* - [energia-europa.com](https://www.energia-europa.com/)
* **Gabriele Luigi Masero** - *Developer* - [energia-europa.com](https://www.energia-europa.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details