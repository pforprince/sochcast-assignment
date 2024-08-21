# SochCast Assignment

Repo for SochCast Assignment

## Folder Structure

The repository is structured as follows:

```
/src
  /pages
  /components
```

- The components folder contains common components which are being used by app.
- The pages folder contains screens (e.g /home)

## Getting Started

Before running the app, you will need to update the values in `.env` file.

To run the application:

- Install the dependencies
- Create the build
- Run the build

To install the dependencies:

```
npm install -g pnpm
pnpm i
```

To create the build:

```
pnpm build
```

To run the build:

```
pnpm preview
```

Console will bring the url for running application.

You can start editing the page by modifying `src/pages/homeScreen/page.tsx`. The page auto-updates as you edit the file.
