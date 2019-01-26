
var scr,drm;
var canvasData;

var blurbuffer;
var blur_ctx;


var blur_canv;
var blur_canv_ctx;

var bg;
var bg_ctx;

var logo;
var logo_ctx;
var logo_X=150;
var logo_Y=270;
var logo_scale_X=1;
var logo_scale_Y=1;

var brickquality =1;

var global_scale,sqrt_global_scale,sqrt_sqrt_global_scale,s_x,s_y,w,h,ray,ray_img,ray_ctx;

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
	
    bg = document.createElement('canvas');  //prepare for animate_bg
	bg.width=256;
	bg.height=256;	 
    bg_ctx = bg.getContext('2d');
	bg_data = bg_ctx.getImageData(0, 0, 256, 256);
	
	//for (var j=0; j<7; j++) 
 	
 ray_img=document.getElementById('ray_img_150');
 ray_imgs.push(ray_img);
 
	for (var i=1; i<50; i++) 
	{
 var img = new Image();		
 img.src = 'img/flash/flash4_000'+(i<10?'0':'')+i+'.jpg';
// alert("img/flash/flash4_000"+(i<10?'0':'')+i+".jpg'");
 ray_imgs.push(img);
		//ray_imgs.push('aaa');
	}
	
	
// logo_img.src = 'img/logo.gif';
 	
// prevent drag n droop
Array.prototype.forEach.call(document.getElementsByTagName('body'), function(el) {
    el.setAttribute("onDragStart","return false");
});
				// set up elements.

logo = document.getElementById('logo');
	logo_ctx = logo.getContext('2d');
	
//ray_img = document.getElementById('ray_img');	
ray = document.getElementById('ray');
ray_ctx = ray.getContext('2d');


c = document.getElementById('canvas');
	ctx = c.getContext('2d');
	scr =   document.getElementById('screen');
	
	
	bg_canv = document.getElementById('bg_canvas');
	   bg_canv_ctx = bg_canv.getContext('2d');
	   
	   
	  // blur_canv = document.getElementById('blur_canvas');
	 //  blur_canv_ctx = blur_canv.getContext('2d');
	   	
	   
    	//win =  document.getElementById('win');
	//		background = document.getElementById('background');
			
			
		
			
			          //events
					  

					  
    resize();
/*	particlecount=Math.max(scr_width,scr.height)*3
	init_particles();   */




fadeto=0.5;
	currentfade=1;
		fps=1000/48;



 init_bullets();

	

	//	fader = document.getElementById('fader');
//			stream1 = document.getElementById('stream1');
//				e = document.getElementById('screen');
//	stream2 = document.getElementById('stream2');

//	bg = document.getElementById('canvasbg');
//		btx = bg.getContext('2d');


	
		
                     //ctx.beginPath();


	

			


		 	ctx.fillStyle = bulletcolor;

            //ctx.closePath();

    disableSelection(c);


    

				//txtx.closePath();
            	          //txtx.stroke();*/

for (var R=0; R<16; R++)
	for (var G=0; G<16; G++)
		for (var B=0; B<16; B++)
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
	
if (!android3)
{
	//if (blurOn)  blur ();


	spot_x-=(spot_x-target_spot_x)*fadespeed;

var number=((spot_x/scr_multiplier)>>1);

if (ray_imgs[number].complete) ray_img=ray_imgs[number];


showspot();

}
    
//fps meter
// adaprive degradation;

now = (new Date()).getTime();
FPS=1000/(now-lastTime);
lastTime=now;


longFPS=realround((longFPS*7+FPS)/8);


//thermostat 
if (longFPS>20) blurOn=true;
	if ((longFPS<10)&&(blurOn)){blur_canv.width=blur_canv.width; blurOn=false;}
	
	if (longFPS>15) brickquality=2;	
		if (longFPS<8) brickquality=1;	



	 
	message=us_agent_str;
	 
	 
	 
	 
	 
	 c.width = c.width;  // Clear canvas;
echo (longFPS+'|'+message);




showbullets(); //draw bullets
//showWindows(); //windows


     tick++; //timer+
}


function showspot()
{
//	ray_ctx.fillStyle = "rgba(0, 0, 0,0.01)";

//	ray_ctx.fillRect (0, 0,  scr_width, scr_height); //clear canvas
	
//	var scale_X=w/900;
//	var scale_Y=h/506;
		
	var cropstart_X=0;
		var cropstart_Y=0;
			var cropend_X=900;
				var cropend_Y=506;
	
//	if (x<0) {cropstart_X=-x/scale_X; x=0}
//		if (y<0) {cropstart_Y=-y/scale_Y; y=0}
		
//	if (x+h>scr_width>>1) {cropstart_X=-x/scale_X; w=}

//		alert ('imhere!');
	
	ray_ctx.drawImage(ray_img,cropstart_X,cropstart_Y,cropend_X,cropend_Y, s_x,s_y,w,h);
	
	
	
	
}



function resize() {
	//adjustHeight();
	//c.requestFullScreen();
    var rect = c.getBoundingClientRect();

	
  	  scr_width = rect.width*ss_factor;
	  	  scr_height = rect.height*ss_factor;
		  
		// if (android3){ scr_width=scr_width>>1;
		 //		 		scr_height=scr_height>>1;}
//		scr.height=scr_height;
		  
/*var elem = c;  //fullscr
    if (elem.requestFullScreen) {  
      elem.requestFullScreen();  
    } else if (elem.mozRequestFullScreen) {  
      elem.mozRequestFullScreen();  
    } else if (elem.webkitRequestFullScreen) {  
      elem.webkitRequestFullScreen();  
    }  		  */
		  
//document.getElement= scr_width+'px'
//document.getElementById('clear').style.top = scr_height+100+'px';
		
//document.body.offsetHeight=scr_height+'px';

//  document.getElementByTagName('body')[0].style.height=scr_height+'px';

//frame.style.height = scr_height + "px";
		
		
			bg_canv.width=scr_width>>3;
		bg_canv.height=scr_height>>3; 	

		
		
			c.width = scr_width;
		    c.height = scr_height;
			
			ray.width = 900;
		    ray.height = 506;
			
			
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
			
			
//	blur_canv.width=scr_width>>1;
//	blur_canv.height=scr_height>>1;				
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



function drawlogo()
{	//white
	
//canvg(logo, '<svg><circle fill="#4D86C5" cx="-0.986" cy="0.727" r="32.659"/><g><path fill="#000000" d="M-122.437,11.255h-17.576l-4.573,9.971h-6.674l20.315-43.632l19.596,43.632h-6.78L-122.437,11.255z,M-124.962,5.433l-6.089-13.959l-6.383,13.959H-124.962z"/><path fill="#000000" d="M-77.792-17.635v7.326c-3.581-2.994-7.286-4.493-11.114-4.493c-4.22,0-7.774,1.516-10.663,4.547,	c-2.907,3.013-4.36,6.7-4.36,11.062c0,4.306,1.453,7.941,4.36,10.902c2.908,2.961,6.471,4.439,10.689,4.439,		c2.181,0,4.033-0.354,5.558-1.063c0.851-0.355,1.733-0.834,2.646-1.438c0.912-0.602,1.874-1.328,2.884-2.18v7.484,c-3.545,2.014-7.268,3.02-11.167,3.02c-5.868,0-10.875-2.049-15.023-6.143c-4.131-4.131-6.196-9.111-6.196-14.943,c0-5.229,1.729-9.892,5.186-13.986c4.253-5.018,9.758-7.525,16.511-7.525C-84.794-20.625-81.231-19.627-77.792-17.635z"/><path fill="#000000" d="M-47.32-14.004H-63.78v9.864h15.98v5.825h-15.98v13.719h16.459v5.822h-22.654v-41.054h22.654V-14.004z"/><path fill="#000000" d="M51.035,4.554v16.672H44.84v-41.054h7.019c3.438,0,6.037,0.24,7.792,0.719,		c1.771,0.479,3.331,1.383,4.68,2.712c2.355,2.305,3.536,5.212,3.536,8.722c0,3.758-1.259,6.736-3.775,8.934,		c-2.519,2.199-5.913,3.296-10.185,3.296H51.035z M51.035-1.188h2.313c5.69,0,8.536-2.189,8.536-6.568,		c0-4.236-2.934-6.355-8.802-6.355h-2.047V-1.188z"/><path fill="#000000" d="M72.2,0.514c0-5.779,2.116-10.742,6.354-14.891c4.22-4.148,9.289-6.221,15.211-6.221,		c5.849,0,10.864,2.092,15.048,6.274c4.201,4.184,6.302,9.209,6.302,15.076c0,5.903-2.108,10.911-6.328,15.024,		c-4.235,4.131-9.352,6.195-15.343,6.195c-5.3,0-10.059-1.836-14.278-5.504C74.521,12.408,72.2,7.089,72.2,0.514z M78.448,0.58,		c0,4.535,1.525,8.263,4.575,11.185c3.03,2.922,6.53,4.383,10.501,4.383c4.308,0,7.942-1.486,10.903-4.463,		c2.958-3.01,4.439-6.678,4.439-10.999c0-4.374-1.463-8.04-4.388-10.999c-2.906-2.975-6.505-4.463-10.794-4.463,		c-4.272,0-7.881,1.488-10.823,4.463C79.92-7.371,78.448-3.74,78.448,0.58z"/><path fill="#000000" d="M146.121-13.738l-5.025,2.978c-0.941-1.63-1.837-2.694-2.687-3.19c-0.886-0.566-2.03-0.851-3.43-0.851,		c-1.72,0-3.147,0.487-4.281,1.464c-1.135,0.959-1.702,2.164-1.702,3.619c0,2.004,1.489,3.617,4.469,4.842l4.095,1.676,		c3.332,1.35,5.769,2.994,7.31,4.937c1.545,1.941,2.314,4.324,2.314,7.145c0,3.777-1.26,6.9-3.775,9.365,		c-2.535,2.484-5.68,3.727-9.439,3.727c-3.564,0-6.508-1.061-8.828-3.18c-2.287-2.117-3.715-5.092-4.282-8.92l6.276-1.383,		c0.282,2.412,0.78,4.078,1.487,5c1.277,1.773,3.14,2.658,5.585,2.658c1.933,0,3.536-0.646,4.813-1.939,		c1.277-1.293,1.916-2.932,1.916-4.916c0-0.797-0.113-1.527-0.333-2.191c-0.223-0.664-0.567-1.275-1.039-1.834,		c-0.469-0.557-1.074-1.08-1.82-1.566c-0.744-0.486-1.63-0.953-2.658-1.396l-3.961-1.646c-5.621-2.374-8.429-5.846-8.429-10.416,		c0-3.082,1.179-5.659,3.536-7.731c2.356-2.091,5.289-3.136,8.799-3.136C139.764-20.625,143.46-18.329,146.121-13.738z"/><path fill="#000000" d="M166.753-14.004v35.23h-6.197v-35.23h-9.438v-5.824h25.047v5.824H166.753z"/></g><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-0.8589" y1="-24.6748" x2="-0.8589" y2="25.1675"><stop  offset="0.5706" style="stop-color:#ffffff"/><stop  offset="1" style="stop-color:#c0c9e0"/></linearGradient><path fill="url(#SVGID_1_)" d="M16.632-2.055C13.288-7.064-0.663-24.429-0.856-24.669v-0.006l-0.002,0.003l-0.002-0.003v0.006,	c-0.193,0.24-14.145,17.604-17.488,22.614c-0.799,1.197-6.808,9.988-0.458,15.884c5.173,4.803,9.905,2.15,13.42,1.033,	c3.04-0.967,4.301,0.805,2.164,5.414c-1.847,3.986-3.72,4.891-3.72,4.891h5.62h0.926h5.621c0,0-1.874-0.904-3.721-4.891,	c-2.136-4.609-0.875-6.381,2.166-5.414c3.515,1.117,8.247,3.77,13.419-1.033C23.439,7.933,17.431-0.857,16.632-2.055z"/></svg>',{ ignoreDimensions: true, ignoreMouse: true, offsetX: logo_X, offsetY: logo_Y, scaleWidth: global_scale, scaleHeight: global_scale });

/*var koef_X=1;
var koef_Y=.15;

	var cropstart_X=s_x*koef_X;
		var cropstart_Y=s_y*koef_Y;
			var cropend_X=w*koef_X;
				var cropend_Y=h*koef_Y;
	

	logo_ctx.drawImage(logo_img,0,0,1001,199, cropstart_X,cropstart_Y,cropend_X,cropend_Y);*/
	
}
