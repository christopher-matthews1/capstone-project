## Thank you for checking out my application!

# Section 1: About the Application

Here is a short description of my application and the technologies I used to create it.

## Description

My application is for registering and keeping track of a Kickball League. Users should be able to learn all they need about the league by browsing the page and if they decide to take part in the league the user has the options of joining a team in one of the leagues or creating there own.

## Technologies Used

This project uses Angular for the application and Node.js for the server.

# Section 2: Install and Run the App

Below is a list of steps to get my application running in your browser for you to test and play around with.

## Step 1: Prerequisites

Before we start you will need to download Git to clone the repository and Node.js to run the server. Here are the links:<br><br>
Git: https://git-scm.com/downloads<br>
Node.js: https://nodejs.org/en/download/

## Step 2: Cloning the Repository

Go to https://github.com/christopher-matthews1/capstone-project/ and click on the green "Code" button. This is where you will need to clone the repo. If you have cloned a repo before you may use the method of your choice. As for me, I click on the clipboard icon which will save the link and then I open a Git terminal window and after choosing the location I want the repo saved I enter the command 'git clone' and then paste the link.

## Step 3: Opening the Project

After the cloning is complete, you will need to open the code in the editor of your choice. I use VS Code and suggest you the same if you are new. To open the repo first you need to open VS Code. After that, click on "File", then "Open Folder" and navigate to the capstone-project folder you just cloned and open it.

## Step 4: Running the Project

Once it is open you should see 4 folders: .vscode, client, docs, server, and this README.md file. If you do, right click on the client folder and select "Open in Integrated Terminal." Once there, run the command "npm install -g @angular/cli". This will install all the files you need to run the project. After that is finish you can run the command "ng serve" and if all goes well you should get a "Complied successfully" message. The app is running on localhost:4200! But....you still need to run the server to be able to use the site to it's fullest potential.

## Step 5: Running the Server

The last thing you need to do is run the server. To do this, right click on the server folder in VS Code and select "Open in Integrated Terminal." Once there, enter the command "node server.js" and you should get a message that says "App listening at port 8082." If so, you are finish!

## Step 6: Open the App in the Browser

From there just navigate to localhost:4200 in your web browser and you should see the application up and running.

# Section 3: API Endpoints

Here is a list of the endpoints I used in my application and what they did.

## Get

Get all the leagues: /api/leagues <br>
Get all the teams: /api/teams <br>
Get a team by ID: /api/teams/:id <br>
Get all teams in a league by ID: /api/teams/byleague/:id <br>

## Post

Add a team to a league: /api/teams <br>
Add a player to a team: /api/teams/:id/players <br>

## Put

Edit a team: /api/teams <br>
Edit a player: /api/teams/:id/players <br>

## Delete

Delete a team: /api/teams/:id <br>
Delete a player: /api/teams/:id/players/:id <br>

# Section 4: Feature Highlight

The feature I would like to highlight in this application is its mobile friendliness. Regardless of what device you are using you will have no trouble accessing the content in a visually pleasing manor. Here are a few examples.

## iPhone 5 <br><br>
![Alt text](client/src/assets/images/readme-photos/iphone5.PNG?raw=true "Optional Title") <br>
## iPhone 6 Plus <br><br>
![Alt text](client/src/assets/images/readme-photos/iphone6.PNG?raw=true "Optional Title") <br>
## iPad <br><br>
![Alt text](client/src/assets/images/readme-photos/ipad.PNG?raw=true "Optional Title") <br>
