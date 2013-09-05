//alert(12); 
var d = document; 
var ih=50; 
var iw=60; 
var ds=2; //diagonal step if 1 deny 
var dj=8; //diagonal jamp if 4 deny 
var it =0; //count for tmp_ch array each step
var ch = new Array(); 
var tmp_ch = new Array(); 
tmp_ch[0]=[]; tmp_ch[0]['x']=''; tmp_ch[0]['y']=''; 
  
//ch['y']=[];ch['x']=[]; 
  
cch =[]; 
var b = 'black'; 
var w = 'white'; 
var bg = 'black-grey'; 
var wg = 'white-grey'; 
var cl = 'clear'; 
var tmp = 'tmp'; 
//alert(ch['y'][7]);
  
function findPath(xp,yp){ 
  cx=cch['x']-xp; cx*=cx; 
  cy=cch['y']-yp; cy*=cy; 
  if(ch[xp][yp]!=b && ch[xp][yp]!=w){  // only empty point 
     if(cx+cy<=ds){ 
        drw_ch(cch['x'],cch['y'],cl); 
        drw_ch(xp,yp,b); cch=[]; 
      }else if(cx+cy<=dj){ 
        
         //check, in jump-step must be any chess between other chess 
         jpx=(tmp_ch[it]['x']+xp)/2; jpy=(tmp_ch[it]['y']+yp)/2; 
           
         if(ch[jpx][jpy]==b){
           if(tmp_ch[it]['x']==xp && tmp_ch[it]['y']==yp){
             cch[it]=[];it++;
             
             drw_ch(cch['x'],cch['y'],cl); 
             drw_ch(xp,yp,b); cch=[]; 
             log('yes'); 
           }else{
            //fill tmp_ch array 
            cch[it]=[];
            tmp_ch[it]['x']=xp; tmp_ch[it]['y']=yp;
            it++;
            drw_ch(xp,yp,tmp); 
            log(tmp_ch['x'],tmp_ch['y']); 
              
            } 
         } 
      } 
   } 
  
} 
  
  
  
function pp2(e){
  
  var cnv = d.getElementById('cnv'); 
     x = e.pageX - cnv.offsetLeft; 
     y = e.pageY - cnv.offsetTop; 
     xp = Math.floor(x/iw);xp++; 
     yp = Math.floor(y/ih);yp++; 
  
       if(!cch['x']){       //empty, select point for next step 
         if(ch[xp][yp]==b){  // only black chess, owner chess 
           drw_ch(xp,yp,bg);
           cch['x']=xp; cch['y']=yp;
         } 
       }else{ //if chess already select 
          findPath(xp,yp); 
       } 
       //    log(xp,yp,'; ',cch['x'],cch['y']);      
} 
   
   
 function drw_ch(xp,yp,colour){ 
   var cnv = d.getElementById('cnv'); 
   var cntx = cnv.getContext('2d'); 
    
    cntx.beginPath(); 
    cntx.arc((xp*iw)-iw/2,(yp*ih)-ih/2,20,0,Math.PI*2,false); 
    cntx.closePath(); 
    if(colour==w){ 
      cntx.strokeStyle = '#000'; cntx.stroke(); 
      cntx.fillStyle = '#fff'; cntx.fill(); 
      ch[xp][yp]=w; 
    } 
    if(colour==b){ 
      cntx.fillStyle = '#000'; cntx.fill(); 
      ch[xp][yp]=b; 
    } 
    if(colour==wg){ 
      cntx.fillStyle = '#eee'; cntx.fill(); 
    } 
    if(colour==bg){ 
      cntx.fillStyle = '#999'; cntx.fill(); 
    } 
    if(colour==cl){ 
      cntx.beginPath(); 
      cntx.arc((xp*iw)-iw/2,(yp*ih)-ih/2,22,0,Math.PI*2,false); 
      cntx.closePath(); 
      cntx.strokeStyle = '#fff'; cntx.stroke(); 
      cntx.fillStyle = '#fff'; cntx.fill(); 
      ch[xp][yp]=cl; 
    } 
     if(colour==tmp){ 
       
        cntx.beginPath(); 
        cntx.arc((xp*iw)-iw/2,(yp*ih)-ih/2,5,0,Math.PI*2,false); 
        cntx.closePath(); 
        cntx.strokeStyle = '#000'; cntx.stroke(); 
        cntx.fillStyle = '#000'; cntx.fill(); 
      //ch[xp][yp]=cl; 
     } 
 } 
   
   
  
$('document').ready(function(){ 
  
//alert('chess_init'); 
var d = document; 
  
 var cnv = d.getElementById('cnv'); 
 cnv.addEventListener('click',pp2,false); 
 var cntx = cnv.getContext('2d'); 
   
 for(var x=0;x<=540;x+=60){ 
   cntx.moveTo(x,0); 
   cntx.lineTo(x,450); 
 } 
      
 for(var y=0;y<=450;y+=50){ 
   cntx.moveTo(0,y); 
   cntx.lineTo(540,y); 
 } 
    cntx.strokeStyle = '#eee'; 
    cntx.stroke(); 
      
    cntx.beginPath(); 
    cntx.moveTo(1,0); cntx.lineTo(1,450); 
    cntx.moveTo(539,0); cntx.lineTo(539,450); 
    cntx.moveTo(0,1); cntx.lineTo(540,1); 
    cntx.moveTo(0,449); cntx.lineTo(540,449);  
    cntx.closePath(); 
      
    cntx.strokeStyle = '#000'; 
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
       drw_ch(x,y,w); 
      } 
    } 
       
     //fill black chess 
    for(x=7;x<=9;x++){ 
      for(y=7;y<=9;y++){ 
       drw_ch(x,y,b); 
      } 
    } 
  
  
  
       
}); 
  
  
function log(){ 
var val=''; 
for(var i=0;i<arguments.length;i++){ 
  val += arguments[i] +' '; 
} 
  $('span').append(val+'<br>') 
  
} 
