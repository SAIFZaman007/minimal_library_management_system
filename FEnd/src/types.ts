export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBorrow {
  _id: string;
  bookId: string;
  quantity: number;
  dueDate: string;
  borrowDate: string;
}

export interface IBorrowSummary {
  bookTitle: string;
  isbn: string;
  totalQuantity: number;
}

export interface CreateBookDto {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
}

export interface UpdateBookDto extends Partial<CreateBookDto> {}

export interface CreateBorrowDto {
  bookId: string;
  quantity: number;
  dueDate: string;
}