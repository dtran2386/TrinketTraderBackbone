var bank = require('./models/bank');
var Wallet = require('./models/wallet');
var Materials = require('./views/materials');
var Buysell = require('./views/buysell');

window.addEventListener('load', function () {
    
    function periodic() {
        bank(store);
    }
    
    function store(price) {
        wallet.setPrice(price);
    }
    
    setInterval(periodic, 3000);
    
    var wallet = new Wallet();
    wallet.set('coins', 400);
    
    var materials = new Materials({
        el: document.getElementById('resources'),
        model: wallet
    });
    
    var buysell = new Buysell({
        el: document.getElementById('controls'),
        model: wallet
    });
    
// auto-trade feature start.
    function autoBuySell(price) {
        if (price <= 44.6) {
            wallet.buy();
        } else if ( price >= 61.5) {
            wallet.sell();
        }
    };

    function autoTrading() {
        bank(autoBuySell);
    };
    
    var autoOn = window.setInterval(autoTrading, 1000);

    var start = document.getElementById('start');
    start.addEventListener('click', function () {
        autoOn = window.setInterval(autoTrading, 1000);
        console.log('auto-trade ON');
        stop.classList.remove('off');
        start.classList.add('on');
    });
    var stop = document.getElementById('stop');
    stop.addEventListener('click', function () {
        console.log('auto-trade OFF');
        window.clearInterval(autoOn);
        start.classList.remove('on');
        stop.classList.add('off');
    });
// auto-trade feature end.  

});