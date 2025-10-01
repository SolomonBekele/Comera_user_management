import {
  addBorrowingService,
  getBookHistoryByBookIdService,
  getBooksByUserIdService,
  getUsersByBookIdService,
  returnBorrowingService,
  getAllBorrowingsWithDetailsService,
  getActiveBorrowingsWithDetailsService,
  getUsersBorrowCountService,
  getUserBorrowingsService,
  getBooksBorrowedOnDateService
} from "../services/borrowService.js";
import logger from "../utils/logger.js";

// ==================== ADD BORROWING ====================
export const addBookBorrowing = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      logger.warn(`Borrowing creation failed: Missing userId or bookId`);
      return res.status(400).json({ message: "userId and bookId are required" });
    }

    await addBorrowingService(userId, bookId);
    logger.info(`Borrowing record created: userId=${userId}, bookId=${bookId}`);
    res.status(201).json({ message: "Borrowing record created successfully" });
  } catch (error) {
    logger.error(`Failed to create borrowing record: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: "Failed to create borrowing record", error: error.message });
  }
};

// ==================== GET BOOKS BY USER ====================
export const getBooksByUserId = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const books = await getBooksByUserIdService(userId);

    if (!books.length) {
      logger.warn(`No borrowed books found for userId=${userId}`);
      return res.status(404).json({ message: "No borrowed books found for this user" });
    }

    logger.info(`Fetched ${books.length} borrowed book(s) for userId=${userId}`);
    res.status(200).json({ message: `${books.length} borrowed book(s) fetched successfully`, data: books });
  } catch (error) {
    logger.error(`Failed to fetch borrowed books for userId=${req.params.id}: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: "Failed to fetch borrowed books", error: error.message });
  }
};

// ==================== GET USERS BY BOOK ====================
export const getUsersByBookId = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const users = await getUsersByBookIdService(bookId);

    if (!users.length) {
      logger.warn(`No users found who borrowed bookId=${bookId}`);
      return res.status(404).json({ message: "No users found who borrowed this book" });
    }

    logger.info(`Fetched ${users.length} user(s) for bookId=${bookId}`);
    res.status(200).json({ message: `${users.length} user(s) fetched successfully`, data: users });
  } catch (error) {
    logger.error(`Failed to fetch users for bookId=${req.params.id}: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: "Failed to fetch borrowers", error: error.message });
  }
};

// ==================== RETURN BORROWED BOOK ====================
export const returnBookBorrowing = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      logger.warn(`Return failed: Missing userId or bookId`);
      return res.status(400).json({ message: "userId and bookId are required" });
    }

    await returnBorrowingService(userId, bookId);
    logger.info(`Borrowing record returned: userId=${userId}, bookId=${bookId}`);
    res.status(201).json({ message: "Borrowing record returned successfully" });
  } catch (error) {
    logger.error(`Failed to return borrowing record: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: "Failed to return borrowing record", error: error.message });
  }
};

// ==================== GET BOOK HISTORY ====================
export const getBookHistoryByBookId = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      logger.warn("Book history fetch failed: Missing bookId");
      return res.status(400).json({ message: "bookId is required" });
    }

    const booksHistory = await getBookHistoryByBookIdService(bookId);
    if (!booksHistory.length) {
      logger.warn(`No user borrowed bookId=${bookId}`);
      return res.status(404).json({ message: "No user borrowed this book" });
    }

    logger.info(`Fetched ${booksHistory.length} borrowing record(s) for bookId=${bookId}`);
    res.status(200).json({ message: `${booksHistory.length} record(s) fetched successfully`, data: booksHistory });
  } catch (error) {
    logger.error(`Failed to fetch book history for bookId=${req.params.id}: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: "Failed to fetch borrowers", error: error.message });
  }
};

// ==================== GET ALL BORROWINGS WITH DETAILS ====================
export const getAllBorrowingsWithDetails = async (req, res) => {
  try {
    const allBorrowings = await getAllBorrowingsWithDetailsService();
    if (!allBorrowings.length) {
      logger.warn("No borrowings found for all users");
      return res.status(404).json({ message: "No user borrowed books" });
    }

    logger.info(`Fetched ${allBorrowings.length} total borrowing record(s)`);
    res.status(200).json({ message: `${allBorrowings.length} borrowing record(s) fetched successfully`, data: allBorrowings });
  } catch (error) {
    logger.error(`Failed to fetch all borrowings with details: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: "Failed to fetch all borrows with details", error: error.message });
  }
};

// ==================== GET ACTIVE BORROWINGS WITH DETAILS ====================
export const getActiveBorrowingsWithDetails = async (req, res) => {
  try {
    const activeBorrowings = await getActiveBorrowingsWithDetailsService();
    if (!activeBorrowings.length) {
      logger.warn("No active borrowings found");
      return res.status(404).json({ message: "No active borrowed books" });
    }

    logger.info(`Fetched ${activeBorrowings.length} active borrowing record(s)`);
    res.status(200).json({ message: `${activeBorrowings.length} active borrowing record(s) fetched successfully`, data: activeBorrowings });
  } catch (error) {
    logger.error(`Failed to fetch active borrowings: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: "Failed to fetch all active borrows with details", error: error.message });
  }
};

// ==================== GET USERS BORROW COUNT ====================
export const getUsersBorrowCount = async (req, res) => {
  try {
    const userBookCount = await getUsersBorrowCountService();
    if (!userBookCount.length) {
      logger.warn("No users borrow count found");
      return res.status(404).json({ message: "No user borrowed books" });
    }

    logger.info(`Fetched borrow count for ${userBookCount.length} user(s)`);
    res.status(200).json({ message: `${userBookCount.length} user(s) borrow count fetched successfully`, data: userBookCount });
  } catch (error) {
    logger.error(`Failed to fetch users borrow count: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: "Failed to fetch count of users borrowed books", error: error.message });
  }
};

// ==================== GET USER BORROWINGS HISTORY ====================
export const getUserBorrowingsHistory = async (req, res) => {
  try {
    const userId = req.params.id ?? req.user.id;
    const borrowings = await getUserBorrowingsService(userId);

    logger.info(`Fetched ${borrowings.length} borrowing record(s) for userId=${userId}`);
    res.status(200).json({
      message: `${borrowings.length} borrowing record(s) fetched successfully`,
      success: true,
      data: borrowings,
    });
  } catch (error) {
    logger.error(`Error fetching user borrowings for userId=${req.params.id}: ${error.message}`, { stack: error.stack });
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user borrowings",
    });
  }
};

// ==================== GET BOOKS BORROWED ON DATE ====================
export const getBooksBorrowedOnDate = async (req, res) => {
  try {
    const { date } = req.query; // date from query param e.g., /books/borrowed?date=2025-09-29
    if (!date) {
      logger.warn("Books borrowed on date fetch failed: Missing date");
      return res.status(400).json({ message: "Date is required" });
    }

    const books = await getBooksBorrowedOnDateService(date);

    if (!books.length) {
      logger.warn(`No books borrowed on ${date}`);
      return res.status(404).json({ message: `No books borrowed on ${date}` });
    }

    logger.info(`Fetched ${books.length} book(s) borrowed on ${date}`);
    res.status(200).json({
      message: `Books borrowed on ${date}: ${books.length}`,
      data: books,
    });
  } catch (error) {
    logger.error(`Failed to fetch books borrowed on ${req.query.date}: ${error.message}`, { stack: error.stack });
    res.status(500).json({
      message: "Failed to fetch books borrowed on specific date",
      error: error.message,
    });
  }
};
