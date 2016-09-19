'use strict';

const sanitizeUser = (user) => {
  delete user.createdAt;
  delete user.deleted;
  delete user.hashedPassword;
  delete user.updatedAt;

  return user;
};

module.exports = {
  sanitizeUser
};
