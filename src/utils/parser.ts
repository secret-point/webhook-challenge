function constructMessageFromGrid(grid: {
  [key: number]: { [key: number]: string };
}): string {
  const rows = Object.keys(grid)
    .map(Number)
    .sort((a, b) => a - b);
  let message = '';

  rows.forEach(row => {
    const columns = Object.keys(grid[row])
      .map(Number)
      .sort((a, b) => a - b);
    columns.forEach(column => {
      message += grid[row][column];
    });
    message += ' ';
  });

  return message.trim();
}

export function parsePayload(data: string): { secret: string } {
  const lines = data.split('\n');
  const grid: { [key: string]: { [key: string]: string } } = {};

  lines.forEach(line => {
    const [position, char] = line.split(': ');
    const [rowStr, colStr] = position.split(' ');
    if(rowStr && colStr) {
      let [, rowNum] = rowStr.split('=');
      let [, column] = colStr.split('=');
      if (!grid[rowNum]) {
        grid[rowNum] = {};
      }
      grid[rowNum][column] = char;
    }

  });
  const secret = constructMessageFromGrid(grid);
  return { secret };
}
