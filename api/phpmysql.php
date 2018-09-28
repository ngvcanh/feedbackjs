<?php

$CONFIG = [];

$CONFIG['HEADER_SERECT_KEY'] = true;
$CONFIG['DEFAULT_SERECT_KEY'] = 'ge2wJZfY9U9XMex7WDKbN6wzakoHrK01';

$CONFIG['HEADER_API_KEY'] = true;
$CONFIG['DEFAULT_API_KEY'] = 'B8f1bAz419fvqGtDOW853eAI';

$CONFIG['ACCEPT_IP_ADDRESS'] = [];
$CONFIG['ACCEPT_HOST_NAME'] = [];

$CONFIG['ATTACH_DIR'] = '/upload';
$CONFIG['ATTACH_EXTENSION'] = ['jpg', 'png', 'bmp', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf'];
$CONFIG['ATTACH_MAX_SIZE'] = 2000000;
$CONFIG['ATTACH_TYPE'] = [];

$CONFIG['DB_HOST'] = 'localhost';
$CONFIG['DB_PORT'] = 3306;
$CONFIG['DB_USER'] = 'root';
$CONFIG['DB_PASS'] = 'MrK3n1989';
$CONFIG['DB_DATA'] = 'demo_feedback';
$CONFIG['DB_TABLE'] = 'feedback';
$CONFIG['DB_PREFIX'] = '';
$CONFIG['DB_CHARSET'] = 'utf8mb4';

class DBStore{

    private $_connect = null;

    private $_error = null;

    private $_message = null;

    private $_result = null;

    private $_column = [];

    function __construct(){
        $this->_props = (object)$this->_props;
        $this->_connection();
    }

    private function _connection(){
        $this->_connect = new MySQLi($this->host, $this->user, $this->pass, null, $this->port);
        $this->_connect->select_db($this->data);
        $this->_connect->set_charset($this->charset);
        $this->_error = $this->_connect->error | $this->_connect->error;
        if ($this->_error) $this->_connect = null;
        $this->_getColumns();
    }

    public function table(){
        global $CONFIG;
        return "{$CONFIG['DB_PREFIX']}{$CONFIG['DB_TABLE']}";
    }

    private function query(String $sql){
        if ($this->_connect){
            $this->_result = $this->_connect->query($sql);
            if ($this->_error = $this->_connect->error) $this->_result = null;
        }
        return $this;
    }

    private function _getColumns(){
        $this->query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '{$this->data}' AND TABLE_NAME = '{$this->table()}'");
        while($row = $this->fetch()) $this->_column[] = $row->COLUMN_NAME;
    }

    public function getColumns(){
        return $this->_column;
    }

    public function fetch(){
        return $this->_result ? $this->_result->fetch_object() : null;
    }

    public function __get($prop){
        global $CONFIG;
        $prop = 'DB_' . strtoupper($prop);
        return isset($CONFIG[$prop]) ? $CONFIG[$prop] : null;
    }

    public function encode($value){
        return $this->_connect ? $this->_connect->real_escape_string($value) : $value;
    }

    public function addRecord(Array $param){
        $columns = join(array_keys($param), '`,`');
        $values = array_map(function($value){
            return $this->encode($value);
        }, $param);
        $values = join($values, "','");

        $sql = "INSERT INTO {$this->table()}(`{$columns}`) VALUES('{$values}');";
        return $this->query($sql)->_error;
    }

}

function set_response($err = null, $data = null){
    return (object)['error' => $err, 'data' => $data];
}

function get_http_header($name){
    $name = 'HTTP_' . strtoupper($name);
    return isset($_SERVER[$name]) ? $_SERVER[$name] : null;
}

function validateHeader(){
    global $CONFIG;
    $flag = true;

    if (isset($CONFIG['HEADER_SERECT_KEY']) && true === $CONFIG['HEADER_SERECT_KEY']){
        $clientHeader = get_http_header('s');
        $configHeader = $CONFIG['DEFAULT_SERECT_KEY'];
        $flag = !strcmp($clientHeader, $configHeader);
    }

    if (isset($CONFIG['HEADER_API_KEY']) && true === $CONFIG['HEADER_API_KEY']){
        $clientHeader = get_http_header('a');
        $configHeader = $CONFIG['DEFAULT_API_KEY'];
        $flag = ($flag && !strcmp($clientHeader, $configHeader));
    }

    return $flag;
}

function validateParameters($post){
    if(!empty($post)){
        $fields = ['funcs', 'links', 'username', 'description'];
        $flag = $hasData = false;

        foreach($fields as $name){
            if (isset($post[$name])){
                $flag = true;
                $hasData = !!strlen($post[$name]);
                if ($hasData) break;
            }
        }

        return $flag && $hasData;
    }

    return false;
}

function initFiles($files){
    $file = [];
    $names = $files['name'];

    if (is_array($names)){
        foreach($names as $pos => $name){
            $file[] = [
                'name' => $name,
                'type' => $files['type'][$pos],
                'tmp_name' => $files['tmp_name'][$pos],
                'error' => $files['error'][$pos],
                'size' => $files['size'][$pos]
            ];
        }
    }
    else $file[] = $files;

    return $file;
}

function validateFile($file){
    global $CONFIG;

    if (isset($CONFIG['ATTACH_EXTENSION'])){
        $extension = $CONFIG['ATTACH_EXTENSION'];

        if (is_array($extension) && !empty($extension)){
            $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            if (!in_array($ext, $extension)) return !1;
        }
    }

    if (isset($CONFIG['ATTACH_MAX_SIZE'])){
        $maxSize = $CONFIG['ATTACH_MAX_SIZE'];
        if (is_numeric($maxSize) && $file['size'] !== $maxSize) return !1;
    }

    if (isset($CONFIG['ATTACH_TYPE'])){
        $types = $CONFIG['ATTACH_TYPE'];

        if (is_array($types) && !empty($types)){
            if (!in_array($file['type'], $types)) return !1;
        }
    }

    return !0;
}

function uploadFile($file, $dir){
    if (!is_dir($dir)) mkdir($dir, 755, true);
    $fileName = $file['name'];

    $ext = pathinfo($fileName, PATHINFO_EXTENSION);
    $name = preg_replace("/\.{$ext}$/", $fileName);
    
    $path = "{$dir}/{$fileName}";
    $i = 1;

    while(file_exists($path)){
        $fileName = "{$name}({$i}){$ext}";
        $path = "{$dir}/{$fileName}";
        $i++;
    }

    if (@move_uploaded_file($path)) return $path;
    return null;
}

$code = 403;
$message = 'Request refused.';
$data = null;

try{
    if (validateHeader()){
        $db = new DBStore();
        $post = array_intersect_key($_POST, array_flip($db->getColumns()));
        $message = 'Request invalid.';

        if (validateParameters($post)){
            $uploaded = [];

            if (isset($_FILES['attach'])){
                $files = initFiles($_FILES['attach']);
                
                $uploadDir = isset($CONFIG['UPLOAD_DIR']) ? $CONFIG['UPLOAD_DIR'] : './';

                foreach($files as $file){
                    if (validateFile($file)){
                        $path = uploadFile($file);
                        if ($path) $uploaded[] = $path;
                    }
                }
            }

            $post['attach'] = json_encode($uploaded);
            $message = $db->addRecord($post);

            if (!$message){
                $code = 200;
                $message = 'Feedback success.';
                $data = 'Feedback success.';
            }
        }
    }
}
catch(Exception $err){
    $code = 500;
    $message = $err->message;
}

if ($code == 200) $response = set_response(null, $data);
else $response = set_response(['code' => $code, 'message' => $message]);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
header("HTTP/1.0 {$code}");
echo json_encode($response);