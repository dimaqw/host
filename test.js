alert(1);
//alert(12); 
var d = document; 
var diam = 5;

  
function pp2(e){
  
  var cnv = d.getElementById('cnv');
     x = e.pageX - cnv.offsetLeft;
     y = e.pageY - cnv.offsetTop;
     drw_ch(x,y);
     diam=5;
     
} 
   
   
function drw_ch(xp,yp){ 
   var cnv = d.getElementById('cnv'); 
   var cntx = cnv.getContext('2d'); 
    
    cntx.beginPath(); 
    cntx.arc(xp,yp,diam,0,Math.PI*2,false); 
    cntx.closePath(); 
    cntx.fillStyle = '#000'; cntx.fill(); 
      
 } 
   
function t(fn,j,ms){
var i=0;
  while(i<j){
    i++;
    setTimeout(fn,i*ms);
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
      
}); 
