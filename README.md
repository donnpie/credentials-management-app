# Context
The purpose of this app is to build a credential management system for a hyptothetical company with which they can manage their user credentials.

This task is the final task for the HyperionDev Full Stack Web Development bootcamp (Level 3 Task 35).

# Task background
Build an internal web app for credential management. Credentials are login details (username & password) and can be for a variety of places — WP sites, servers, financial accounts, etc. Because of the value of the credentials to be stored in the app, it is of utmost importance that the app is authenticated airtight.

Your web app should have user login and registration, different user roles, and different resource access for each user. Cool Tech has the following four organisational units (OU):
- News management
- Software reviews
- Hardware reviews
- Opinion publishing

Each of these OUs has over 10 different divisions within them. Divisions take care of subtasks like finances, IT, writing, development, and so on. Each division has its own credential repository which contains a list of login details for various places. All employees of the division should have access to it.

Most employees are only part of one OU and one division with it, but there are some that are part of more than one OU and division. Furthermore, there should be different user roles for the employees.
- **Normal** users can read the credential repository, and add new credentials in.
- **Management** users can do the above plus update credentials.
- **Admin** users can do the above plus they can assign and unassign users from divisions and OUs. They can also change the user role of any user.

# Software design
## General
This app is built using the MERN stack. There is a single Mongo database that stores credentials for all users, however, credentials for a given division are only accessible for users registered to that division.

## Creating new users
When creating a new user, the role is automatically set to *Normal*. If a different role is required, then it must be updated by a user with sufficient permissions after it is first created.