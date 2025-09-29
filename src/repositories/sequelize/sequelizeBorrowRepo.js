import { Op } from "sequelize";
import {User ,Book,Borrowing} from "./db/models/borrowingModelSequelize.js";
import  UserModel  from "./db/models/userModelSequelize.js";
import  BookModel  from "./db/models/bookModelSequelize.js";

import sequelize from "./config/sequelize.js"; // your Sequelize instance


// ---- Add a borrowing record with transaction ----
export const addBorrowingRepo = async (userId, bookId) => {
  const t = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction: t });
    const book = await Book.findByPk(bookId, { transaction: t });

    if (!user || !book) {
      throw new Error("User or Book not found");
    }

    if (book.isBorrowed) {
      throw new Error("Book is already borrowed");
    }

    // Add borrowing record
    // const addBorrowedBook= await user.addBorrowedBook(book, {
    //   through: { borrow_date: new Date() },
    //   transaction: t,
    // });
    await Borrowing.create(
      {
        userId,
        bookId,
        borrowDate: new Date(),
        returnDate: null,
      },
      { transaction: t }
    );

    // Update book status
    await book.update({ isBorrowed: true }, { transaction: t });

    // Commit transaction
    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};


// ---- Find all users who borrowed a specific book ----
export const getUsersByBookIdRepo = async (bookId) => {
  const book = await BookModel.findByPk(bookId
    , {
    include: {
      model: UserModel,
      as: "borrowers", // must match the alias from association
    },
  }
);
// console.log(book.toJSON());
  return book ? book.borrowers : [];
};

// ---- get all books borrowed by a user ----
export const getBooksByUserIdRepo = async (userId) => {
  const user = await UserModel.findByPk(userId
    , {
    include: {
      model: BookModel,
      as: "borrowedBooks", 
    },
  }
);
//   console.log("uuYuuu",user.toJSON());
  return user ? user.borrowedBooks : [];
};


// ---- Return a borrowed book ----
export const returnBorrowingRepo = async (userId, bookId) => {
  const t = await sequelize.transaction();

  try {

    const user = await User.findByPk(userId, { transaction: t });
    const book = await Book.findByPk(bookId, { transaction: t });

    if (!user || !book) {
      throw new Error("User or Book not found");
    }

    if (!book.isBorrowed) {
      throw new Error("Book is not currently borrowed");
    }

    // Find borrowing record
    const borrowing = await Borrowing.findOne({
      where: { userId, bookId, returnDate: null },
      transaction: t,
    });

    if (!borrowing) {
      throw new Error("Borrowing record not found or already returned");
    }

    // Update borrowing record with return date
    await borrowing.update({ returnDate: new Date() }, { transaction: t });

    // Update book status to available
    await book.update({ isBorrowed: false }, { transaction: t });

    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

// export const getBookHistoryByBookIdRepo = async (bookId) => {
//   console.log("object");
//   return await Borrowing.findAll({
//     where: { bookId },
//     order: [["borrow_date", "DESC"]],
//     include: [
//       {
//         model: UserModel,
//         as:"borrowers",
//         attributes: [], 
//       },
//       {
//         model: Book,
//         as:"borrowedBooks",
//         attributes: [], 
//       },
//     ],
//     attributes: [
//       "id",
//       "borrow_date",
//       "return_date",
//       [sequelize.literal("CONCAT(user.first_name, ' ', user.last_name)"), "userName"]
//       [sequelize.col("book.title"), "bookTitle"],
//     ],
//     raw: true, // flatten the result
//   });
// };

export const getAllBorrowingsWithDetailsRepo = async ()=> {
  const borrowings = await sequelize.query(
    `
    SELECT 
      b.id AS borrowingId,
      u.first_name AS userName,
      bk.title AS bookName,
      b.borrowDate,
      b.returnDate
    FROM borrowings b
    JOIN users u ON b.userId = u.id
    JOIN books bk ON b.bookId = bk.id
    ORDER BY b.borrowDate DESC
    `,
    {
      model: Borrowing,   // Map base to Borrowing model
      mapToModel: false,  // keep raw format (otherwise mismatch with Borrowing schema)
      type: sequelize.QueryTypes.SELECT,
    }
  );

  return borrowings;
}

export const getActiveBorrowingsWithDetailsRepo = async () => {
  const borrowings = await sequelize.query(
    `
    SELECT 
      b.id AS borrowingId,
      CONCAT(u.first_name, ' ', u.last_name) AS userName,
      bk.title AS bookName,
      bk.isbn As bookIsbn,
      b.borrowDate,
      b.returnDate
    FROM borrowings b
    JOIN users u ON b.userId = u.id
    JOIN books bk ON b.bookId = bk.id
    WHERE b.returnDate IS NULL
    ORDER BY b.borrowDate DESC
    `,
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );

  return borrowings;
};
export const getUsersBorrowedBooksWithIsbnRepo = async () => {
  const results = await sequelize.query(
    `
    SELECT 
      u.id AS userId,
      CONCAT(u.first_name, ' ', u.last_name) AS userName,
      COUNT(b.id) AS borrowedBooksCount,
      GROUP_CONCAT(CONCAT(bk.title, ' (', bk.isbn, ')') SEPARATOR ', ') AS borrowedBooks
    FROM users u
    JOIN borrowings b ON b.userId = u.id
    JOIN books bk ON b.bookId = bk.id
    WHERE b.returnDate IS NULL
    GROUP BY u.id, u.first_name, u.last_name
    ORDER BY borrowedBooksCount DESC
    `,
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );

  // Optional: Convert borrowedBooks string to array
  results.forEach(user => {
    user.borrowedBooks = user.borrowedBooks ? user.borrowedBooks.split(', ') : [];
  });

  return results;
};
// Get all borrowings with user and book details for a specific user
export const getBorrowedBookWithDetailsRepo = async (bookId) => {
  const borrowings = await sequelize.query(
    `
    SELECT 
  b.id AS borrowingId,
  u.first_name AS userName,
  bk.title AS bookName,
  b.borrowDate,
  b.returnDate
FROM borrowings b
JOIN books bk ON b.bookId = bk.id
JOIN users u ON b.userId = u.id
WHERE bk.id = :bookId
ORDER BY 
  b.returnDate IS NOT NULL,  -- NULLs first
  b.borrowDate DESC;         -- then by borrowDate descending

    `,
    {
      replacements: { bookId },  // safely bind parameter
      model: Borrowing,
      mapToModel: false,
      type: sequelize.QueryTypes.SELECT,
    }
  );

  return borrowings;
};

export const getUserBorrowingsWithDetailsRepo = async (userId) => {
  const borrowings = await sequelize.query(
    `
    SELECT 
  b.id AS borrowingId,
  u.first_name AS userName,
  bk.title AS bookName,
  b.borrowDate,
  b.returnDate
FROM borrowings b
JOIN users u ON b.userId = u.id
JOIN books bk ON b.bookId = bk.id
WHERE u.id = :userId
ORDER BY 
  b.returnDate IS NOT NULL,  -- NULLs first
  b.borrowDate DESC;         -- then by borrowDate descending

    `,
    {
      replacements: { userId },  // safely bind parameter
      model: Borrowing,
      mapToModel: false,
      type: sequelize.QueryTypes.SELECT,
    }
  );

  return borrowings;
};

// Fetch books borrowed on a specific date
export const getBooksBorrowedOnDateRepo = async (date) => {
  return await Book.findAll({
    include: [
      {
        model: User,
        as: "borrowers",
        through: {
          model: Borrowing,
          where: {
            borrowDate: {
              [Op.gte]: new Date(date + " 00:00:00"),
              [Op.lte]: new Date(date + " 23:59:59"),
            },
          },
          attributes: [], // don’t include Borrowing fields unless needed
        },
        attributes: ["first_name", "last_name"], // borrower details if you want
        required: true, // ✅ ensures only books that match are returned
      },
    ],
  });
};





   