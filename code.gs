function doGet() {
  // Serve the HTML file
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('My Sample Web App')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME); // Sandboxing for security
}

// Function to get last 100 row data
function getRowsData() {
  var RowCount = 100;
  var sheet = SpreadsheetApp.openById('1MTxhSLgKFs0SPrRfBOqCT05WOk4JJ7E_AYLcAfgoJNE').getSheetByName('表單回應 1');
  var lastRow = sheet.getLastRow();
  //Logger.log(lastRow);
  var numRows = RowCount;
  if (lastRow - numRows < 1) { 
    numRows = RowCount - lastRow - 1;
  }
  var startRow = lastRow - numRows;
  Logger.log("%d %d", startRow, numRows);
  // Syntax: getRange(startRow, startCol, numRows, numCols)
  var rowsData = sheet.getRange(startRow, 1, numRows + 1, sheet.getLastColumn()).getValues();
  Logger.log(rowsData);
  return rowsData;
}

function setRowData(aNewRow) {
  var sheet = SpreadsheetApp.openById('1MTxhSLgKFs0SPrRfBOqCT05WOk4JJ7E_AYLcAfgoJNE').getSheetByName('表單回應 1');
  var lastRow = sheet.getLastRow();

  // Write the row data to the next available row
  sheet.getRange(lastRow + 1, 1, 1, aNewRow.length).setValues([aNewRow]);
}