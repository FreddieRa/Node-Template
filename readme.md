# Node Template

This is a template for Node.js applications.


## How to use

1. Download the code and copy to new repo
2. Choose the Plain or Rooms version by deleting the irrelevant files.
   1. If you want the rooms version, rename both the client and server files to remove the `Room` suffix.
3. Add a link to the repo at https://dashboard.heroku.com/
4. Create a specific branch for Heroku to build from
5. Test locally with `heroku local web`
6. App is then found at `http://localhost:5000/`


## Structure

 - Node.js Server: `server.js` | `serverRoom.js`
 - Client Javascript: `js/client.js` | `js/clientRoom.js`
 - Homepage: `index.html`
 - Stylesheet: `css./StyleSheet.css`

## Plain

This version is designed to have a single user interacting with the server.

## Rooms

This version is designed to have multiple users joining a room, and therefore a number of independent instances.