var d = document;
var diam = 2;
var g =3 //giam diameter
  
function pp2(e){
  var cnv = d.getElementById('cnv');
     x = e.pageX - cnv.offsetLeft;
     y = e.pageY - cnv.offsetTop;
     color = get_random_color();
     t('drw_ch(x,y,color)',8,50)
     //drw_ch(x,y);
     diam=2;
} 
   
   
function drw_ch(xp,yp,color){ 
   var cnv = d.getElementById('cnv'); 
   var cntx = cnv.getContext('2d'); 
    cntx.beginPath(); 
    cntx.arc(xp,yp,diam,0,Math.PI*2,false); 
    cntx.closePath(); 
    cntx.fillStyle = color; cntx.fill(); 
    diam+=g;
 } 
   
function t(fn,j,ms){
var i=0;
  while(i<j){
    i++;
    setTimeout(fn,i*ms);
  }
}
  
  
$('document').ready(function(){
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

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
