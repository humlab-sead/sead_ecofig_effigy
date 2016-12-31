<?php


$fp = fopen("data2.tsv", "r");

$lngPos = 2;
$latPos = 1;

$siteNamePos = 3;

$environmentsStartPos = 6;
$environmentsEndPos = 26;

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
				floatval(str_replace(",", ".", $row[$lngPos])),
				floatval(str_replace(",", ".", $row[$latPos]))
				)
			),
		"properties" => array(
			"name" => $row[$siteNamePos]
			)
		);

	$fieldCount = 0;
	foreach($header as $fieldName) {
		if($fieldCount >= $environmentsStartPos && $fieldCount <= $environmentsEndPos) {
			$feature["properties"]["environmentalIndicators"][$fieldName] = strval(floatval($row[$fieldCount]));
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