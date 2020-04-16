# Contribution

Thank you for your interest in contributing to this project.

This document contains the protocol and workflow for contributions to the **Coronavirus Dashboard** service.

## Repository
The GitHub repository consists of 2 primary branches:
- The `master` branch
- The `development` branch

### Master branch
The `master` branch is the base - anything that is committed to the `master` branch is considered final, and are deployed 
to the production server. 

> **NOTE:** It is assumed that the changes are both approved and tested. 

Please refrain from either committing your contributions to the `master` branch or creating pull requests against it. 

### Development branch
All contributions should be made to the `development` branch, and should ideally adhere the following protocol:

- Create a branch off of the `development` branch. 
- Commit your contributions to the new branch.
- When complete, create a pull request for your branch to be merged with the `development` branch. Please describe your
  changes in the pull request.

> **NOTE:** Please use meaningful commit messages.

Once merged, the changes will automatically trigger a new build (Continuous Integration), which in turn updates the 
test server. Once complete, the changes will be reviewed by the testing team. 

**If approved**, the `development` branch will then be merged with `master` branch, which is regularly built and deployed 
to the production server. 

**If rejected**, the merge will be reverted, and an issue will be created to highlight the problems.

> The `development` branch is always ahead of the `master` branch. Always use the `development` branch to minise conflicts. 

## Good Practice
Please add comments to your commits and describe the changes. Add additional descriptions in the comments section 
where necessary.

Use descriptive variable names and comments in the code where necessary to help other developers maintain the code.

Implement documentations and typing interfaces where appropriate.

Where possible, please address all warnings that are highlighted during local compilations.


## Local run and build

To run the code locally:

- Install `Node.js` and `NPM`
- Navigate to the directory where the code is stored
- Run the following commands to install:

```bash
npm install -g yarn
npm install
yarn install
```
- Run the following command to run the service:
```bash
yarn run start
```

To build the service on your local machine, run the following command:
```bash
yarn run build
```
