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

```
yarn start

And to build our project for production (with CRA and Webpack's bundling with all that goodness),

```

yarn run build

```


## Contribution Workflow

Thanks for your interest in contributing to realyz!

Here's a quick guide on how to get started.

1. Either make a new branch or a fork of this repository. `main` is a protected branch, **so you cannot push to it**.
2. Follow the instructions in "Development Setup" above. If you're on a fork, replace the URL with the fork's URL; if you're on a different branch, check it out using `git checkout`.
3. Beep boop away!
4. **Before you push**, make sure your app runs with `yarn start`. If there are any errors, our CI/CD service will **reject your build**.
5. Once you're ready, stage and commit your changes!
6. Make a [pull request] with your changes, and let someone on your project team know.
   a. Netlify has a neat feature called "Deploy Previews" that give you a link to preview your changes; [see the blog post](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) for more info!
7. If your code passes code review, then we can **squash and merge** it into `main`. Congratulations! If you'd like, it's now safe to delete your branch/fork.
