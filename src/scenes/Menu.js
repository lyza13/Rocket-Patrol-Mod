class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/select.m4a');
        this.load.audio('sfx_pop', './assets/pop.m4a');
        this.load.audio('sfx_flower_shoot', './assets/sfx_flower.m4a');
        this.load.audio('background_music','./assets/background_music.m4a');
        // load image
        this.load.image('menu_screen', './assets/menu_screen.png');
    }

    create() {
        // menu text configuration
        let titleConfig = {
          fontFamily: 'custom',
          fontSize: '80px',
          stroke: '#faa2c8',
          strokeThickness: 3,
          color: '#FFFFFF70',
          align: 'center',
          fixedWidth: 0
        }
        let menuConfig = {
            fontFamily: 'custom',
            fontSize: '28px',
            stroke: '#ffffff',
            strokeThickness: 2,
            color: '#990b4880',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
         // place menu screen image
         this.add.image(0,0, 'menu_screen').setOrigin(0);

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'BUBBLE \n PATROL', titleConfig).setOrigin(0.5, 0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to float', menuConfig).setOrigin(0.5,-1.4);
        menuConfig.color = '#ffffff90';
        menuConfig.stroke = '#990b48';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5, -1.5);
        
        

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            bubbleSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select',{volume: 0.5});
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            bubbleSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select', {volume: 0.5});
          this.scene.start('playScene');    
        }
      }
}