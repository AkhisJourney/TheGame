    // Bullets
    var pi2 = Math.PI * 2;
    var sin45 = Math.sqrt(2) / 2;

    var sreda = .6;
    var atommass = 20;
    var bordermass = .002;
    var maxspeed = 1;
    var aspect;
    var centry;
    var fontsize = 14;
    var charwidth = fontsize * .83;
    var bullets;
    //var litever;




    var bulletcolor = '#eee';
    var bulletstroke = 'rgba(255,255,255,.2)';

    var lastopenedfolder = -1;


    var mousePos;
    var doubleClick = 8;
    var lastMousePos;
    var grabbed = -1;
    var fadespeed = .1;
    var fluct = 80;
    var rost = 0.5;
    var tick = 0;
    var tick2 = 0;
    var index = 0;




    var txt = document.createElement('canvas'); //text   sprite
    var gray_txt = document.createElement('canvas'); //text   sprite

    var camera_z = 0;
    var camera_z_to = 0;
    var offset_z = 200;
    var z;
    var z_to;
    var perspective = 100;


     var cir = [];
                var cirh = [];
                var gray_cir = [];          
                var cir2 = [];
                //var lcirh2 = cirh2;
                var gray_cir2 = [];




    function transl_x(x, z) {
        return 50 + ((x - 50) / z);
    }

    function transl_y(y, z) {
        return 50 * aspect + ((y - 50 * aspect) / z);
        //	*((z+1)-perspective)/100
    }

    function transl_r(r, z) {
        //return 1;
        return r / z;
    }


    function inbullet(bullet) {

        //var z=(((camera_z+offset_z-bullet.z+.001)-perspective)/perspective);
        //return dist( mousePos, {x:conv(transl_x(bullet.x,z)),y:conv(transl_y(bullet.y,z))} ) < conv(transl_r(bullet.mass*(1+bullet.fade*rost)+5,z));
        return (bullet.visible && dist(mousePos, {
            x: bullet.x_transl,
            y: bullet.y_transl
        }) < conv(bullet.mass_transl));

    }

    function getColorRGBA(R,G,B,A)
    {
    	return 'rgba(' + (R<<4) + ',' + (G<<4) + ','+ (B<<4) + ',' + A +')';
    }

    function getColorRGBA256(R,G,B,A)
    {

    	return 'rgba(' + (R) + ',' + (G) + ','+ (B) + ',' + A +')';
    }

        function getColorRGB(R,G,B)
    {
    	return 'rgb(' + (R<<4) + ',' + (G<<4) + ','+ (B<<4) + ')';
    }

    function random_rgb() {
        var o = Math.round,
            r = Math.random,
            s = 15;
        return o(r() * s);
    }

    function Bullet(name, order, mass, src, visible, isFolder, colorR, colorG, colorB) {
        this.index = index; //idx
        index++;
        this.order = order;

        this.name = name; //name of bullet
        this.mass = mass; //mass of bullet
        this.src = src; //source (file or folder)

        this.x = 45 + Math.random() * 10;
        this.y = 15 + Math.random() * 10;

        this.speed_x = Math.random() * 2 - 1;
        this.speed_y = Math.random() * 2 - 1;


        this.z = 0; // z coordinate (real)!!!!		 
        this.z_to = 0; // target z 
        this.z_lvl = 0; //  z  by the layer.
        this.z_transl = 0; // z coordinate (real)!!!!		 
        this.mass_transl = 0;
        this.x_transl = 0;
        this.y_transl = 0;

        this.fade = 0;
        this.fadeto = 0;
        this.tictac = 0;

        this.father = false;

        this.visible = visible;
        this.opened = false;
        this.toclose = false;
        this.txtpos = 0;
        this.isFolder = isFolder;
		
		this.clicked = false;
		this.hasKids = false;


        this.active = false;
        this.colorR = (typeof colorR !== "undefined") ? colorR : random_rgb();
        this.colorG = (typeof colorG !== "undefined") ? colorG : random_rgb();
        this.colorB = (typeof colorB !== "undefined") ? colorB : random_rgb();
    }

    function Link(start, end) {
        this.start = start;
        this.end = end;
    }



    function drawSprites(R,G,B) {

    	var index = R*15*15+G*15+B;
        var spriteradius = Math.round(Math.max(scr_height, scr_width) / 16);



        cir[index] = document.createElement('canvas'); // circle sprite
        cir[index].width = spriteradius;
        cir[index].height = spriteradius;



        cirx = cir[index].getContext('2d');
        cirx.clearRect(0, 0, cir[index].width, cir[index].height);

        for (var i = cir[index].width / 2; i > cir[index].width / 4; i--) {
            cirx.beginPath();


            cirx.fillStyle = getColorRGBA(R,G,B,(.7 - i / cir[index].width) );//210

            cirx.arc(cir[index].width / 2, cir[index].height / 2, i - 4, 0, pi2, true);


            cirx.fill();

        }



    }


    function getOrder(str) {
        var i;
        var result = false;

        for (i = 1; i < bullets; i++)
            if (bullet[i].order == str) {
                result = bullet[i];
                break;
            }
        ///             alert (result);
        return result;

    }



    function conv(a) {
        //return (.5+a*scr_multiplier) | 0;
        return a * scr_multiplier;

    }

    function backconv(a) {
        //return (.5+a*scr_multiplier) | 0;
        return a / scr_multiplier;

    }

    function round(a) {
        //return litevers?(.5+a) | 0:a;
        return (.5 + a) | 0;

    }

    function realround(a) {
        return (.5 + a) | 0;
    }


    function dist(a, b) {
        return (a.x < b.x ? b.x - a.x : a.x - b.x) + (a.y < b.y ? b.y - a.y : a.y - b.y); // quick version
        //	return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));	return Math.abs(a.x-b.x) + Math.abs(a.y-b.y);
    }

    function realdist(a, b) {
        //	return (a.x<b.x?b.x-a.x:a.x-b.x) + (a.y<b.y?b.y-a.y:a.y-b.y); // quick version
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    function allstringslength() {
        var i;
        var res = 0;
        for (i = 1; i < bullets; i++) {
            bullet[i].txtpos = res * charwidth;
            res += bullet[i].name.length;
        }
        return res;
    }

    function flashall() {

        var i;

        for (i = 1; i < bullets; i++) {
            bullet[i].fadeto = 1;
            bullet[i].tictac = 100 + shiftRand() * 200;
        }
        fadeto = 1;
    }


    function showlinks() {
        var i;

        ctx.beginPath();
        //        ctx.lineWidth = 1;
        //            ctx.strokeStyle = bulletstroke;
        for (i = 1; i < links; i++)
            if (link[i].start.visible && link[i].end.visible) {
                //		if (link[i].start.visible&&link[i].end.visible&&(link[i].end.z_transl>1)&&(link[i].start.z_transl>1)){
                //if ((link[i].start.x_transl>0)&&(link[i].start.y_transl>0)&&(link[i].start.y_transl<scr_height)&&(link[i].start.x_transl<scr_width))
                //	var z1=(((camera_z+offset_z-link[i].start.z+.001)-perspective)/perspective);
                //		var z2=(((camera_z+offset_z-link[i].end.z+.001)-perspective)/perspective);
                ctx.moveTo(link[i].start.x_transl, link[i].start.y_transl);
                ctx.lineTo(link[i].end.x_transl, link[i].end.y_transl);




            }
        ctx.stroke();
    }



    function showbullets() {

        var i, mass, x, y;
        ctx.strokeStyle = bulletstroke;
        if (fluct) fluctuation();
        phyzycs();
        showlinks();
        bulletsevents();




        //ctx.fillStyle = bullet.color;

        // ctx.stroke();
    }



    function phyzycs() {

        var i, j;

        camera_z -= (camera_z - camera_z_to) * fadespeed;

        for (i = 0; i < bullets; i++)
            if (bullet[i].visible) {

                //3d		   

                bullet[i].z -= (bullet[i].z - bullet[i].z_to) * fadespeed;


                //border mass
                bullet[i].speed_x += (50 - bullet[i].x) * bordermass;
                bullet[i].speed_y += (centry - bullet[i].y) * bordermass;


                //other bullet mass
                for (j = i + 1; j < bullets; j++)
                    if (bullet[j].visible) {

                        if (bullet[i].y == bullet[j].y) {
                            bullet[i].y += .00001
                        } //division by zero
                        if (bullet[i].x == bullet[j].x) {
                            bullet[i].x += .00001
                        } //division by zero



                        f = 1 / Math.max(dist(bullet[i], bullet[j]), maxspeed);
                        f = (1 + bullet[i].fade * rost) * bullet[i].mass * atommass * f * f * f // distance in degree 3

                        //  k = (bullet[i].x-bullet[j].x)/(bullet[i].y-bullet[j].y);




                        forcex = (bullet[j].x - bullet[i].x) * f;
                        forcey = (bullet[j].y - bullet[i].y) * f;



                        if (
                            (
                                (bullet[i].toclose && (bullet[j].father == bullet[i]) && ((bullet[j].toclose) || (!bullet[j].opened)) && !childcount(bullet[j]))
                            ) //||  (bullet[j].toclose&&(bullet[i].father.index==j)))
                            ||
                            (bullet[i].father.toclose && (bullet[j].father.index * 2 > 1) && (bullet[i].father == bullet[j].father) && (!childcount(bullet[i]) || !childcount(bullet[j])))
                        )

                        { //alert (i+'|'+j+'('+bullet[i].toclose+'>'+bullet[i].father.toclose+'|'+bullet[i].father.index+'|'+bullet[j].father.index);                                                     // if ordinary  ok +force, if folder for close -force

                            // hide bullet if it close;
                            if ((dist(bullet[i], bullet[j]) < bullet[i].mass + 5)) {
                                bullet[j].fade -= .3;
                                if ((bullet[j].fade < .2) && !childcount(bullet[j])) bullet[j].visible = false;
                                if (!childcount(bullet[i])) {
                                    bullet[i].opened = false;
                                    bullet[i].toclose = false;
                                }
                                var MaxZ = max_z()
                                if (camera_z_to > MaxZ) camera_z_to = MaxZ;
                            }

                            tick2++;

                            forcex = -forcex * 2 * (100 + tick2) * .01;
                            forcey = -forcey * 2 * (100 + tick2) * .01;


                        }


                        //maxspeed clipping
                        forcex = Math.min(forcex, maxspeed);
                        forcex = Math.max(forcex, -maxspeed);
                        forcey = Math.min(forcey, maxspeed);
                        forcey = Math.max(forcey, -maxspeed)



                        if (bullet[i].toclose && (bullet[j].father == bullet[i])) {
                            bullet[i].speed_x -= forcex >> 1;
                            bullet[i].speed_y -= forcey >> 1;

                            bullet[j].speed_x += forcex;
                            bullet[j].speed_y += forcey;
                        } else {
                            bullet[i].speed_x -= forcex;
                            bullet[i].speed_y -= forcey;

                            bullet[j].speed_x += forcex;
                            bullet[j].speed_y += forcey; // Tru + or -

                        }

                    }




                bullet[i].x += bullet[i].speed_x; //Moving
                bullet[i].y += bullet[i].speed_y;
                //overflow control
                bullet[i].x = Math.max(bullet[i].x, bullet[i].mass);
                bullet[i].x = Math.min(bullet[i].x, 100 - bullet[i].mass);
                bullet[i].y = Math.max(bullet[i].y, bullet[i].mass + 5);
                bullet[i].y = Math.min(bullet[i].y, 100 * aspect - bullet[i].mass);

                bullet[i].speed_x *= sreda; //Slowing
                bullet[i].speed_y *= sreda;

                var z = bullet[i].z_transl = (((camera_z + offset_z - bullet[i].z + .001) - perspective) / perspective);

                if (i == grabbed) // Bullet grabbed
                {

                    var z2 = 1 / z;

                    bullet[i].x = transl_x(mousePos.x / scr_multiplier, z2);
                    bullet[i].y = transl_y(mousePos.y / scr_multiplier, z2);
                    bullet[i].speed_x -= (lastMousePos.x - mousePos.x) / scr_multiplier;
                    bullet[i].speed_y -= (lastMousePos.y - mousePos.y) / scr_multiplier;
                    lastMousePos = mousePos;
                }




                bullet[i].mass_transl = transl_r((1 + bullet[i].fade * rost) * bullet[i].mass, z) * bulletMult;
                bullet[i].x_transl = conv(transl_x(bullet[i].x, z));
                bullet[i].y_transl = conv(transl_y(bullet[i].y, z));

            }

    }


    function max_z() {
        var res = -10000
        for (var i = 0; i < bullets; i++) {
            if (bullet[i].visible && (res < bullet[i].z_to)) res = bullet[i].z_to
        }
        return res;

    }

	function checkForWin (father)
	{
		if (targetColorR == father.colorR && targetColorG == father.colorG && targetColorB == father.colorB)
			alert ('You Got he Mach!');


	}

    function openfolder(father) {

        //closeall();

		if (father!=root) checkForWin (father);
        if (!father.opened) {
			
			if (!father.hasKids)
			{
				makeKids(father);
				father.hasKids = true;
        	}

            father.fadeto = 1;
            father.toclose = false;
            father.opened = true;
            // closeall_z_minus(bullet[i].z_to);
            for (var i = 0; i < bullets; i++)

            {
                if ((bullet[i].father == father.father) && !bullet[i].opened) bullet[i].active = false;

                if (bullet[i].father == father) {
                    lastopenedfolder = father;
                    bullet[i].x = father.x + shiftRand() * .1 - .05;
                    bullet[i].y = father.y + shiftRand() * .1 - .05;

                    this.speed_x = shiftRand() * 1 - .5;
                    this.speed_y = shiftRand() * 1 - .5;

                    bullet[i].visible = true;




                    //3d Z coord moove!!!!
                    bullet[i].z_to = bullet[i].z_lvl;
                    camera_z_to = bullet[i].z_lvl;

                    //if (openedwindow!=-1) closeWindow(openedwindow)
                }



            }

        } else

        {
            father.opened = false;
            father.active = false;
            father.toclose = true;
            tick2 = 0;
            lastopenedfolder = -1;

            for (var i = 0; i < bullets; i++)

            {
                if (bullet[i].father == father)




                    //3d Z coord moove!!!!
                    bullet[i].z_to = father.z_lvl;
                var MaxZ = max_z()
                if (camera_z_to > MaxZ) camera_z_to = MaxZ;
                //			camera_z_to=father.z_lvl;

                //if (openedwindow!=-1) closeWindow(openedwindow)




            }



        };
    }



    function childcount(father) {
        var i;
        var count = 0;
        for (i = 0; i < bullets; i++)
            if ((bullet[i].father == father) && bullet[i].visible) count++;
        return count;
    }




    function bulletsevents() {
        var i, mass;
        ctx.lineWidth = .5;




        for (i = 0; i < bullets; i++)
            if (bullet[i].visible) {

                var z = bullet[i].z_transl;

                mass = bullet[i].mass_transl;


                fade = bullet[i].fade;
                if (fade != bullet[i].fadeto) {
                    if ((fade > bullet[i].fadeto) && (bullet[i].tictac > 0)) //tictac (time to be visible)
                    {
                        bullet[i].tictac--;
                    } else {

                        bullet[i].fade -= (fade - bullet[i].fadeto) * fadespeed;
                        if (bullet[i].fade < .1) bullet[i].fade = 0;
                    }
                }
                //    if (fade>0)                                                     // IF VISIBLE ThEN TEXT
                //       {
                //txt.style.opacity=.5;
                //							var z=(((camera_z+offset_z-bullet[i].z+.001)-perspective)/perspective);
                //    mass = conv(transl_r( (1+bullet[i].fade*rost)*bullet[i].mass ,z) );


                //	             mass=(1+fade*rost)*bullet[i].mass;
                mass = (1 + fade * rost) * bullet[i].mass_transl;
                var text = bullet[i].name;

                r2 = conv((mass + .5 + fade) * sin45);



                //var z=bullet[i].z_transl;



                text_x = bullet[i].x_transl + r2;



                text_y = bullet[i].y_transl - (r2 >> 1);

                //   if ( (text_x+text.length*charwidth>0)&&(text_y+fontsize+3>0)&&(text_x<scr_width)&&(text_y<scr_height))

              

                //else  if (bullet[i].active||bullet[i].opened||(bullet[i].father==lastopenedfolder))ctx.drawImage(txt, bullet[i].txtpos,0, text.length*charwidth-1, fontsize+3 , text_x,  text_y-fontsize, text.length*charwidth-1, fontsize+3); //print
                //	else ctx.drawImage(gray_txt, bullet[i].txtpos,0, text.length*charwidth-1, fontsize+3 , text_x, text_y-fontsize, text.length*charwidth-1, fontsize+3); //print



                //if ((fade>0)&&(bullet[i].x_transl>0)&&(bullet[i].y_transl>0)&&(bullet[i].x_transl<scr_width)&&(bullet[i].y_transl<scr_height))                                                     // IF VISIBLE ThEN TEXT
if (fade>0)
{
                ctx.beginPath(); // if disabled- is very interesting

                // animate circles;
                r1 = conv((mass + fade / 2) * sin45);
                ctx.arc(bullet[i].x_transl, bullet[i].y_transl, r1, pi2 * fade, fade, true);


                ctx.arc(bullet[i].x_transl, bullet[i].y_transl, r2, fade, -pi2 * fade, true);

                // animate lines
               
                               		startx=bullet[i].x_transl+(mass+.3)*sin45;
                								starty=bullet[i].y_transl-(mass+.3)*sin45;

                                         //  tempfade=Math.min(fade*2,1);
                						   tempfade=.1;

                					    ctx.moveTo(startx,starty);
                				    		    ctx.lineTo(startx+tempfade,starty-tempfade); // ( / )



                                    if (fade>.2)
                                     {         tempfade2=Math.min((fade-.2)*5,1);
                                            ctx.moveTo(conv(startx+tempfade),conv(starty-tempfade));
                				    		    ctx.lineTo(conv(startx+tempfade)+round(charwidth*text.length*(tempfade2)),conv(starty-tempfade)); // ( / )


                                     }



                                  
                ctx.stroke();

}

             
                //   if ( (x+mass>0)&&(y+mass>0)&&(x<scr_width)&&(y<scr_height))///main function to draw
               drawBullet (bullet[i]);


                if ((bullet[i].tictac > 0) && (bullet[i].fade > .9) && (i != grabbed) && (!bullet[i].opened)) bullet[i].fadeto = 0;

            }
    }

    function drawBullet(bullet)
    {

    	    	var index = bullet.colorR*15*15+bullet.colorG*15+bullet.colorG;
    	   mass = conv(bullet.mass_transl);
                var x = bullet.x_transl - mass;
                var y = bullet.y_transl - mass;

                var lcir = cir[index];

                mass = mass * 2;

    // if (bullet.z_to != camera_z_to) 
     {
                    //if (bullet.isFolder) 
                    	ctx.drawImage(lcir, 0, 0, lcir.width, lcir.height, x, y, mass, mass);

                  
                }
    }
    

    function fluctuation() {

        var event = 1 + realround(shiftRand() * bullets * fluct);

        if (event < bullets) {
            bullet[event].fadeto = 1;
            bullet[event].tictac = shiftRand() * 200;
        }
    }