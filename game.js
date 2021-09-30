/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	localPlayer,	// Local player
	remotePlayers,	// Remote players
	socket;			// Socket connection

var isSecond,initiator;
initiator = 0;

/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	
	// Initialise socket connection
	socket = io.connect("http://localhost/", {port: 8000, transports: ["websocket"]});

	// Start listening for events
	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {	

	// Socket connection successful
	socket.on("connect", onSocketConnected);

	// Socket disconnection
	socket.on("disconnect", onSocketDisconnect);

	// Selected Box Received
	socket.on("box", onBoxSelected);	
	
	//socket.on("winner",onPlayerWinning);
	
	//socket.on("turn",onTurnChanged);
	
};

function onBoxSelected(data)
{	
	$('p').html(data.selectedBox);
}

// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");
};

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};
init();