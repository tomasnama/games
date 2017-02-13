var app = {
    inicio: function() {
        DIAMETRO_BOLA = 50;
        alto = document.documentElement.clientHeight;
        ancho = document.documentElement.clientWidth;
        app.iniciaJuego();
    },
    
    iniciaJuego: function() {
        function preload() {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.stage.backgroundColor = "#5882FA";
            game.load.image("bola", "img/bola.png");
            game.load.image("objetivo", "img/objetivo.png");
        }

        function create() {
            var bola = game.add.sprite(app.inicioX(), app.inicioY(), 'bola');
            game.physics.arcade.enable(bola);
            bola.body.collideWorldBounds = true;
            bola.body.onWorldBounds = new Phaser.Signal();
            //bola.body.onWorldBounds.add(app.decrementaPuntuacion, this);
            
            var objetivo = game.add.sprite(0, 0, 'objetivo');
            game.physics.arcade.enable(objetivo);
            objetivo.animations.add('flash', [0,1,2,3,2,1,0], 24, false);
            objetivo.body.velocity.setTo(200, 200);
            objetivo.body.bounce.set(1);
            objetivo.body.collideWorldBounds = true;
            objetivo.body.onWorldBounds = new Phaser.Signal();
            //objetivo.body.onWorldBounds.add(hitWorldBounds, this);

        }

        function update() {
            //var factorDificultad = (300 + (dificultad * 100));
            //bola.body.velocity.x = (velocidadY * factorDificultad);
            //bola.body.velocity.y = (velocidadX * (-1 * factorDificultad));

            //game.physics.arcade.overlap(bola, objetivo, app.incrementaPutuacion, null, this);
        }

        var estados = {preload: preload, create: create, update: update};
        var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser', estados);
    },
    
    inicioX: function () {
        return app.numeroAleatorioHasta(ancho - DIAMETRO_BOLA);
    },

    inicioY: function () {
        return app.numeroAleatorioHasta(alto - DIAMETRO_BOLA);
    },
    
    numeroAleatorioHasta: function (limite) {
        return Math.floor(Math.random() * limite);
    },
}






if ('addEventListener' in document) {
    document.addEventListener('deviceready', function () {
        app.inicio();
    }, false);
}
