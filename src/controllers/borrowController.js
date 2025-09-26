import {addBorrowingService,getBooksByUserIdService,getUsersByBookIdService} from "../services/borrowService.js";


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


