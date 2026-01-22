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

