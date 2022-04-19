class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('pond_4', './assets/pond_bot.png');
        this.load.image('pond_3', './assets/pond_mid_low.png');
        this.load.image('pond_2', './assets/pond_mid_high.png');
        this.load.image('pond_1', './assets/pond_top.png');
        this.load.image('pond_5', './assets/pond_foilage.png');
        
        // load spritesheets
        this.load.spritesheet('flower', './assets/flower_spritesheet.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame:9});
        this.load.spritesheet('bubble','./assets/fish_sprite_sheet.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame:17});
        this.load.spritesheet('pop', './assets/pop_spritesheet.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 19});
    }

    create() {
        // loop background audio
        this.music = this.sound.add('background_music', {volume: 0.1});
        this.music.play();
        this.music.loop = true;
        
        // place tile sprites
        this.pond_4 = this.add.tileSprite(0, 0, 640, 480, 'pond_4').setOrigin(0, 0);
        this.pond_3 = this.add.tileSprite(0, 0, 640, 480, 'pond_3').setOrigin(0, 0);
        this.pond_2 = this.add.tileSprite(0, 0, 640, 480, 'pond_2').setOrigin(0, 0);
        this.pond_1 = this.add.tileSprite(0, 0, 640, 480, 'pond_1').setOrigin(0, 0);
        this.pond_5 = this.add.tileSprite(0, 0, 640, 480, 'pond_5').setOrigin(0, 0);
        
        // orange UI background
        this.add.rectangle(0, borderUISize, game.config.width, borderUISize * 2, 0xF3B141, 0.6).setOrigin(0, 0);
        
        // flower animation config 
        this.anims.create({
            key: 'flowery',
            frames: this.anims.generateFrameNumbers('flower', {start:0, end: 9, first: 0}),
            frameRate: 9,
            repeat: -1
        })
        //add flower (p1)
        this.p1Flower = new Flower(this, game.config.width/2, game.config.height - 2.5*borderUISize + borderPadding, 'flower').setOrigin(0,0);
        
        // bubble animation config
        this.anims.create({
            key: 'bubbling',
            frames: this.anims.generateFrameNumbers('bubble', {start:0, end: 17, first: 0}),
            frameRate: 9,
            repeat: -1
        })
        // add bubbles (x3)
        this.bubble01 = new Bubble(this, game.config.width + borderUISize, borderUISize*3, 'bubble', 0, 30).setOrigin(0, 0);
        this.bubble02 = new Bubble(this, game.config.width + borderUISize*6, borderUISize*4 + borderPadding*6, 'bubble', 0, 20).setOrigin(0,0);
        this.bubble03 = new Bubble(this, game.config.width, borderUISize*6 + borderPadding*6, 'bubble', 0, 10).setOrigin(0,0);
        
        // add faster/smaller bubble
        this.bubble04 = new Bubble(this, game.config.width +borderUISize*12, borderUISize*4 + borderPadding*2, 'bubble', 0, 50).setOrigin(0,0);
        this.bubble04.setScale(0.6);
        this.bubble04.moveSpeed *= 1.5;

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // popping animation config
        this.anims.create({
            key: 'popping',
            frames: this.anims.generateFrameNumbers('pop', { start: 0, end: 19, first: 0}),
            frameRate: 10,
        });
        
        // initialize score
        this.p1Score = 0;
        
        // display score
        this.scoreConfig = {
            fontFamily: 'custom',
            fontSize: '28px',
            stroke: '#ffffff',
            strokeThickness: 2,
            color: '#990b4870',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
        }
        this.scoreConfig.backgroundColor = '#FFFFFF95', 
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding, 'Score: 0', this.scoreConfig);
        
        // GAME OVER flag
        this.gameOver = false;
        
        // 60-second play clock
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.scoreConfig.color = '#990b4890',
            this.scoreConfig.fontSize = '64px';
            this.scoreConfig.backgroundColor = '#FFFFFF00',
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.scoreConfig.color = '#990b4880'
            this.scoreConfig.fontSize = '28px';
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        this.scoreConfig.backgroundColor = '#FFFFFF95', 
        this.timer = this.add.text(game.config.width - borderPadding - 3*borderUISize, borderUISize + borderPadding, `${this.clock.delay}`, this.scoreConfig).setOrigin(0.5,0);
        
        // blue borders
        this.add.rectangle(0, 0, game.config.width, borderUISize/5, 0xb1d1d1).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize/5, game.config.width, borderUISize, 0xb1d1d1).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize/5, game.config.height, 0xb1d1d1).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize/5, 0, borderUISize, game.config.height, 0xb1d1d1).setOrigin(0, 0);
         
    }

    update() {
        // clock repaint per second
        this.timeLeft = Math.round((this.clock.delay - this.clock.elapsed)/1000);
        this.timer.text = `Time: ${this.timeLeft}`;

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.music.pause();
            this.scene.restart();
            this.sound.play('sfx_select', {volume: 0.5});
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.music.pause();
            this.scene.start("menuScene");
            this.sound.play('sfx_select', {volume: 0.5});
        }
        //parallax tile speeds
        this.pond_5.tilePositionX -= 2.5;
        this.pond_4.tilePositionX -= 1;
        this.pond_3.tilePositionX -= 1.5;
        this.pond_2.tilePositionX -= 2;
        this.pond_1.tilePositionX -= 2.5;
        
        if (!this.gameOver) {
            this.p1Flower.update();    // update the flower sprite
            this.bubble01.update();      // update bubbless (x3)
            this.bubble02.update();
            this.bubble03.update();
            this.bubble04.update();
        }
        // check collisions
        if(this.checkCollision(this.p1Flower, this.bubble03)) {
            // add time for bubble pop
            this.p1Flower.reset();
            this.bubblePop(this.bubble03);   
        }
        if (this.checkCollision(this.p1Flower, this.bubble02)) {
            // add time for bubble pop
            this.p1Flower.reset();
            this.bubblePop(this.bubble02);
        }
        if (this.checkCollision(this.p1Flower, this.bubble01)) {
            // add time for bubble pop
            this.p1Flower.reset();
            this.bubblePop(this.bubble01);
        }
        if(this.checkCollision(this.p1Flower, this.bubble04)) {
            // add time for bubble pop
            this.p1Flower.reset();
            this.bubblePop(this.bubble04);   
        }
    }

    checkCollision(flower, bubble) {
        // simple AABB checking
        if (flower.x < bubble.x + bubble.width &&
            flower.x + flower.width > bubble.x &&
            flower.y < bubble.y + bubble.height &&
            flower.height + flower.y > bubble.y) {
                return true;
            } else {
                return false;
            }
    }

    bubblePop(bubble) {
        // play bubble pop sfx
        this.sound.play('sfx_pop');
        // temporarily hide bubble
        bubble.alpha = 0;
        // create pop sprite at bubble's position
        let boom = this.add.sprite(bubble.x, bubble.y, 'pop').setOrigin(0, 0);
        // resize for small bubble
        if (bubble.scaleX == 0.6) {
            boom.scaleX = 0.6;
            boom.scaleY = 0.6;
        }
        boom.anims.play('popping');             // play popping animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          bubble.reset();                         // reset bubble position
          bubble.alpha = 1;                       // make bubble visible again
          boom.destroy();                       // remove pop sprite
        });
        // score add and repaint
        this.p1Score += bubble.points;
        
        // add 1 second to timer
        this.clock.delay += 1000;

        this.scoreLeft.text = `Score: ${this.p1Score}`;
      }
}