//Export2Excel.js
/* eslint-disable */
// require('script-loader!file-saver');
// require('./Blob.js');
// require('script-loader!xlsx/dist/xlsx.core.min');
/**
 * xlsx.utils.encode_row(row_index) 将基于 0 的索引转换为基于 1 的索引，之所以有这个方法是因为，程序里面下标都是从 0 开始计算，而 excel 软件却是从 1 开始计算。
 * xlsx.utils.decode_row(row) 与上个方法相反，将基于 1 的索引转换为基于 0 的索引
 * xlsx.utils.encode_col(col_index) 将基于 0 的索引转换为 ABCD 这种列；excel 表格软件中，- 列的表示是A, B, C, D，这个函数将 A, B, C, D 对应到 0, 1, 2, 3
 * xlsx.utils.decode_col(col) 与上个方法相反，将 ABCD 这种列索引转换为基于 0 的索引
 * xlsx.utils.encode_cell(object) 将一个行列对象转换为 A1 这种字符串
 * xlsx.utils.decode_cell(addr) 与上个方法相反，将 A1 这种字符串转换为一个行列对象
 * xlsx.utils.encode_range(obj) 将一个范围对象转换为 A1:G8 这种字符串
 * xlsx.utils.decode_range(addr) 与上个方法相反，将 A1:G8 这种字符串转换为行列对象
 * XLSX.write(workbook, options)生成excel数据
 */
import XLSX from 'xlsx';
import 'file-saver';
import './Blob.js'
function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan = cell.getAttribute('colspan');
      var rowspan = cell.getAttribute('rowspan');
      var cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        });
      };

      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      //Handle Colspan
      if (colspan)
        for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

/**
     * 以当前实例为例，
     * data=[
     * ["时间", "地址", "姓名"]
     *  ["2016-05-02", "上海市普陀区金沙江路 1518 弄", "王小虎"]
     *  ["2016-05-02", "上海市普陀区金沙江路 1518 弄", "王小虎"]
     *  ["2016-05-02", "上海市普陀区金沙江路 1518 弄", "王小虎"]
     * ]
     * 第一层循环遍历data数组，第二层循环遍历第二维数组
     */
function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };

  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {//r 行数量 c列数量
      if (range.s.r > R) range.s.r = R;//限制ranger.s.r的值，如果表格的行数量小于r，则r=表格的行数量
      if (range.s.c > C) range.s.c = C;//限制列宽
      if (range.e.r < R) range.e.r = R;//
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({//将一个行列对象转换为 A1 这种字符串
        c: C,
        r: R
      });
      // let decell = XLSX.utils.decode_cell(cell_ref)
      // console.log(decell)
      //判断值并标记值类型
      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';
      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  // console.log(ws)
  return ws;
}

/**
 * const workbook = {
  SheetNames: [          //工作表名数组
    'Sheet1', 'Sheet2', 'Sheet2',
  ],
  Sheets: {               //工作表对象
    Sheet1: {  //工作表1
      '!ref': 'A1:C2',         //工作表的范围 如 必须 否则不显示
      '!margins': [             //工作表单元格合并配置项 可选
        {
          s: { //s start 开始
            c: 1,//cols 开始列
            r: 0 //rows 开始行
          },
          e: {//e end  结束
            c: 4,//cols 结束列
            r: 0 //rows 结束行
          }
        }
      ],
      '!cols': [                //工作表列宽配置项 可选
        {
         // visibility 
          hidden? : boolean, // if true, the column is hidden
        //   column width is specified in one of the following ways: 
          wpx? : number, // width in screen pixels
          width? : number,  // width in Excel's "Max Digit Width", width*256 is integral
          wch? : number,  // width in characters
         //  other fields for preserving features from files
          MDW? : number,  // Excel's "Max Digit Width" unit, always integral
        }
      ],
      '!rows': [                //工作表列高配置项 可选
        {
         //  visibility 
          hidden? : boolean, // if true, the row is hidden
          row height is specified in one of the following ways: 
          hpx? : number,  // height in screen pixels
          hpt? : number,  // height in points
          level? : number,  // 0-indexed outline / group level
        }
      ],
    },
    Sheet2: {}, //工作表2
    Sheet3: {}  //工作表3
  }
}
 */
function Workbook() {
  //可以参考这篇文章 https://www.jianshu.com/p/5e1fce805210
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export function export_table_to_excel(id) {
  var theTable = document.getElementById(id);
  console.log('a')
  var oo = generateArray(theTable);
  var ranges = oo[1];

  /* original data */
  var data = oo[0];
  var ws_name = "SheetJS";
  console.log(data);

  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), "test.xlsx")
}

function formatJson(jsonData) {
  console.log(jsonData)
}
function merges(merges_arr) {//['A1:C4',B5:D6]
  let dec_code_arr = []
  for (let i = 0; i != merges_arr.length; i++) {
    dec_code_arr[i] = {
      's':XLSX.utils.decode_cell( merges_arr[i].split(":")[0]),
      'e': XLSX.utils.decode_cell( merges_arr[i].split(":")[1])
    }
  }
 return dec_code_arr
}
merges(['A1:C4', 'B5:D6'])

export function export_json_to_excel(th, jsonData, defaultTitle, merges_arg=[]) {

  /* original data */

  var data = jsonData;
  // console.log(...th)
  data.unshift(...th);
  // console.log(data)
  var ws_name = "SheetJS";

  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);//记录每个单元格数据的对象
    if(merges_arg.length){
      ws['!merges']=merges(merges_arg)
      // console.log(ws['!merges'])
    }
  // ws['!merges'] = [{
  //   s: { //s start 开始
  //     c: 1,//cols 开始列
  //     r: 0 //rows 开始行
  //   },
  //   e: {//e end  结束
  //     c: 4,//cols 结束列
  //     r: 0 //rows 结束行
  //   }
  // }]

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  var title = defaultTitle || '列表'
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), title + ".xlsx")
  console.log("这里的代码执行了")
};