<title>Функции</title>
<?php

function linkk($linkk,$title)
{
   echo "<a href='$linkk'>$title</a>";
}
linkk("http://www.natribu.org","Сходить нахуйй");

echo "<br>";

function square($a)
{
   $result=$a*$a;
   echo $result;
}
square(2);

function plus ($b,$c)
{
   $result1 = $b+$c;
   echo "<br>";
   echo $result1;
}
plus (9,2);

function sqrt1 ($d)
{
   $result2 = sqrt($d);
   echo "<br>";
   echo $result2;
}
sqrt1 (16);

function sum ($e,$f,$g)
{
   $result3 = $e+$f+$g;
   echo "<br>";
   echo $result3;
}
sum (1,2,3);

