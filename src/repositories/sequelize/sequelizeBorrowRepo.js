
import {User as UserBorrowedModel,Book as BookBorrowedModel} from "./db/models/borrowingModelSequelize.js";
import  UserModel  from "./db/models/userModelSequelize.js";
import  BookModel  from "./db/models/bookModelSequelize.js";

// ---- Add a borrowing record ----
export const addBorrowingRepo = async (userId, bookId) => {
  const user = await UserBorrowedModel.findByPk(userId);
  const book = await BookBorrowedModel.findByPk(bookId);

  if (!user || !book) {
    throw new Error("User or Book not found");
  }

  await user.addBorrowedBook(book, {
    through: { borrow_date: new Date() },
  });

  return true;
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