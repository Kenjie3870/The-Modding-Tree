let modInfo = {
	name: "small layers tree",
	id: "Very Small Tree",
	author: "not pog",
	pointsName: "planck lengths",
	discordName: "this doesn't exist",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 8,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1c",
	name: "the hrm",
}

let changelog = `<h1>changelog</h1><br>
	<h2>v0.0</h2><br>
		made this mod <br>
	<h3>v0.1a</h3><br>
		content was added to the m layer.<br>
		subtabs were made to organize stuff<br>
		<b>=== known insects ===</b><br>
		automation doesn't work<br>
		Buyable m21's second effect doesn't work<br>
	<h3>v0.1b</h3><br>
		organized it into microtabs and made a new subtab<br>
		changed the changelog and the version appropiately<br>
		<b>=== known insects ===</b><br>
		automation still doesn't work<br>
		Buyable m21's second effect still doesn't work either<br>
		infoboxes don't show up in effects subtab, just the other text and buttons<br>
	<h3>v0.1c</h3><br>
		redid the changelog again<br>
		a bit of content<br>
		changed some display and fixed all known bugs from before<br>
		new layer when`

let winText = `ez amirite... well good job for completing version ${VERSION.num} of this bad game`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){return true}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(1).mul(buyableEffect('m',11))
	if(hasUpgrade('m',11)) gain = gain.add(upgradeEffect('m',11))
	if(hasUpgrade('m',21)) gain = gain.mul(upgradeEffect('m',21))
	if(inChallenge('m',11)) gain = gain.pow(0.5)
	if(inChallenge('m',22)) gain = gain.pow(0.33)
	if(hasChallenge('m',22)) gain = gain.pow(1.11)
	if(inChallenge('m',31)) gain = gain.pow(0.5).pow(0.5)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {return "Endgame: 15,000,000 Makers"}
]

// Determines when the game "ends"
function isEndgame() {
	return player["m"].points.gte(15e6)
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}