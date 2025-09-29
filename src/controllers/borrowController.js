import {addBorrowingService,getBookHistoryByBookIdService,getBooksByUserIdService,getUsersByBookIdService, returnBorrowingService,getAllBorrowingsWithDetailsService,getActiveBorrowingsWithDetailsService} from "../services/borrowService.js";

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

// ---- Find all books borrowed by a user ----
export const getBooksByUserId = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const books = await getBooksByUserIdService(userId);

    if (!books.length) {
      return res.status(404).json({ message: "No borrowed books found for this user" });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch borrowed books", error: error.message });
  }
};

// ---- Find all users who borrowed a book ----
export const getUsersByBookId = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const users = await getUsersByBookIdService(bookId);

    if (!users.length) {
      return res.status(404).json({ message: "No users found who borrowed this book" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch borrowers", error: error.message });
  }
};

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
// ---- return a Book history record ----
export const getBookHistoryByBookId = async ( req,res) => {
  try {
    const  bookId  = req.params.id;

    if ( !bookId) {
      return res.status(400).json({ message: "bookId are required" });
    }
    const booksHistory = await getBookHistoryByBookIdService();
    if (!booksHistory.length) {
      return res.status(404).json({ message: "No user borrowed  this book" });
    }

    res.status(200).json(booksHistory);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch borrowers", error: error.message });
  }
};
// ---- return all borrowed history with details record ----
export const getAllBorrowingsWithDetails = async ( req,res) => {
  try {
    const AllBorrowings = await getAllBorrowingsWithDetailsService();
    if (!AllBorrowings.length) {
      return res.status(404).json({ message: "No user borrowed books" });
    }

    res.status(200).json(AllBorrowings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch All borrows with details", error: error.message });
  }
};

// ---- return all Active borrowed history with details record ----
export const getActiveBorrowingsWithDetails = async ( req,res) => {
  try {
    const AllActiveBorrowings = await getActiveBorrowingsWithDetailsService();
    if (!AllActiveBorrowings.length) {
      return res.status(404).json({ message: "No user borrowed active books" });
    }

    res.status(200).json(AllActiveBorrowings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch All active borrows with details", error: error.message });
  }
};