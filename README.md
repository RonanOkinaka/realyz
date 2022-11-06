## Development Setup

We'll use a really common Node.js project workflow + Yarn!
First, let's clone our repository, and install all of our yarn dependencies:

```
git clone <github repo URL>
cd realyz_frontend
```

The instructions to install Node.js will be different based on which platform you're running. It's heavily advised to install your Node.js using NVM (Node Version Manager) because it's easy to manage a standardized version and update it as needed.

### macOS or Linux

Instructions for installing NVM on macOS and Linux (including WSL) are [here](https://github.com/nvm-sh/nvm#installing-and-updating).

At this point you can run `nvm install`. Assuming you've already `cd`ed into the correct directory as mentioned earlier, this will download the LTS (Long-Term Support) version of Node.js for you. Then, run `nvm use` to make sure you've switched to the right version; if it tells you `Now using Node v16.13.2` or something similar, you're good to go!

RUN `npm install --global yarn` to install yarn 
RUN `yarn` to install any unmet dependencies
RUN `npm run build` to compile the dev environment,
RUN `npm start` to start the server on localhost.

If you cannot install nvm successfully or run using the above instruction,
What happened could be a previous version of node was not completely wiped and had conflict with the recent node.
Tried to wipe npm, nvm and node by
`rm -rf ~/.npm`
`rm -rf ~/.nvm`

reinstalling node and npm using node.js installer

reinstall nvm using the script
`touch ~/.zshrc`
`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash`

check npm, nvm and node is working:
`nvm -v`
`npm -v`
`node -v`

if it says `zsh: command not found for nvm`, create another terminal in vscode and repeat the steps.

### Windows

If you're on Windows, you can use NVM for Windows, a separate version manager whose installation instructions can be found [here](https://github.com/coreybutler/nvm-windows#installation--upgrades). Once you've done that, you can run `nvm install 16.13.2` to install the LTS version of Node.js, and `nvm use 16.13.2` to switch to it.

If you don't have yarn instal$led...

```
npm install --global yarn
```

Then install our dependencies!

```
yarn install
yarn prepare
```

(If the above commands don't work even after installing yarn via npm, check this [npm installation guide](https://classic.yarnpkg.com/en/docs/install/#mac-stable), click on alternatives, choose your operating system, and follow the steps there!)

(We handle the yarn and npm conflict issues within our `.gitignore` we set up so dw about it!)
To start our app, you just need to run `yarn start`!

yarn run build

```


## Contribution Workflow

Thanks for your interest in contributing to realyz!

Here's a quick guide on how to get started.
```

1. `git checkout -b frontend origin/frontend` to sync your work history to the frontend team.
2. Follow the instructions in `Development Setup` above.
3. `git checkout -b Your_issue` to Beep boop away!
4. **Before you push**, make sure your app runs with `npm start`. If there are any errors, our CI/CD service will **reject your build**.
5. Once you're ready, stage and commit your changes to your branch!
6. Make a [pull request] with your changes, and let Raj, Harvey, or Abhay know.
7. If your code passes code review, then we can **squash and merge** it into `frontend`. Congratulations! If you'd like, it's now safe to delete your branch/fork.

```
*** Please treat frontend as our main branch and only commit to branch frontend/YourIssue. After code review we will merge your changes to frontend.
