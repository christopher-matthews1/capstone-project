"use strict";

let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");

let app = express();
app.use(bodyParser.json());

// Create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

// enable CORS
// Since we're not serving pages from Node, you'll get the following error if CORS isn't "enabled"
// Error:  Failed to load http://localhost:3000/login/:
// No 'Access-Control-Allow-Origin' header is present on the requested resource. 
// Origin 'null' is therefore not allowed access.
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

// ------ Debugging support ------------------

function logArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}


// ------ Get next ID helper ------------------

function getNextId(counterType)  // use 'team' or 'player' or 'user' as counterType
{
    // read the counter file
    let data = fs.readFileSync( __dirname + "/data/counters.json", "utf8");
    data = JSON.parse(data);

    // find the next id from the counters file and then increment the
    // counter in the file to indicate that id was used
    let id = -1;
    switch(counterType.toLowerCase())
    {
        case "team":
            id = data.nextTeam;
            data.nextTeam++;
            break;
        case "player":
            id = data.nextPlayer;
            data.nextPlayer++;
            break;
        case "user":
            id = data.nextUser;
            data.nextUser++;
            break;
    }

    // save the updated counter
    fs.writeFileSync(__dirname + "/data/counters.json", JSON.stringify(data));
 
    return id;
}

// ------ Validation helpers ------------------

function isValidteam(team)
{
    if (team.TeamName == undefined || team.TeamName.trim() == "")
       return 1;
    if (team.LeagueName == undefined || team.LeagueName.trim() == "")
       return 2;   
    if (team.CaptainName == undefined || team.CaptainName.trim() == "")
       return 3;  
    if (team.CaptainPhone == undefined || team.CaptainPhone.trim() == "")
       return 4; 
    if (team.CaptainEmail == undefined || team.CaptainEmail.trim() == "")
       return 5;        
    if (team.MaxTeamSize == undefined || isNaN(team.MaxTeamSize))
       return 6; 

    return -1;
}

function isValidplayer(player)
{
    if (player.PlayerEmail == undefined || player.PlayerEmail.trim() == "")
       return 1;
    if (player.PlayerName == undefined || player.PlayerName.trim() == "")
       return 2;     
    if (player.PlayerPhone == undefined || player.PlayerPhone.trim() == "")
       return 3; 

    return -1;
}

// ------------------------------------------------------------------------------

app.get("/", function (req, res) {
   res.sendFile( __dirname + "/public/" + "index.html" );
});

app.get("/index.html", function (req, res) {
    res.sendFile( __dirname + "/public/" + "index.html" );
 });


// ------------------------------------------------------------------------------
// THIS CODE ALLOWS REQUESTS FOR THE API THROUGH 

/* ************************************************************************* */
// NOTE:  To make debugging easy, these methods echo their processing through
//        to the terminal window.  This means there may be some unnecessary
//        parsing and stringifying.  But it is worth it as you debug your code.
/* ************************************************************************* */

// GET league
app.get("/api/leagues", function (req, res) {
    console.log("Received a GET request for all leagues");
	
    let data = fs.readFileSync( __dirname + "/data/leagues.json", "utf8");
    data = JSON.parse(data);
    
    console.log("Returned data is: ");
    console.log(data);
    res.contentType('application/json').end( JSON.stringify(data) );
});

// GET ALL teamS
app.get("/api/teams", function (req, res) {
    console.log("Received a GET request for all teams");
	
    let data = fs.readFileSync( __dirname + "/data/teams.json", "utf8");
    data = JSON.parse(data);
	
    console.log("Returned data is: ");
    console.log(data);
    res.contentType('application/json').end( JSON.stringify(data) );
});

// GET ONE team BY ID
app.get("/api/teams/:id", function (req, res) {
    let id = req.params.id;
    console.log("Received a GET request for team " + id);

    let data = fs.readFileSync( __dirname + "/data/teams.json", "utf8");
    data = JSON.parse(data);

    let match = data.find(element => element.TeamId == id);
    if (match == null)
	{
		res.status(404).send("Team Not Found");
		return;
	}

    console.log("Returned data is: ");
    console.log(match);
    res.contentType('application/json').end( JSON.stringify(match) );
});

// GET MANY teamS BY league
app.get("/api/teams/byleague/:id", function (req, res) {
    let id = req.params.id;
    console.log("Received a GET request for teams in league " + id);                      

    let orgData = fs.readFileSync( __dirname + "/data/leagues.json", "utf8");
    orgData = JSON.parse(orgData);

    let league = orgData.find(element => element.LeagueId.toLowerCase() == id.toLowerCase());
    if (league == null)
    {
        res.status(404).send("League Not Found");
		return;
    }

    let data = fs.readFileSync( __dirname + "/data/teams.json", "utf8");
    data = JSON.parse(data);

    // find the matching teams for a specific league
    let matches = data.filter(element => element.LeagueName == league.LeagueName);

    console.log("Returned data is: ");
    console.log(matches);
    res.contentType('application/json').end( JSON.stringify(matches) );
});

// GET A SPECIFIC player IN A SPECIFIC team
app.get("/api/teams/:teamId/players/:playerid", function (req, res) {
    let TeamId = req.params.teamId;
    let PlayerId = req.params.playerid;
    console.log("Received a GET request for player " + PlayerId + " in team " + TeamId);                      

    let data = fs.readFileSync( __dirname + "/data/teams.json", "utf8");
    data = JSON.parse(data);

    // find the team
    let matchingteam = data.find(element => element.TeamId == TeamId);
    if (matchingteam == null)
	{
		res.status(404).send("Team Not Found");
		return;
    }

    // find the player 
    let match = matchingteam.Players.find(m => m.PlayerId == PlayerId );
    console.log(match);
    if (match == null)
	{
		res.status(404).send("Player Not Found");
		return;
    }

    console.log("Returned data is: ");
    console.log(match);
    res.contentType('application/json').end( JSON.stringify(match) );
});

// ADD A team
app.post("/api/teams", urlencodedParser, function (req, res) {
    console.log("Received a POST request to add a team");
    console.log("BODY -------->" + JSON.stringify(req.body));

    // assemble team information so we can validate it
    let team = {
        TeamId: getNextId("team"),  // assign id to team
		TeamName: req.body.TeamName,
		LeagueName: req.body.LeagueName,
		CaptainName: req.body.CaptainName,
		CaptainPhone: req.body.CaptainPhone,
		CaptainEmail: req.body.CaptainEmail,
		MaxTeamSize: 10,
        Players : []
    };

    console.log("Performing validation...");
	let errorCode = isValidteam(team);
    if (errorCode != -1)
    {
        console.log("Invalid data found! Reason: " + errorCode);
		res.status(400).send("Bad Request - Incorrect or Missing Data");
		return;      
    }

    let data = fs.readFileSync( __dirname + "/data/teams.json", "utf8");
    data = JSON.parse( data );

    // add the team
    data.push(team);

    fs.writeFileSync(__dirname + "/data/teams.json", JSON.stringify(data));
   
    console.log("team added: ");
    console.log(team);
    
    //res.status(201).send();
    res.contentType('application/json').end( JSON.stringify(team) );  // return the new team w it's TeamId
 });

 // EDIT A team
app.put("/api/teams", urlencodedParser, function (req, res) {
    console.log("Received a PUT request to team a team");
    console.log("BODY -------->" + JSON.stringify(req.body));

    // assemble team information so we can validate it
    let team = {
        TeamId: req.body.TeamId,
		TeamName: req.body.TeamName,
		LeagueName: req.body.LeagueName,
		CaptainName: req.body.CaptainName,
		CaptainPhone: req.body.CaptainPhone,
		CaptainEmail: req.body.CaptainEmail,
        MaxTeamSize: 10
    };

    console.log("Performing validation...");
	let errorCode = isValidteam(team);
    if (errorCode != -1)
    {
        console.log("Invalid data found! Reason: " + errorCode);
		res.status(400).send("Bad Request - Incorrect or Missing Data");
		return;      
    }

    let data = fs.readFileSync( __dirname + "/data/teams.json", "utf8");
    data = JSON.parse( data );

    // find the team
    let match = data.find(element => element.TeamId == req.body.TeamId);
    if (match == null)
	{
		res.status(404).send("Team Not Found");
		return;
    }
    
    // update the team
    match.TeamName = req.body.TeamName;
    match.LeagueName = req.body.LeagueName;
    match.CaptainName = req.body.CaptainName;
    match.CaptainPhone = req.body.CaptainPhone;
    match.CaptainEmail = req.body.CaptainEmail;

    fs.writeFileSync(__dirname + "/data/teams.json", JSON.stringify(data));
   
    console.log("Update successful!  New values: ");
    console.log(match);
    res.status(200).send();
 });

// DELETE A team
 app.delete("/api/teams/:id", function (req, res) {   
    let id = req.params.id;
    console.log("Received a DELETE request for team " + id);

    let data = fs.readFileSync( __dirname + "/data/teams.json", "utf8");
    data = JSON.parse( data );

    // find the index number of the team in the array
    let foundAt = data.findIndex( element => element.TeamId == id );

    // delete the team if found
    if (foundAt != -1)
    {
        data.splice(foundAt, 1);       
    }
 
    fs.writeFileSync(__dirname + "/data/teams.json", JSON.stringify(data));

    console.log("Delete request processed");
    // Note:  even if we didn't find the team, send a 200 because they are gone
    res.status(200).send();
 });

 // ADD A player TO A team
 app.post("/api/teams/:id/players", urlencodedParser, function (req, res) {
    let id = req.params.id;
    console.log("Received a POST request to add a player to team " + id);
    console.log("BODY -------->" + JSON.stringify(req.body));

    // assemble player information so we can validate it
    let player = {
        PlayerId: getNextId("player"),   // assign new id
        PlayerEmail: req.body.PlayerEmail,
		PlayerName: req.body.PlayerName,
        PlayerPhone: req.body.PlayerPhone
    };

    console.log("Performing player validation...");
	let errorCode = isValidplayer(player);
    if (errorCode != -1)
    {
        console.log("Invalid data found! Reason: " + errorCode);
		res.status(400).send("Bad Request - Incorrect or Missing Data");
		return;      
    }

    let data = fs.readFileSync( __dirname + "/data/teams.json", "utf8");
    data = JSON.parse( data );

    // find the team
    let match = data.find(element => element.TeamId == id);
    if (match == null)
	{
		res.status(404).send("team Not Found");
		return;
    }

    // add the player
    if ( Number(match.MaxTeamSize) === match.Players.length )
    {
        res.status(409).send("team is already full. Can not add new players.");
		return;
    }
    match.Players.push(player);

    fs.writeFileSync(__dirname + "/data/teams.json", JSON.stringify(data));
   
    console.log("New player added!");
    res.status(200).send();
 });

 // EDIT A player IN A team
 app.put("/api/teams/:id/players", urlencodedParser, function (req, res) {
    let id = req.params.id;
    console.log("Received a PUT request to edit a player in team " + id);
    console.log("BODY -------->" + JSON.stringify(req.body));

    // assemble player information so we can validate it
    let player = {
        PlayerId: req.body.PlayerId,
        PlayerEmail: req.body.PlayerEmail,
		PlayerName: req.body.PlayerName,
        PlayerPhone: req.body.PlayerPhone
    };

    console.log("Performing player validation...");
	let errorCode = isValidplayer(player);
    if (errorCode != -1)
    {
        console.log("Invalid data found! Reason: " + errorCode);
		res.status(400).send("Bad Request - Incorrect or Missing Data");
		return;      
    }

    // find the team
    let data = fs.readFileSync( __dirname + "/data/teams.json", "utf8");
    data = JSON.parse( data );

    // find the team
    let matchingteam = data.find(element => element.TeamId == id);
    if (matchingteam == null)
	{
		res.status(404).send("team Not Found");
		return;
    }

    // find the player
    let match = matchingteam.Players.find( m => m.PlayerId == req.body.PlayerId );
    if (match == null)
	{
		res.status(404).send("player Not Found");
		return;
    }

    // update the player
    match.PlayerEmail = req.body.PlayerEmail;
    match.PlayerName = req.body.PlayerName;    
    match.PlayerPhone = req.body.PlayerPhone;

    fs.writeFileSync(__dirname + "/data/teams.json", JSON.stringify(data));
   
    console.log("player updated!");
    res.status(200).send();
 });

 // DELETE A player IN A team
 app.delete("/api/teams/:teamId/players/:playerid", urlencodedParser, function (req, res) {
    let TeamId = req.params.teamId;
    let PlayerId = req.params.playerid;
    console.log("Received a DELETE request for player " + PlayerId + " in team " + TeamId);

    // find the team
    let data = fs.readFileSync( __dirname + "/data/teams.json", "utf8");
    data = JSON.parse( data );

    let matchingteam = data.find(element => element.TeamId == TeamId);
    if (matchingteam == null)
	{
		res.status(404).send("team Not Found");
		return;
    }

    // find the player
    let foundAt = matchingteam.Players.findIndex( m => m.PlayerId == PlayerId );

    // delete the player if found
    if (foundAt != -1)   
    {
        matchingteam.Players.splice(foundAt, 1);       
    }

    fs.writeFileSync(__dirname + "/data/teams.json", JSON.stringify(data));

    console.log("Delete request processed");
    // Note:  even if we didn't find them, send a 200 back because they are gone
    res.status(200).send();
 });

// ----------------------------------------------------------------------------
// USER MANAGEMENT

// GET request to check if user name is available
app.get("/api/username_available/:username", function (req, res) {
    let username = req.params.username;
    console.log("Checking to see if this username " + username + " is available");
	
    let data = fs.readFileSync( __dirname + "/data/users.json", 'utf8');
    data = JSON.parse(data);

    let matchingUser = data.find(user => user.username.toLowerCase() == username.toLowerCase());

    let message;
    if (matchingUser == null)
    {
        message = "YES";
    } 
    else
    {
        message = "NO";
    }
	
    console.log( "Is user name available? " + message);
    res.end( message );
});

// POST request to add a user
app.post("/api/users", urlencodedParser, function (req, res) {
    console.log("Got a POST request to add a user");
    console.log("BODY -------->" + JSON.stringify(req.body));

    let data = fs.readFileSync( __dirname + "/data/users.json", 'utf8');
    data = JSON.parse( data );

    // check for duplicate username
    let matchingUser = data.find(user => user.username.toLowerCase() == req.body.username.toLowerCase());
    if (matchingUser != null)
    {
        // username already exists
        console.log("ERROR: username already exists!");
        res.status(403).send();   // forbidden
        return;        
    }

    let user = {
        id: getNextId("user"),   // assign new id      
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    };

    data.push(user);

    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(data));
   
    console.log("New user added!");
    console.log(user);
    res.status(200).send();
 });

 // POST request to login -- sent username and password in request body 
 app.post("/api/login", urlencodedParser, function (req, res) {
    console.log("Got a POST request for a user to login");
    console.log("BODY -------->" + JSON.stringify(req.body));

    let data = fs.readFileSync( __dirname + "/data/users.json", 'utf8');
    data = JSON.parse( data );

    // check to see if credentials match a user
    let match = data.find(user => user.username.toLowerCase() == req.body.username.toLowerCase() &&
                                  user.password == req.body.password);

    if (match == null)
    {
        // credentials don't match any user
        console.log("Error:  credentials don't match known user");
        res.status(403).send();   // forbidden
        return;        
    }

    let user = {
        id: match.id,      
        name: match.name,
        username: match.username
    };

    // login successful - return user w/o password
    console.log("Login successful for: ");
    console.log(user);
    res.contentType('application/json').end( JSON.stringify(user) );
 });

// ------------------------------------------------------------------------------
// SITE SET-UP

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

let server = app.listen(8082, function () {
   let port = server.address().port;
   
   console.log("App listening at port %s", port);
});
