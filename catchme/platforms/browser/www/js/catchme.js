var app = {
    inicio: function () {
        DIAMETRO_BOLA = 50;
        velocidadX = 0;
        velocidadY = 0;
        puntuacion = 0;
        alto = document.documentElement.clientHeight;
        ancho = document.documentElement.clientWidth;
        //screen.lockOrientation('portrait');
        app.iniciaJuego();
        app.vigilaSensores();
    },

    iniciaJuego: function () {
        function preload() {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.stage.backgroundColor = "#5882FA";
            game.load.image("bola", "img/bola.png");
            game.load.image("objetivo", "img/objetivo.png");
        }

        function create() {
            scoreText = game.add.text(16, 16, puntuacion, {fontSize: '100px', fill: '#757676'});
            bola = game.add.sprite(app.inicioX(), app.inicioY(), 'bola');
            game.physics.arcade.enable(bola);
            bola.body.collideWorldBounds = true;
            bola.body.onWorldBounds = new Phaser.Signal();

            objetivo = game.add.sprite(0, 0, 'objetivo');
            game.physics.arcade.enable(objetivo);
            objetivo.animations.add('flash', [0, 1, 2, 3, 2, 1, 0], 24, false);
            objetivo.body.velocity.setTo(200, 200);
            objetivo.body.bounce.set(1);
            objetivo.body.collideWorldBounds = true;
            objetivo.body.onWorldBounds = new Phaser.Signal();

        }

        function update() {
            bola.body.velocity.y = (velocidadY * 300);
            bola.body.velocity.x = (velocidadX * (-1 * 300));

            game.physics.arcade.overlap(bola, objetivo, app.incrementaPutuacion, null, this);
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

    vigilaSensores: function () {
        function onError() {
            console.log('onError!');
        }

        function onSuccess(datosAceleracion) {
            app.registraDireccion(datosAceleracion);
        }

        navigator.accelerometer.watchAcceleration(onSuccess, onError, {frequency: 10});
    },

    incrementaPutuacion: function () {
        puntuacion = puntuacion + 1;
        scoreText.text = puntuacion;
    },

    registraDireccion: function (datosAceleracion) {
        velocidadX = datosAceleracion.x;
        velocidadY = datosAceleracion.y;
    }
}

if ('addEventListener' in document) {
    document.addEventListener('deviceready', function () {
        app.inicio();
    }, false);
}
