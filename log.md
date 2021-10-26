<b>Afternoon of 26/09/2021 at 3:25pm,</b>

- We finished the implementation of user verification and user login in the server
- Started to implement the createPost function. The creatPost function should enable a user to create a post in the social media network
- And also check if the creating post user is properly authenticated in the server.
- We created new files check-auth.js in the util folder.
- We introduced a third element in the resolvers Object ==> context.

All of these took a period of about 45 mins.

Questions for this session:
- Why was body used as a destructured argument in createPost async function? (Read on destructuring of arguments in js)
- 

<b>Early Afternoon of 26/09/2021 at 12:47pm, </b>

- Noticed some bugs in the code:
    - No connection between the schema and the resolvers
    - No connection between the resolvers and the postResolvers.Mutation Object
    ** Corrected both of these errors **
    Error *- Cannot read 'headers' property of undefined [at util/check-auth.js, at module.exports, at authHeader **=>```const authHeader = context.req.headers.authorization```]
    ** Uncorrected yet **

<b>Evening of same day, at 9:53pm, </b>
- Fixed ```Error *``` of the previous log:
    - It was discovered that the cause of the error was in the index.js file.
    - The error was corrected by just adding parentheses to the 'req' object. [//And that was strange]
