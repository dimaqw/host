//alert('chess_init');

/*
$2'document').ready(function(){
     
});
*/
//draw_fields****************************************

var d = document;
var ch = new Array();
var b = 'black';
var w = 'white';
var bg = 'black-grey';
var wg = 'white-grey';
var cl = 'clear';
var tmp = 'tmp';
var diamg=5; //for animation
var ih=50;
var iw=60;
var sch =[]; //current selected chess
var pl = w; //player, first step white
var ds=2; //diagonal step if 1 deny
var dj=8; //diagonal jump if 4 deny
var st=1; // allow or deny little step after jump
var tmpi = 0; //int for temp array tmp_ch

var tmp_ch = []; tmp_ch[0]=[];
tmp_ch[0]['x']=''; tmp_ch[0]['y']='';

 var cnv = d.getElementById('cnv');
 cnv.addEventListener('click',pp2,false);
 var cntx = cnv.getContext('2d');
 
 cntx.beginPath();
 for(var x=0;x<=540;x+=60){
   cntx.moveTo(x,0);
   cntx.lineTo(x,450);
 }
    
 for(var y=0;y<=450;y+=50){
   cntx.moveTo(0,y);
   cntx.lineTo(540,y);
 }
 cntx.closePath();
 cntx.strokeStyle = '#999';
 cntx.stroke();

    //initialize array chess
    for(x=1;x<=9;x++){
      ch[x]=[];
      for(y=1;y<=9;y++){
       ch[x][y]='';
      }
    }
     
     //fill white chess
    for(x=1;x<=3;x++){
      for(y=1;y<=3;y++){
       drw_ch(x,y,w,20);
      }
    }
     
     //fill black chess
    for(x=7;x<=9;x++){
      for(y=7;y<=9;y++){
       drw_ch(x,y,b,20);
      }
    }

//draw points***************************************

function drw_ch(xp,yp,colour,diam){
   var cnv = d.getElementById('cnv');
   var cntx = cnv.getContext('2d');

    if(!diam) diam=diamg;
	
    cntx.beginPath();
    cntx.arc((xp*iw)-iw/2,(yp*ih)-ih/2,diam,0,Math.PI*2,false);
    cntx.closePath();

    if(colour==w){
      //cntx.strokeStyle = '#000'; cntx.stroke();
      grd	=cntx.createRadialGradient((xp*iw)-iw/2,(yp*ih)-ih/2,8,(xp*iw)-iw/2,(yp*ih)-ih/2,30);
      grd.addColorStop(0,"#fff");
      grd.addColorStop(1,"#000");
      cntx.fillStyle=grd;
      cntx.fill();
      ch[xp][yp]=w;
    }
    if(colour==b){
      grd=cntx.createRadialGradient((xp*iw)-iw/2,(yp*ih)-ih/2,1,(xp*iw)-iw/2,(yp*ih)-ih/2,30);
      grd.addColorStop(0,"#000");
      grd.addColorStop(1,"white");
      cntx.fillStyle=grd;
      cntx.fill();
	  cntx.beginPath();
      cntx.arc((xp*iw)-iw/2,(yp*ih)-ih/2,diam,0,Math.PI*2,false);
      cntx.closePath();
      cntx.strokeStyle = '#555'; cntx.stroke();
      ch[xp][yp]=b;
    }
    if(colour==wg){
      cntx.fillStyle = '#eee'; cntx.fill();
    }
    if(colour==bg){
      cntx.fillStyle = '#999'; cntx.fill();
      diamg+=5;
    }
    if(colour==cl){
      cntx.beginPath();
      cntx.arc((xp*iw)-iw/2,(yp*ih)-ih/2,diam,0,Math.PI*2,false);
      cntx.closePath();
      cntx.fillStyle = '#fff'; cntx.fill();
      cntx.strokeStyle = '#fff'; cntx.stroke();
      ch[xp][yp]=cl;
    }
     if(colour==tmp){
        cntx.beginPath();
        cntx.arc((xp*iw)-iw/2,(yp*ih)-ih/2,diam,0,Math.PI*2,false);
        cntx.closePath();
        cntx.strokeStyle = '#999'; cntx.stroke();
        cntx.fillStyle = '#999'; cntx.fill();
        ch[xp][yp]=tmp;
     }
 }


//touching*******************************************

function pp2(e){

  var cnv = d.getElementById('cnv');
     x = e.pageX - cnv.offsetLeft;
     y = e.pageY - cnv.offsetTop;
     xp = Math.floor(x/iw);xp++;
     yp = Math.floor(y/ih);yp++;

       if(!sch['x']){        //empty, select point for next step
         if(ch[xp][yp]==pl){  // only black or white owner chess
           sch['x']=xp; sch['y']=yp;
           t(xp,yp,bg,4,4,5,80);
         }
       }else{ //if chess already select
          findPath(xp,yp);
       }     
}

//***********************Claer temp path points *******************
function clear_tmp_ch(){
    for (var p=0;p<tmp_ch.length;p++){
       drw_ch(tmp_ch[p]['x'],tmp_ch[p]['y'],cl,22);
     }
     tmp_ch = []; tmp_ch[0]=[];
     tmp_ch[0]['x']=''; tmp_ch[0]['y']='';
}

function t(xp,yp,color,diam,pr,j,ms){
var i=0;
  while(i<j){
    i++;
    setTimeout(function(){drw_ch(xp,yp,color,diam);diam+=pr;},i*ms);
  }
}

function findPath(xp,yp){
   tmp_ch[0]['x']=sch['x']; tmp_ch[0]['y']=sch['y'];
   cx=tmp_ch[tmpi]['x']-xp; cx*=cx;
   cy=tmp_ch[tmpi]['y']-yp; cy*=cy;
    if(ch[xp][yp]!=b && ch[xp][yp]!=w){  // only empty point
        if(cx+cy==0){ //self point
		  t(xp,yp,pl,4,4,5,80);
          clear_tmp_ch();
          sch=[];
          tmpi=0;
          st=1;
          chg_pl();
        }else if(cx+cy<=ds){ //little step
          if(st){
		    t(xp,yp,pl,4,4,5,80);
            clear_tmp_ch();
            sch=[];
            tmpi=0;
            chg_pl();
          }
        }else if(cx+cy<=dj){ //big step------------------------
          jpx=(tmp_ch[tmpi]['x']+xp)/2; jpy=(tmp_ch[tmpi]['y']+yp)/2;
          if(ch[jpx][jpy]==b || ch[jpx][jpy]==w){
            tmp_ch[tmpi+1]=[];
            tmp_ch[tmpi+1]['x']=xp; tmp_ch[tmpi+1]['y']=yp;
            t(xp,yp,tmp,2,1,5,50);
			//drw_ch(xp,yp,tmp,5);
            tmpi++;
            st=0;
          }
        }
    }
}


//change player
function chg_pl(){
if(pl==w){pl=b}else{pl=w}
}
