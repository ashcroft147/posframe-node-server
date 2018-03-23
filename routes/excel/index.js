const express = require('express');
const router = express.Router();
const fs = require('fs');
const Excel = require('exceljs');
const workbook = new Excel.Workbook();
var path = require('path');
const filepath = path.join(__dirname, '../../public/xlsx/original.xlsx');

router.get('/', function(req, res, next) {
    console.log('excel page !!');

    // 1. read file
    workbook.xlsx.readFile(filepath).then(() => {
        console.log('Success to read file');

        // 2. read work sheet
        var worksheet = workbook.getWorksheet('input');
        console.log(worksheet.name);

        // 3. check whther to add new sheet to the original file
        var resultsheet = workbook.getWorksheet('result');
        if(resultsheet === undefined) {
            
            resultsheet = workbook.addWorksheet('result');
            console.log("Add new sheet " + resultsheet + " !!");
        }
        else {
            console.log("result worksheet is already exsist !!");
        }
        
        var resultrow = [];
        var resultrows = [];
        var key = "";
        var value ="";
        // 3. read header or row
        // var seq = worksheet.getColumn('SEQ');
        // console.log(worksheet.actualRowCount);
        // console.log(worksheet.actualColumnCount);
        // 4.  iterate over all rows that have values in a worksheet
        worksheet.eachRow((row, rowNumber) => {
            //console.log('Row' + rowNumber + ' = ' + JSON.stringify(row.values));
            row.eachCell((cell, colNumber) => {
                if(colNumber == 1) {

                }
                else if(colNumber == 2) {
                    key = cell.value;
                    
                }
                else {
                    value = cell.value;
                    resultrow[0] = key;
                    resultrow[1] = value;
                    resultrows.push(resultrow);
                }
                console.log(resultrow[0] + "," + resultrow[1]);
            });

            // add row to rows
            
        });
        console.log(resultrows.length);
        resultsheet.addRows(resultrows);
    }, (reason) => {
        console.log(reason);
    }).then(() => {
        return workbook.xlsx.writeFile(filepath + '_result.xlsx');
    }).then(() => {
        console.log("Write is done !!")
    })

    // json 
    /*
    [
        {
            "seq" : 1,
            "name" : "후판생산량 상세",
            "value" : [1,2,3,4,5,6,7]
        },
        {}
    ]


    */

    res.status(200).render('excel', {message: 'success'});
});


module.exports = router;