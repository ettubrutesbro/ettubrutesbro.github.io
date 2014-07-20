<? 
echo("Your information has been successfully added to the database."); 
$name=$_POST['name']; 
$email=$_POST['email']; 
$location=$_POST['location']; 
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$conn = mysql_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
  die('Could not connect: ' . mysql_error());
}
 echo("Your information has been successfully added to the database."); 
 mysql_select_db("sounds") or die(mysql_error()); 
 mysql_query("INSERT INTO 'data' VALUES ('$name', '$email', '$location')"); 
 echo("Your information has been successfully added to the database."); 
 mysql_close($conn);
?>

