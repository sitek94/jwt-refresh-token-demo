# JWT Access & Refresh Token Flow

Avoid using Cookies or Local Storage for storing JWT tokens, by:
1. Storing the Access Token in the app state
2. Storing the Refresh Token in an HttpOnly Cookie.

HttpOnly Cookie, cannot be accessed by JavaScript, but it can be sent back to the server, where
it's going to be recognized.

## Getting started

1. Clone the repo
   ```bash
   git clone https://github.com/sitek94/jwt-refresh-token-demo.git
   ```
2. Install all dependencies
   ```bash
   npm run install-deps
   ```
3. Make sure you have a [Docker](https://docs.docker.com/) running 
4. Start the client
   ```bash
   npm run dev:client
   ```
5. Start the server
   ```bash
   npm run dev:server
   ```
6. Open the browser and navigate to http://localhost:3000

## Resources 
- [NestJs JWT - Access Tokens & Refresh Tokens](https://youtu.be/uAKzFhE3rxU) by
  Vlad Agaev
- [React Login Authentication with JWT Access, Refresh Tokens, Cookies and Axios](https://github.com/gitdagray/react_jwt_auth) by Dave Gray
- [React Security Fundamentals](https://courses.reactsecurity.io/view/courses/react-security-fundamentals/302432-handling-auth-state/864672-check-if-the-user-is-currently-authenticated) by Ryan Chekie
- [NestJS Demo](https://github.com/sitek94/nestjs-demo) - repo that I used as a starter for server part of this project 
- [Create React App](https://create-react-app.dev/) - client part of the project
- [All You Need to Know About Storing JWT in the Frontend](https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id)
