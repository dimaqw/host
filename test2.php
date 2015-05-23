<title>Функции</title>
<?php
header('Content-Type: text/html; charset=utf-8');
function linkk($linkk,$title)
{
   echo "<a href='$linkk'>$title</a>";
}
linkk("http://www.natribu.org","Сходить нахуйй");

echo "<br>";

function square($a)
{
   $result=$a*$a;
   return $result;
}
echo square(2);
echo "<br>";

function plus ($b,$c)
{
   $result1 = $b+$c;
   
   return $result1;
}
echo plus (9,2);
echo "<br>";

function sqrt1 ($d)
{
   $result2 = sqrt($d);
 
   return $result2;
}
echo sqrt1 (16);
echo "<br>";

function sum ($e,$f,$g)
{
   $result3 = $e+$f+$g;
   
   return $result3;

}
echo sum (square(2),plus (9,2),sqrt1 (16));
