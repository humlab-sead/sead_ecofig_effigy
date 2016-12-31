<?php

$fp = fopen("Extinct_environments_Grapher.txt", "r");
$data = fgets($fp); //intentionally skipping first row

$header = explode("\t", $data);


$features = array();
$i = 0;
while($data = fgets($fp)) {

	$row = explode("\t", $data);

	$feature = array(
		"type" => "Feature",
		"geometry" => array(
			"type" => "Point",
			"coordinates" => array(
				floatval(str_replace(",", ".", $row[3])),
				floatval(str_replace(",", ".", $row[2]))
				)
			),
		"properties" => array(
			"name" => $row[1],
			"sumRep" => trim($row[23])
			)
		);

	$fieldCount = 0;
	foreach($header as $fieldName) {
		if($fieldCount > 3 && $fieldCount < 23) {
			$feature["properties"]["environmentalIndicators"][$fieldName] = $row[$fieldCount];
		}
		$fieldCount++;
	}

	$features []= $feature;

	$i++;
}


$struct = array(
	"type" => "FeatureCollection",
	"features" => $features
	);

print_r(json_encode($struct, JSON_PRETTY_PRINT));

?>