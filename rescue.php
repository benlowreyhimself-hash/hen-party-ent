<?php
// rescue.php - Zip uploads and dump DB

$uploadsDir = '/home/benlowre/public_html/wp-content/uploads';
$zipFile = '/home/benlowre/public_html/ben_rescue.zip';
$dbFile = '/home/benlowre/public_html/ben_db.sql';

// 1. Dump Database
$dbCmd = "mysqldump -u benlowre_ben -pq~D[PZz4_@\$u benlowre_benlowrey > $dbFile";
exec($dbCmd, $output, $return);
echo "Database Dump: " . ($return === 0 ? "OK" : "FAIL") . "\n";

// 2. Zip Uploads + DB
$zipCmd = "zip -r $zipFile $uploadsDir $dbFile";
exec($zipCmd, $output2, $return2);
echo "Zip Creation: " . ($return2 === 0 ? "OK" : "FAIL") . "\n";

if ($return2 === 0) {
    echo "Download URL: http://pikkon-lon.krystal.uk/~benlowre/ben_rescue.zip\n";
}
?>
