import  borrowRepo from "../repositories/borrowRepo.js"

export const getBooksByUserIdService = async (userId) => {
  return await borrowRepo.getBooksByUserIdRepo(userId);
};

// ---- Find all users who borrowed a specific book ----
export const getUsersByBookIdService = async (bookId) => {
  return await borrowRepo.getUsersByBookIdRepo(bookId);
};

// ---- Add a borrowing record ----
export const addBorrowingService = async (userId, bookId) => {
  return await borrowRepo.addBorrowingRepo(userId, bookId);
};
