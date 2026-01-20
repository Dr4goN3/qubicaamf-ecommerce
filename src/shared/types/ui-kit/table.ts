export type TableRow = Record<string, unknown>

export interface TableColumn<T = TableRow> {
  key: keyof T & string
  label: string
  formatter?: (row: T) => string | number
}

export type TableRowKey<T = TableRow> =
  | (keyof T & string)
  | ((row: T, index: number) => string | number)

export interface TableProps<T = TableRow> {
  columns: TableColumn<T>[]
  data: T[]
  clickable?: boolean
  rowKey?: TableRowKey<T>
}
