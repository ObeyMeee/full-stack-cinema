import { Injectable } from '@angular/core';
import FileSaver from 'file-saver';
import * as xlsx from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelSaver {
  private readonly EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private readonly EXCEL_EXTENSION = '.xlsx';

  save(data: any[], fileName: string) {
    const excelBuffer = this.prepareExcelBuffer(data);
    const dataBlob = new Blob([excelBuffer], {
      type: this.EXCEL_TYPE,
    });
    FileSaver.saveAs(
      dataBlob,
      `${fileName}_export_${new Date().getTime()}${this.EXCEL_EXTENSION}`,
      { autoBom: false },
    );
  }

  private prepareExcelBuffer(data: any) {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    return xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
  }
}
