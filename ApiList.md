# DevTinder


## AuthRouter 

-- POST  : /signup
-- POST  : /login


## ProfileRouter

-- GET   : /profile/view
-- PATCH : /profile/edit
-- PATCH : /profile/password - only for password


**iStatus : gnored/interted   excepted/rejected**

## ConnectionrequestRouter

-- POST  : /request/send/interested/:userId
-- POST  : /request/send/ignored/:userId

-- POST  : /request/received/accepted/:userId
-- POST  : /request/received/rejected/:userId


**At the last not the least**

## userRouter

-- GET   : /user/connections
-- GET   : /user/requests/received
-- GET   : /user/feed   -->first(10,20)

/feed?page=1&limit=10 -->(1-10)  .skip(0)  & .limit(0)
/feed?page=2&limit=10 -->(2-20)  .skip(10)&.limit(10)
/feed?page=3&limit=10 -->(3-30)
/feed?page=4&limit=10 -->(4-40)