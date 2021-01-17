[![Netlify Status](https://api.netlify.com/api/v1/badges/802ab005-3164-478b-a6c9-08130e50170d/deploy-status)](https://app.netlify.com/sites/sleepy-poitras-f1fe38/deploys)

# ✨ Demo App for Collibra Coding Challenge

See the demo: [The Movie Db](https://app.netlify.com/sites/sleepy-poitras-f1fe38/deploys)

## API

This project is using [The Movie Database (TMBb) api](https://www.themoviedb.org/documentation/api).
The api is available for everyone, but requirs api key to identify applications. To get the key, first register as TMDb user, and then request API key from within your [account Setting page](https://www.themoviedb.org/settings/api).

To run the project localy, you will need to setup your local environment variables in .env.local file. See the example file in the root directory.

For more details on available data check out The Movie Database [API documentation](https://developers.themoviedb.org/3/)

## Libraries used

### Material UI

### React Router

Although, for such a simple app, routing could have been implemented, I've used it for a couple of reasons. First, any new dev jumping in the project will already know what react-router is, hence no need to document it and maintain.

## TODO

- [ ] Autogenerate api services with types based on specification
- [ ] On app initialization, make api call to get all required configuration
- [ ] Use Formik or react-hook-form
- [ ] Use SWR or react-query for fetching data.
- [ ] Use MSW (Mock Service Worker) for api mocking
- [ ] Add typeahead feature for search bar. Throttle quick typing
- [ ] Add pagination for movie lists
- [ ] Sequre api key. Create a proxy server that will hide apy key from exposing to end user.
- [ ] Fix search form submitting

#

<details>
    <summary>Challenge details</summary>

## Intro

This challenge will help us evaluate your coding style and how you structure your projects.

What do we expect from you:

- Develop simple and well-designed components
- Clean and modern look
- Provide a good experience for developers jumping in your project

## The challenge

Choose a public API and develop an app with it.

- [Public GraphQl APIs](https://github.com/APIs-guru/graphql-apis)
- [Public JSON](https://github.com/public-apis/public-apis)
- [REQ | RES](https://reqres.in/)

## Requirements

- Must be written in React
- Create one page with a list of items (can be a list or table)
- Create a detailed view of an item (can be a page, modal, ...)
- Create an add/edit form (it should display an error toast when submitting)
- Create a delete button (it should display an error toast when submitting)

## Extras

- Document the project
- Use Typescript
- Create tests with jest
- Be creative and implement a new feature
- You can use a GraphQl client (Relay, Apollo,...)

## Tips

- Try to use libraries you are already familiar with
- Before choosing the API, check if you can all the information you want from it
- You can use a boilerplate for your project
  - create-react-app
  - create-react-app with typescript
- You can use a UI framework to make your app look cool
  - Office UI Fabric
  - Material UI
- Documentation
  - How to run the project
  - Things you want to improve in your project
  - Explain the technology and libraries used

</details>
