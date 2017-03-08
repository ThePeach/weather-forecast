# weather-forecast

A small UX/UI experiment for a 5 days weather forecast page

## What has been done here?

Tried to be as much pedantic as possible in following the 4 hours time limit given.

I had given myself an entire afternoon to complete this task, but I had to take multiple breaks in between for various reasons.

Long story short, this is the very essential list of tools I tried to employ using them as much from scratch as possible:

- [BrowserSync](https://www.browsersync.io)
- ES6 syntax (checked with `eslint`)
- A _very-simple_ API interface for parsing the data in a manageable format
- [Susy](http://susy.oddbird.net) as basic SASS framework
- BEM and ITCSS

The GIT history should be quite self explanatory on how I progressed, but let's make it particularly explicit:

- analysis of the requirements
- following 1 hour spent mostly in setting up the project: as per requirements I wanted to demonstrate proper engineering practices and start from scratch and see how much I could achieve in this limited amount of time. In hindsight I could have easily used a scaffolding application, or pre-existing frameworks or high-level libraries to cut down a lot of time and concentrate on the actual engineering side of it, but this wouldn't have had the same result from a bare-bone point of view.
- 30 - 45 minutes spent in understanding the API (took me a while to understand it was a 3 hours time frame, and it was even written clearly there!), together with retrieving an API KEY.
- Given the information acquired of what could actually be outputted, I spent about 1 hour in implementing the basic structure of the markup from a semantic perspective, as well as using a very basic grid system, and styling the whole thing using SASS and BEM as a naming convention. I'd like to highlight that the `main.scss` should reflect an ITCSS type of organisation, albeit the project size might not be large enough to justify subfolders and further break-downs of the structure.
- The remaining time was spent defininig the whole structure: I decided to use JSONP with a callback to avoid any additional problem from a UX point of view for the user, and be able to concentrate in the actual data manipulation. The second step was to decide for as solid data structure that would allow me to access the data I needed in the UI as quickly as possible, you will note that the object `Day` is a state representation for the _Forecast Day_. I went on and used classic ES5-type modules (IIFEs) which allowed me to avoid adding a transpilation step (given the project is run in a recent-enough browser). More on this later.

## How could it be improved

Given the time, I'd like to add the following (in order or importance):

- **basic functionality** as you might have noticed the only things that are currently being updated are the date and the min/max temperatures. This would have been sufficient to prove a point, but there are some challenges in the data that would require a bit more investment of time.
- **unit, functional and acceptance tests**: the hour I had left to code the whole JS side wasn't enough to even start thinking about using TDD, which would have meant sacrifiying the basic requirement of the project. The tools I would have probably picked would have been [Jest](https://facebook.github.io/jest), while using [CodeCeptJS](https://github.com/codeception/codeceptjs/) with [NightmareJs](http://www.nightmarejs.org/) and/or WebDriver for functional and acceptance testing (purely for the level of abstraction allowed)
- **Overall architecture**: I would have split the code in a small Node.js API, moving the parser over there, possibly using a very simple templating system such as [Handlebar](handlebarsjs.com) and [express.js](http://expressjs.com/).
- **FE architecture**: I would have moved over ES6 modules instead of IIFEs, and add a layer of transpilation using Babel+Browserify for retro-compatibility. Alternatively I would have used a library such as [Vue.js](http://vuejs.org/) for better state management, rapid updates on the UI and enabled some degree of user interaction with the widget.
- **UI**: this bit could have been greatly improved, and some additional work could have been spent in adding some transition states and notification between unloaded/loaded data. Additional effort could have been spent to cover the offline state and similar scenarios that might require caching.
- **Accessibility**: I would have tried to make sure the interaction with screen readers would have worked as expected and the tabbing sequence would work, together with adding some hearing aids to the users.
- **UX**: a lot of data was missing, especially from the content strategy point of view, this meant that the whole architecture is biased: a proper analysis on the target users, competition and IA would have given much more focus on what needed to be created (in a real-world scenario).

## How to build the project

### Requirements

At the moment of writing, **Node 7.6.0** has been used. 

If you are using [NVM](https://github.com/creationix/nvm) the project contains an `.nvmrc` file with the version used, just run the following commands:

- `nvm install`
- `nvm use`

Otherwise just install the required version with your preferred method.

### Building the project

- `git clone` the project
- `cd` into the project directory
- `npm install` all the dependencies
- `npm run serve` to start a local server instance, it will open automatically your default browser, if this shouldn't happen, just point your browser to `http://localhost:3000`.
