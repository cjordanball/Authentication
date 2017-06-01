# Authentication
[toc]
## Introduction
1. These notes follow the major portion of Stephen Grider's course on Udemy, *Advanced React and Redux*, although a large portion of this material will have nothing to do with React/Redux, but with the back end tasks of authoriztion. It can be seen as a summary of a many topics all bundled together, so the following notes might seem a bit disjointed.

2. Be sure to see the completed app in the *apps* subdirectory to see the details of the items discussed herein.

3. Architecture will be a major part of this project. There will be a separate server to handle authentication, and this will have nothing to do with React (or Redux). All that the React front-end requires is that it get served valid JSON data, and it doen't matter what kind of server does it, *apache*, *nginx*, *node*, *etc.*

## Authentication Generally
1. For a very helpful overview, look in the *Diagrams* directory for the file *Authentication Flow.png*, which shows from a high level the steps involved and where the steps are performed.

2. One key concept is that we only want to authenticate a user one time, but we need to know every time the user makes a request to the server for a protected resource, are they authorized or not. This is done by having a single, up-front, request for username/password to authenticate, then passing to the user an identifying token to last the session. The token will get added to each request behind the scenes, so the user will not have to deal with it. When the session ends, the token should disappear.

### Cookies vs. Tokens
1. Once the user is authenticated (*i.e.*, he has entered his username and password, and been recognized as a valid user), he will receive a piece of information that identifies him as authorized. This may be in the form of a **cookie** or a **token**, each of which is described below.

2. A **cookie** is a chunk of JSON data that is included automatically in the header of each and every request sent to the domain for which that cookie is associated. It cannot be sent to other domains. At root, they are an attempt to bring state into an inherently stateless environment.

3. A **token** is simply a piece of data, usually a long identifying string. They are **not** included automatically in the request, and must be wired up manually; *i.e.*, we will add a header property such as:
    ```
    authorization: asdf9wer3ww
    ```
4. One important thing about tokens is that they **can** be sent to any domain. So, if our application is distributed over serveral servers on different domains, we can use the single token to access any of them, whereas we would need a separate cookie for each separate domain.

5. Generally, the world is heading towards tokens as the session verification solution, and that is what we will use in these notes.

### Scalability
1. 


