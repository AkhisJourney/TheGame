    //var litevers=false;

    var iphone = false;
    var mobilebrouser = false; 
    var android = false;
    var operamobile = false;
    var android3 = false;
    var apple = false;
    var ie = false;
    //var mobilebrouser = ;
    var us_agent_str = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36';
    var anFPS=android3?12:24;
    var scr_width;
    var scr_height;
        
    var fade;
    var fadeto;
    var currentfader;
    var fps=1000/24;

    var c;
    var timer;


    var topoffset=0; // For mobile browsers height of the adress line (to hide); 60 for iphone/ipad + operaMobile

    //alert ('detected res: '+screen.width+'X'+screen.height+' X('+screen.availHeight+')');

    var ctx;
    var stream1;
    var stream2;

    var message;


    var varwindow;


    var rnd=new Array();

    var rndpos=0;
    var rndcont=100001;

    var camera_z=0;
    var camera_z_to=0;
    var offset_z=200;
    var z;
    var z_to;
    var perspective=100;

    //function initRand() {
        for (var i=0; i<rndcont;i++) rnd.push(Math.random());
    //    }



     function shiftRand() {
            var res= rnd[rndpos];
                rndpos++; 
                    if (rndpos==rndcont) rndpos=0;
                return res;
        }