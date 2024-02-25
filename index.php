<?php
$root = '/';
?>

<!doctype html>
<html>
	<head>
    <title>Burnsoft</title>
    <meta name="description" content="Test">
    <meta charset="UTF-8">
		<link href="<?php echo $root;?>/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <script src="<?php echo $root;?>/assets/jquery/jquery.min.js" type="text/javascript"></script>
		<script src="<?php echo $root;?>/assets/bootstrap/js/bootstrap.min.js" type="text/javascript"></script> 
    <script src="<?php echo $root;?>/assets/jso/dist/jso.js" type="text/javascript"></script>
	</head>
	<body>
    <style>
      .table-container {
        position: relative;
      }
      .table-container.load {
        opacity: .7;
      }
      .table-container .spinner-border {
        position: absolute;
        color: #fff;
        top: calc(50% - 42px);
        left: calc(50% - 42px);
        display: none;
      }
      .table-container.load .spinner-border {
        display: block;
      }
    </style>
    <div id="app">
    </div>
	</body>
  <script src="<?php echo $root;?>/assets/main.js" type="text/javascript"></script>
</html>