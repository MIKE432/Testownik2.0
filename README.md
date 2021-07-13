# Testownik 2.0
## About
This is small aplication which purpose is to help students to pass their 
exams by repeating questions that were on exams in previous years
## Installation
* Download repository
* Go to frontend-react folder and type **npm install**
* Do the same for every microservice that is in backend folder e.g **cd backend/main-service** and then type **npm install**

## Structure
Structure in the project
### Frontend
* ...
### Backend
* Every folder in backend is independent microservice
* In every backend/* folders (microservice's folder) there are always two folders (src and test)
* In **src** folder there are always three folders, and some configuration files.
    * **src/controllers** stores all controllers files for the microservice
    * **src/services** stores all services files (services has business logic)
    * **src/facades** stores all facades files (facades are responsible for connecting with other microservices)
