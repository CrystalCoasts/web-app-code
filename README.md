# Project Setup and Deployment Guide (on Linux windows steps will be posted soon)

## Steps for Initial Setup
To set up this project for the first time on your local machine, follow these steps:

1. **Install Dependencies**: Run `npm install` to install all the dependencies defined in `package.json`.
2. **Link github pages to the environment**: `sudo npm install -g gh-pages`
3. **Start the Project Locally**: Use `npm run dev` to start the project in development mode. This allows you to see your changes reflected in real-time as you develop.
4. **Update Github Page**: Once changes have been tested, the github page can be updated by using: `npm run deploy`


Notes: 
1. The command `npm run dev` typically starts a development server that watches for file changes and automatically reloads your web application. Ensure it's running as you make changes to your code to see updates in real-time.
2. In some setups, `npm start` is used to run the project in a slightly different context or environment.

## After Initial Setup
Once you've made changes to your project and you're ready to share those changes or deploy them, follow these steps:

1. **Stage Your Changes**: Use `git add <changes>` to stage changes you've made to the project. Replace `<changes>` with the specific files you've changed or use `.` to stage all modified files.
2. **Commit Your Changes**: Commit your staged changes with a descriptive message using `git commit -m "Your Message Here"`.
3. **Push Your Changes**: Push your commits to the remote repository to share your changes with others or to simply save the changes on GitHub.
4. **Deploy to GitHub Pages**: If you're ready to update the live site hosted on GitHub Pages, run `npm run deploy` to build and deploy your site.

This `npm run deploy` command builds your project and pushes the build artifacts to the `gh-pages` branch (or whatever branch is configured for GitHub Pages in your repository), updating your live site.

Remember to frequently commit your changes and keep your remote repository up-to-date with your local developments. Happy coding!
