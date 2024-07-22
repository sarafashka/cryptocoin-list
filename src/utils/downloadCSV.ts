export const downloadCSV = <T extends object>(
  data: T[],
  filename: string
): void => {
  const csvRows: string[] = [];
  const headers = Object.keys(data[0] as T);
  csvRows.push(headers.join(','));

  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ('' + row[header as keyof T]).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  const csvString = csvRows.join('\n');

  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const downloadLink = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);

    if (typeof link.download === 'undefined') {
      window.location.href = url;
    } else {
      link.click();
    }
    URL.revokeObjectURL(url);
  };

  downloadLink(url, filename);
};
