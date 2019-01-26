function mouse_events() {
	// Mouse events
    c.addEventListener('mouseenter', function(evt)
 	{
//		alert ('mousemoved');              
    }, false);

    
    c.addEventListener('mousemove', function(evt)
 	{
		//alert ('mousemoved');
        mousePos = getMousePos(c, evt);
        target_spot_x=mousePos.x; target_spot_y=mousePos.y;
		interactive();
        mouseMoved();
    }, false);

    c.addEventListener('mousedown', function(evt)
 	{
        mousePos = getMousePos(c, evt);
        target_spot_x=mousePos.x; target_spot_y=mousePos.y;
	    mousepressedOnce();
        tick=0;
    }, false);
		
		
    c.addEventListener('mouseup', function(evt)
 	{   
        mousepressed();
        if (grabbed!=-1)
        {
            if (!bullet[grabbed].opened)
            {
                bullet[grabbed].tictac=1000/fps;
            } 
            else 
            {
                bullet[grabbed].fadeto=1;
            }              
            fadeto=0;
            grabbed=-1;
        }
        //alert ('up!');
        winGrabbed=-1; winScrolled=-1; //WINDOW

    }, false);


     c.addEventListener('mouseout', function(evt)
 	{
        if (grabbed!=-1){
            if (!bullet[grabbed].opened)
            {
                bullet[grabbed].tictac=1000/fps;
                //bullet[grabbed].fadeto=0;
            } 
            else 
            {
                bullet[grabbed].fadeto=.89;
            }
            
            fadeto=0;
            grabbed=-1;
        }
        //winScrolled=-1;                                
        //winGrabbed=-1; //WINDOW
    }, false);

}

function getMousePos(canvas, evt){ // fullscreen ver
    // get canvas position
   
    var mouseX = evt.clientX; 
    var mouseY = evt.clientY; 
    return {
        x: mouseX,
        y: mouseY
    };
}


function getTouchPos(canvas, evt){ // fullscreen ver
    // get canvas position
    event.preventDefault();
    var touch = event.touches[0]
	
    var mouseX = touch.pageX; 
    var mouseY = touch.pageY; 
    return {
        x: mouseX,
        y: mouseY
    };
}




function doubleclick(){
	var res=tick<doubleClick;
	 if (res) tick=100000;
	return res;
}



function mousepressed(){
 var i;
 var flag=false;
//x=mousePos.x;
//y= mousePos.y;

	for (i=0; i<bullets; i++)
          if (inbullet(bullet[i]))
          {     flag=true;
         	      	if (doubleclick())
						if (bullet[i].isFolder) openfolder(bullet[i])
							 else				
							 if (bullet[i].z_to==camera_z_to)  openwindow(bullet[i])
			 else 
			 {
				 
				 closeall_z(bullet[i].z_to);
				 camera_z_to=bullet[i].z_to;
			 }



          }

     if (!flag&&doubleclick()) flashall();
}


function mousepressedOnce(){
 var i;
 var flag=false;
//x=mousePos.x;
//y= mousePos.y;

	for (i=0; i<bullets; i++)
          if (inbullet(bullet[i]))
          {     flag=true;
          //	if (doubleclick()) if (bullet[i].isFolder) openfolder(bullet[i]); else openwindow(bullet[i]);

			         	bullet[i].fadeto=1; lastMousePos=mousePos; grabbed=i; fadeto=1

          }

     if (!flag&&doubleclick()) flashall();
}

function mouseMoved(){
 var i;
 var flag=false;
//x=mousePos.x;
//y= mousePos.y;

	for (i=0; i<bullets; i++)
          if (inbullet(bullet[i])&&bullet[i].visible)
          {
          //	if (doubleclick()) if (bullet[i].isFolder) openfolder(bullet[i]); else openwindow(bullet[i]);

			         	bullet[i].fadeto=1;bullet[i].tictac=1000/fps; bullet[i].active=true;

          } else if (!bullet[i].opened) bullet[i].active=false;


}