import {addBorrowingService,getBookHistoryByBookIdService,getBooksByUserIdService,getUsersByBookIdService, returnBorrowingService
  ,getAllBorrowingsWithDetailsService,getActiveBorrowingsWithDetailsService,getUsersBorrowCountService,getUserBorrowingsService} from "../services/borrowService.js";

// ---- create a new borrowing record ----
export const addBookBorrowing = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ message: "userId and bookId are required" });
    }

    await addBorrowingService(userId, bookId);
    res.status(201).json({ message: "Borrowing record created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create borrowing record", error: error.message });
  }
};

// ---- find all books borrowed by a user ----
export const getBooksByUserId = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const books = await getBooksByUserIdService(userId);

    if (!books.length) {
      return res.status(404).json({ message: "No borrowed books found for this user" });
    }

    res.status(200).json({ message: `${books.length} borrowed book(s) fetched successfully`, data: books });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch borrowed books", error: error.message });
  }
};

// ---- find all users who borrowed a book ----
export const getUsersByBookId = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const users = await getUsersByBookIdService(bookId);

    if (!users.length) {
      return res.status(404).json({ message: "No users found who borrowed this book" });
    }

    res.status(200).json({ message: `${users.length} user(s) fetched successfully`, data: users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch borrowers", error: error.message });
  }
};

// ---- return a borrowed book ----
export const returnBookBorrowing = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ message: "userId and bookId are required" });
    }

    await returnBorrowingService(userId, bookId);
    res.status(201).json({ message: "Borrowing record returned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to return borrowing record", error: error.message });
  }
};

// ---- return borrowing history of a specific book ----
export const getBookHistoryByBookId = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json({ message: "bookId is required" });
    }

    const booksHistory = await getBookHistoryByBookIdService(bookId);
    if (!booksHistory.length) {
      return res.status(404).json({ message: "No user borrowed this book" });
    }

    res.status(200).json({ message: `${booksHistory.length} record(s) fetched successfully`, data: booksHistory });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch borrowers", error: error.message });
  }
};

// ---- return all borrowed history with details ----
export const getAllBorrowingsWithDetails = async (req, res) => {
  try {
    const AllBorrowings = await getAllBorrowingsWithDetailsService();
    if (!AllBorrowings.length) {
      return res.status(404).json({ message: "No user borrowed books" });
    }

    res.status(200).json({ message: `${AllBorrowings.length} borrowing record(s) fetched successfully`, data: AllBorrowings });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all borrows with details", error: error.message });
  }
};

// ---- return all active borrowed history with details ----
export const getActiveBorrowingsWithDetails = async (req, res) => {
  try {
    const AllActiveBorrowings = await getActiveBorrowingsWithDetailsService();
    if (!AllActiveBorrowings.length) {
      return res.status(404).json({ message: "No active borrowed books" });
    }

    res.status(200).json({ message: `${AllActiveBorrowings.length} active borrowing record(s) fetched successfully`, data: AllActiveBorrowings });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all active borrows with details", error: error.message });
  }
};

// ---- return count of users borrowed books ----
export const getUsersBorrowCount = async (req, res) => {
  try {
    const userBookCount = await getUsersBorrowCountService();
    if (!userBookCount.length) {
      return res.status(404).json({ message: "No user borrowed books" });
    }

    res.status(200).json({ message: `${userBookCount.length} user(s) borrow count fetched successfully`, data: userBookCount });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch count of users borrowed books", error: error.message });
  }
};

// ---- return borrowings history for a specific user ----
export const getUserBorrowingsHistory = async (req, res) => {
  try {
    const userId = req.params.id ?? req.user.id;
    const borrowings = await getUserBorrowingsService(userId);

    res.status(200).json({
      message: `${borrowings.length} borrowing record(s) fetched successfully`,
      success: true,
      data: borrowings,
    });
  } catch (error) {
    console.error("Error fetching user borrowings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user borrowings",
    });
  }
};
