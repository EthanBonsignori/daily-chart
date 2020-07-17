<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [License](#license)
* [Contact](#contact)

<!-- ABOUT THE PROJECT -->
## About The Project

[![Chart Screenshot][chart-screenshot]](https://github.com/EthanBonsignori/daily-chart)

This Chart app started as a way to track my phone calls to a certain government organization during a certain pandemic. I wanted it to be universal and customizable for other purposes, so I converted it to React, added settings, and a pretty UI so that anyone could use it. Why? To track occurences of just about anything over a day and see that data in a nice graph! And don't forget you can look at that data in bar-form over the past 7 or 30 days too, with optional weekend dates!

### Built With
* [React](https://reactjs.org)
* [Electron](https://electronjs.org)

<!-- GETTING STARTED -->
## Getting Started

If you would like to use this, clone this repo.

### Installation (clone)
##### Prerequisites
* Node - install the latest version of node at https://nodejs.org

1. Clone the repo
```sh
git clone https://github.com/EthanBonsignori/daily-chart
```
2. Install NPM packages
```sh
npm install
```
3. Run the application
```sh
npm start
```

## Customize your chart!

![Call Chart Screenshot][chart-settings-gif]

## Future Updates

Feature: Choose Daily Chart time range in hours.

Feature: Remove last datapoints.

Feature: See previous days on the daily chart.

Slight annoyance: Changing either Dataset text causes graphs to rerender on each keystroke due to the labels and state updates.

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Ethan Bonsignori - [@EthanBonsignori](https://twitter.com/EthanBonsignori) - ethanbon.com

Project Link: [Daily Chart](https://github.com/EthanBonsignori/daily-chart)


<!-- MARKDOWN LINKS & IMAGES -->
[chart-screenshot]: static/images/chart-screenshot.png
[chart-settings-gif]: static/images/chart-settings.gif
