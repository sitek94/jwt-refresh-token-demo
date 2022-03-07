# JWT Access & Refresh Token Flow

Avoid using Cookies or Local Storage for storing JWT tokens, by:
1. Storing the Access Token in the app state
2. Storing the Refresh Token in an HttpOnly Cookie.

HttpOnly Cookie, cannot be accessed by JavaScript, but it can be sent back to the server, where
it's going to be recognized.

## Todos
- [ ] [HTTP only cookie](https://www.youtube.com/watch?v=5rlsUfQTRzs) 
- [ ] [How to refresh token in React](https://www.youtube.com/watch?v=nI8PYZNFtac) 
- [ ] [React Security Fundamentals](https://courses.reactsecurity.io/view/courses/react-security-fundamentals/302432-handling-auth-state/864672-check-if-the-user-is-currently-authenticated)

## Resources 
- [NestJs JWT - Access Tokens & Refresh Tokens](https://youtu.be/uAKzFhE3rxU)
- [NestJS Demo](https://github.com/sitek94/nestjs-demo) - repo that I used as a starter for server part of this project 
- [Create React App](https://create-react-app.dev/) - client part of the project
