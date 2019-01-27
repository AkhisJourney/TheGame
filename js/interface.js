
var scr,drm;
var canvasData;

var blurbuffer;
var blur_ctx;


var blur_canv;
var blur_canv_ctx;

var bg;
var bg_ctx;


var brickquality =1;

var global_scale,sqrt_global_scale,sqrt_sqrt_global_scale,s_x,s_y,w,h;

var spot_x=0; 
var spot_y=0; 
var target_spot_x=0; 
var target_spot_y=0;



var  bulletMult;

//var pi=Math.PI;

//fps
var lastTime = (new Date()).getTime();
var now = lastTime;
var FPS;

var ray_imgs=new Array();



var longFPS=0;
var ss_factor = 1;

var blurOn=false;



var vind= {x:1, y:1};
var bg_fade=.1;

// var logo_img = new Image();	

var soundBgm = new Audio('mp3/bgm.mp3');
soundBgm.loop = true;
var soundBorn = new Audio('mp3/expention.mp3');
var soundOnclick = soundBgm;
var clicked = false;

   // Mouse controllers
function set_events(){

//	document.addEventListener('mozfullscreenchange', on_fullscreen_change);   //fulscreen events
//		document.addEventListener('webkitfullscreenchange', on_fullscreen_change); 

window.addEventListener("orientationchange", function()   //  Orientation changed
{
  // Android brouser Bug Fix.
  if (android) 	{
	  var backup=topoffset;
	  topoffset=0;
	  resize();
//	  alert ('androresize: '+scr_width);
	  topoffset=backup;
//	 alert(window.orientation);
  				}
}, false);





    mouse_events();    // Mouse events
}










function init()
{ 
  //  blurbuffer = document.createElement('canvas'); //prepare for blur
 //   blur_ctx = blurbuffer.getContext('2d');
 
	soundOnclick.play();
	
    bg = document.createElement('canvas');  //prepare for animate_bg
	bg.width=256;
	bg.height=256;	 
    bg_ctx = bg.getContext('2d');
	bg_data = bg_ctx.getImageData(0, 0, 256, 256);
	
	 start();
	//for (var j=0; j<7; j++) 
 
	
	
// logo_img.src = 'img/logo.gif';
 	
// prevent drag n droop
Array.prototype.forEach.call(document.getElementsByTagName('body'), function(el) {
    el.setAttribute("onDragStart","return false");
});
				// set up elements.





c = document.getElementById('canvas');
	ctx = c.getContext('2d');

	
	
	bg_canv = document.getElementById('bg_canvas');
		

	   bg_canv_ctx = bg_canv.getContext('2d');
	   
	
					  
    resize();




fadeto=0.5;
	currentfade=1;
		fps=1000/48;



 init_bullets();

	

			


		 	ctx.fillStyle = bulletcolor;

            //ctx.closePath();

    disableSelection(c);



for (var R=0; R<256/colorIncrement; R ++ )
	for (var G=0; G<256/colorIncrement; G++ )
		for (var B=0; B<256/colorIncrement; B++  )
  			drawSprites(R,G,B);

	set_events();




// --------------------------------------



	//update();
	
		ctx.strokeStyle = bulletstroke;

	setTimeout(function() {
    	timer = setInterval(update, fps);          //Start resident
	}, 500);

}






// NEW FADER;
function fadernew(alfa) {
	
	 ctx.putImageData(c_data, 0, 0);
}



// animate background

function setBox (x,y,r,g,b,a) {
 	var index = (x<<3) + (y<<11);
	
	
if (70+r>255) r=0;
if (60+g>255) g=0;
if (120+b>255) b=0;
    bg_data.data[index] = 70+r;
    bg_data.data[index + 1] = 60+g;
    bg_data.data[index + 2] = 150+b;
    bg_data.data[index + 3] = 255;
	
}


function getBox(x,y)
{
	var res;
if 	((x>=0)&&(x<256)&&(y>=0)&&(y<255)){
var index = (x<<3) + (y<<11);
	res= {r:bg_data.data[index]-70, g:bg_data.data[index+1]-90, b:bg_data.data[index+2]-150}
} else res= {r:0, g:0, b:0}
return res;
	   
}


function interactive ()
{	setBox ( (mousePos.x>>4)+1,  mousePos.y>>4, shiftRand()*200,53+shiftRand()*70,75+shiftRand()*30,255); 
				
		setBox ( (mousePos.x>>4)+2,  mousePos.y>>4,0,53+shiftRand()*50,75+shiftRand()*30,255); 
		setBox ( (mousePos.x>>4),  mousePos.y>>4, 0,53+shiftRand()*60,75+shiftRand()*30,255); 
		
		setBox ( (mousePos.x>>4)+3,  mousePos.y>>4,0,53+shiftRand()*50,75+shiftRand()*30,255); 
		setBox ( (mousePos.x>>4)-1,  mousePos.y>>4, shiftRand()*20,53+shiftRand()*50,75+shiftRand()*30,255); 


		setBox ( (mousePos.x>>4)+1,  (mousePos.y>>4)+1, 0,53+shiftRand()*50,75+shiftRand()*30,255); 
		setBox ( (mousePos.x>>4)+1,  (mousePos.y>>4)-1,0,53+shiftRand()*50,75+shiftRand()*30,255); 
		
}

function drawbubles () {
	
	
	
	
	
		
        //mousePos = getMousePos(c);
		
		//interactive


	 // random wind
	
for (var i=1; i<scr_width>>3; i++)	setBox (shiftRand()*(scr_width>>4), shiftRand()*(scr_height>>4), 10,20,90+shiftRand()*10,255);
for (var i=1; i<scr_width>>4; i++)	setBox (shiftRand()*(scr_width>>4), shiftRand()*(scr_height>>4), 0,0,0,255);
	
	
var part1,part2,part3,part4,r,g,b;
	// bg_ctx.fillStyle = "#8ED6FF";
	
	// part1=getBox[realround(i+wind.x),realround(j+wind.y)];
//	var j=5; 
for (var i=0; i<scr_width >> 4; i++) 
for (var j=0; j<scr_height >> 4; j++) 
{
vind.y=realround(shiftRand());
	
//	alert(getBox   (i, j).r);
	
	part1=getBox(i,j+vind.y);
	//echo (part1);
	part2=getBox(i+vind.x,j+vind.y);	
	
	//alert (part1);
	part3=getBox(i+vind.x,j);		
	part4=getBox(i,j);			
	
	r=(part1.r+part2.r+part3.r+part4.r)*.3;
	g=(part1.g+part2.g+part3.g+part4.g)*.3;;	
	b=(part1.b+part2.b+part3.b+part4.b)*.95;		
	
	
	setBox   (i, j, r,g,b,255);
	
//	ctx.drawImage(brick, 0,0, 16, 16, i<<4, j<<4, 16, 16); 
//	 bg_ctx.beginPath();	
//      bg_ctx.arc(i << 3, j << 3, 3, 0, 2 * pi, false);
//    bg_ctx.fill();
    
//        bg_ctx.lineWidth = 0;
//        bg_ctx.strokeStyle = "white";
//        bg_ctx.stroke();
	
}
//bg_canv_ctx.clearRect(0, 0, scr_width>>3, scr_height>>3);
 bg_ctx.putImageData(bg_data, 0, 0);

	for (var i=0; i<brickquality; i++) {
		bg_canv_ctx.drawImage(bg, 0, 0, scr_width>>3, scr_height>>3, 0, 0, scr_width>>3, scr_height>>3); //bullets
	}	

	//ctx.drawImage(background, 50, 20, 120, 80, 0, 0, scr_width, scr_height);
	//bufferData = buffer.getImageData(0, 0, scr_width, scr_height); 
	
//	for (var i=0; i< scr_width*scr_height << 2; i++) canvasData.data[i] = (bufferData[i]+bufferData[i+4]+bufferData[i+scr_width]+bufferData[i+scr_width+4])>>2; 
	

}







function blur () {
	
		
		
	blurbuffer.width=blurbuffer.width;
//	blur_ctx.clearRect(0, 0, scr_width>>2, scr_height>>2);


	blur_ctx.drawImage(blur_canv, 0, 0, scr_width>>1, scr_height>>1, 0, 0, scr_width>>2, scr_height>>2);  // step 1

	blur_ctx.fillStyle = "rgba(0, 0, 0,0.1)";

	blur_ctx.fillRect (0, 0,  scr_width>>2, scr_height>>2);
	

//	blur_ctx.drawImage(c, 0, 0, scr_width, scr_height, 0, 0, scr_width>>1, scr_height>>1); 	
	
	blur_canv_ctx.clearRect(0, 0, scr_width>>1, scr_height>>1);		
	
	blur_canv_ctx.drawImage(blurbuffer, 0, 0, scr_width>>2, scr_height>>2, 0, 0, scr_width>>1, scr_height>>1); // NEED OPTIMISATION!!


blurbuffer.width=blurbuffer.width;
//	blur_ctx.clearRect(0, 0, scr_width>>1, scr_height>>1);


	blur_ctx.drawImage(c, 0, 0, scr_width, scr_height, 0, 0, scr_width>>1, scr_height>>1);  // step 2

//	blur_ctx.drawImage(c, 0, 0, scr_width, scr_height, 0, 0, scr_width>>1, scr_height>>1); 	
	
	
	blur_canv_ctx.drawImage(blurbuffer, 0, 0, scr_width>>1, scr_height>>1, 0, 0, scr_width>>1, scr_height>>1); // NEED OPTIMISATION!!
//	blurbuffer.width=scr_width;
//	blurbuffer.height=scr_height;	

	
	
//	ctx.drawImage(blurbuffer, 0, 0, scr_width>>1, scr_height>>1, 0, 0, scr_width, scr_height); // NEED OPTIMISATION!!
	
//	blurbuffer.width=scr_width;
//	blurbuffer.height=scr_height;	

	
/*	ctx.drawImage(blurbuffer, 0, 0, scr_width>>2, scr_height>>2, 0, 0, scr_width>>1, scr_height>>1); //1
		ctx.drawImage(blurbuffer,  scr_width>>2, 0, scr_width>>2, scr_height>>2, scr_width>>1, 0, scr_width>>1, scr_height>>1); //2
		ctx.drawImage(blurbuffer, 0, scr_height>>2, scr_width>>2, scr_height>>2, 0, scr_height>>1, scr_width>>1,  scr_height>>1); //3
  	 				ctx.drawImage(blurbuffer,  scr_width>>2, scr_height>>2, scr_width>>2, scr_height>>2, scr_width>>1, scr_height>>1, scr_width>>1, scr_height>>1); //4*/
	
	//ctx.drawImage(background, 50, 20, 120, 80, 0, 0, scr_width, scr_height);
	//bufferData = buffer.getImageData(0, 0, scr_width, scr_height); 
	
//	for (var i=0; i< scr_width*scr_height << 2; i++) canvasData.data[i] = (bufferData[i]+bufferData[i+4]+bufferData[i+scr_width]+bufferData[i+scr_width+4])>>2; 
	

}



// EOF animate background








function update()   // Main cycle Resident funct
{
	
//fps meter
// adaprive degradation;

now = (new Date()).getTime();
FPS=1000/(now-lastTime);
lastTime=now;


longFPS=realround((longFPS*7+FPS)/8);


//thermostat 



	 
	message=us_agent_str;
	 
	 
	 
	 
	 
	 c.width = c.width;  // Clear canvas;
//echo (longFPS+'|'+message);




showbullets(); //draw bullets
//showWindows(); //windows


     tick++; //timer+
}


function showspot()
{

		
	var cropstart_X=0;
		var cropstart_Y=0;
			var cropend_X=900;
				var cropend_Y=506;
	
	
	
}



function resize() {
	//adjustHeight();
	//c.requestFullScreen();
    var rect = c.getBoundingClientRect();

	
  	  scr_width = rect.width*ss_factor;
	  	  scr_height = rect.height*ss_factor;
		  

		
		
			bg_canv.width=scr_width>>3;
		bg_canv.height=scr_height>>3; 	

		
		
			c.width = scr_width;
		    c.height = scr_height;
			

			
			
			logo.width = scr_width;
		    logo.height = scr_height;
			
			
   aspect=scr_height/scr_width;			
	
	if (scr_height>scr_width*506/900)
	{		
		   w =900*900/506*aspect;
		   h =506;
			 s_x =(900-w)/2;
			 s_y =0;
			  		global_scale=42000/scr_height;

	}
	else
	{		
			w =900;
		    h =506*506/900/aspect;
			  s_y =(506-h)/2;
			  			  s_x = 0;
			  		global_scale=42000/(scr_width*506/900);
		
	}
	
	
//	showspot(x,y,w,h);
	
	
	
	logo_X=scr_width>>1;
		logo_Y=scr_height>>1;;
//			   ray.style.left ='-500px';

    scr_multiplier= scr_width/100;
	 
		    centry=50*aspect;
			
					    bulletMult=(1024/scr_width);
			
			
	blur_canvas.width=scr_width>>1;
	blur_canvas.height=scr_height>>1;				
//
	//blurbuffer.width=scr_width>>1;
	//blurbuffer.height=scr_height>>1;	
	//alert ('resize');
	//c_data = ctx.getImageData(0, 0, scr_width, scr_height);
	

	//sqrt_global_scale=Math.sqrt(global_scale);
	//	sqrt_sqrt_global_scale=Math.sqrt(Math.sqrt(global_scale*global_scale*global_scale));
//  if (android) topoffset=0;


//	   longFPS=0;
//drawlogo();


}

function disableSelection(target){
if (typeof target.onselectstart!="undefined")
	target.onselectstart=function(){return false}
else if (typeof target.style.MozUserSelect!="undefined")
	target.style.MozUserSelect="none";

//	target.onmousedown=function(){return false}
	target.style.cursor = "default"
}

function echo(text){


        	   		   	ctx.fillStyle = 'rgba(255,255,255,.7)';

						ctx.fillText(text, 12 , 12);
}

var windowsopened=0;

function openwindow(father){


//var win=searchWin(father);
///sendrequest(win.src, win, win.index);

///focus(win.index);

///father.opened=true; father.active=true;
fadeto=.9;

/*for (var i=1;i<init_bullets; i++)
		if ((bullet[i].visible)&&(bullet[i]!=father))
			{
			bullet[i].fadeto=0;
			bullet[i].tictac=0;
			if (father.father!=bullet[i]) {bullet[i].opened=false; bullet[i].toclose=true; tick2=0;}
			}

if (openedwindow!=-1) closeWindow(openedwindow); // close last opened window */

        //alert (win.id+'|'+win.src);


openedwindow=win; // after close last opened window , we store current.
windowsopened+=1;


}



function closeWindow(win){
win.father.opened=false;win.father.active=false;
	openedwindow=-1;
	win.fadeto=0;
	fadeto=.5;
	
		windowsopened-=1;
		if (windowsopened==0) openedwindow=-1;

}



