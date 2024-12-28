import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

export class CsvWriter {
    constructor(filename) {
        this.writer = createCsvWriter({
            path: filename,
            header: [
                { id: 'name', title: 'Product Name' },
                { id: 'price', title: 'Price' },
                { id: 'rating', title: 'Rating' },
                { id: 'url', title: 'URL' }
            ]
        });
    }

    async writeRecords(records) {
        await this.writer.writeRecords(records);
    }
}