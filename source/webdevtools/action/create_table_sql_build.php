<?php
$sqlFactory = new SqlFactory();
$finalSql = $sqlFactory->executeGenerate();
echo $finalSql;
return;

class SqlFactory
{
    private $_tableName;

    private $_tableComment;

    private $_tableHeader;

    private $_tableFooter;

    private $_keySql = array();

    private $_fieldSql = array();

    public function executeGenerate()
    {
        $sqlFormatExcel = $_POST['excelSource'];

        $data = explode("\n", $sqlFormatExcel);

        $rowArr = array();
        foreach($data as $eachRow)
        {
            $rowArr[] = explode("\t", $eachRow);
        }
        $finalSql = $this->entry($rowArr);
        return $finalSql;
    }

    /**
     * 程序入口
     *
     * @param $excelFormatArray
     * @return String
     */
    public function entry($excelFormatArray)
    {
        foreach($excelFormatArray as $index => $eachExcelRow)
        {
            if($index == 0){
                $this->_tableComment = $eachExcelRow[0];
            }
            if($index == 1){
                $this->_tableName = $eachExcelRow[0];
            }
            if($index >= 3){
                $formatFieldData = $this->formatFieldData($eachExcelRow);
                $this->buildFieldSql($formatFieldData);
            }
        }
        $this->buildTableHeader($this->_tableName);
        $this->buildTableFooter('InnoDB', 'utf8', $this->_tableComment);
        return $this->buildAll();
    }

    /**
     * @param $srcArrayData
     * @return array
     */
    public function formatFieldData($srcArrayData)
    {
        $tgtArrayData = array(
            'FIELD_NAME' => $srcArrayData[0],
            'DATA_TYPE' => $srcArrayData[1],
            'LENGTH' => $srcArrayData[2],
            'KEY_TYPE' => $srcArrayData[3],
            'NOT_NULL' => $srcArrayData[4],
            'DEFAULT_VALUE' => $srcArrayData[5],
            'COMMENT' => $srcArrayData[6],
        );
        return $tgtArrayData;
    }

    /**
     * @param $format
     * Keys Contains:
     * FIELD_NAME,DATA_TYPE,LENGTH,KEY_TYPE,NOT_NULL,DEFAULT_VALUE,COMMENT
     */
    public function buildFieldSql($format)
    {
        $fieldSQL = '';
        if(!empty($format['FIELD_NAME'])){
            $fieldSQL .= "`" . $format['FIELD_NAME'] . "` ";
        }
        if(!empty($format['DATA_TYPE'])){
            $fieldSQL .= $format['DATA_TYPE'];
            if(!empty($format['LENGTH'])){
                $fieldSQL .= "(" . $format['LENGTH'] . ")";
            }
            $fieldSQL .= " ";
        }
        if(!empty($format['KEY_TYPE'])){
            switch($format['KEY_TYPE'])
            {
                case 'PRIMARY_KEY':
                    $this->_keySql[] = "PRIMARY KEY (`" . $format['FIELD_NAME'] . "`)";
                    break;
                case 'UNIQUE_KEY':
                    $this->_keySql[] = "UNIQUE KEY " . "`" . $format['FIELD_NAME'] . "`" . "(`" . $format['FIELD_NAME'] . "`)";
                    break;
                case 'KEY':
                    $this->_keySql[] = "KEY " . "`" . $format['FIELD_NAME'] . "`" . "(`" . $format['FIELD_NAME'] . "`)";
                    break;
                default:
                    break;
            }
        }
        if(!empty($format['NOT_NULL'])){
            $fieldSQL .= ($format['NOT_NULL'] == "Y" ? "NOT NULL" : "") . " ";
        }
        if(!empty($format['DEFAULT_VALUE'])){
            $fieldSQL .= "DEFAULT '" . $format['DEFAULT_VALUE'] . "' ";
        }
        if(!empty($format['COMMENT'])){
            $fieldSQL .= "COMMENT '" . mysql_escape_string($format['COMMENT']) . "' ";
        }
        $this->_fieldSql[] = $fieldSQL;
    }

    /**
     * @param $tableName
     */
    public function buildTableHeader($tableName)
    {
        $this->_tableHeader = "CREATE TABLE `" . $tableName . "`(";
    }

    /**
     * @param $engine
     * @param $charset
     * @param $comment
     */
    public function buildTableFooter($engine, $charset, $comment)
    {
        $this->_tableFooter = ") ENGINE=".$engine." DEFAULT CHARSET=".$charset." COMMENT='" . $comment . "';";
    }

    /**
     * @return string
     */
    public function buildAll()
    {
        $finalSql = '';
        $finalSql .= $this->_tableHeader ."\n";
        $finalSql .= implode(",\n", array_merge($this->_fieldSql, $this->_keySql)) . "\n";
        $finalSql .= $this->_tableFooter . "\n";
        return $finalSql;
    }
}

