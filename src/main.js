
// TITLE: Bubble Patrol
// NAME: Lyza Stevens
// DATE: 4.18.2022
// TIME TO COMPLETE: 20 hours

// ------- POINT BREAKDOWN -------
// ****might include some double dippage, so I went over 100 total points just in case****

// (60) Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi)
// (20) Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
// (10) Implement parallax scrolling 
// (10) Create a new animated sprite for the Spaceship enemies 
// (10) Display the time remaining (in seconds) on the screen 
// (10) Create a new title screen (e.g., new artwork, typography, layout)
// (5)  Allow the player to control the Rocket after it's fired
// (5)  Add your own (copyright-free) background music to the Play scene

// (5) Implement the speed increase that happens after 30 seconds in the original game

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

