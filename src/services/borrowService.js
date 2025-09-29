import  borrowRepo from "../repositories/borrowRepo.js"


// ---- Add a borrowing record ----
export const addBorrowingService = async (userId, bookId) => {
  return await borrowRepo.addBorrowingRepo(userId, bookId);
};
export const getBooksByUserIdService = async (userId) => {
  return await borrowRepo.getBooksByUserIdRepo(userId);
};

// ---- Find all users who borrowed a specific book ----
export const getUsersByBookIdService = async (bookId) => {
  return await borrowRepo.getUsersByBookIdRepo(bookId);
};
// ---- return a borrowing record ----
export const returnBorrowingService = async (userId, bookId) => {
  return await borrowRepo.returnBorrowingRepo(userId, bookId);
};

// ---- return a borrowing record ----
export const getBookHistoryByBookIdService = async ( bookId) => {
  return await borrowRepo.getBorrowedBookWithDetailsRepo(bookId);
};


// ---- return  All borrowing History record ----
export const getAllBorrowingsWithDetailsService = async () => {
  return await borrowRepo.getAllBorrowingsWithDetailsRepo();
};


// ---- return  All active borrowing History record ----
export const getActiveBorrowingsWithDetailsService = async () => {
  return await borrowRepo.getActiveBorrowingsWithDetailsRepo();
};

// ---- return a count user borrowers record ----
export const getUsersBorrowCountService = async () => {
  return await borrowRepo.getUsersBorrowedBooksWithIsbnRepo();
};

// ---- return all borrowings with user and book details for a specific user ----
export const getUserBorrowingsService = async (userId) => {
  return await borrowRepo.getUserBorrowingsWithDetailsRepo(userId);
};

