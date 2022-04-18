// Flower prefab
class Flower extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);       // add to existing, displayList, updateList
        this.isFiring = false;          // track flower's firing status
        this.moveSpeed = 2;             // pixels per frame
        this.sfxFlower = scene.sound.add('sfx_flower_shoot'); // add flower sfx
        this.anims.play('flowery');
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxFlower.play();  // play sfx
        }
        // if fired, move up and let player move left and right
        if(this.isFiring && this.y >= borderUISize + borderPadding) {
            this.y -= this.moveSpeed;
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }

        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }    
    }

    // reset flower to the "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - 2.5*borderUISize + borderPadding;
    }
}