export const   USERS_QUERY = {
   SELECT_USERS:'select * from users',
   CREATE_USERS: 'INSERT INTO users(id,email,firstName, lastName, password) VALUES (?,?, ?, ?, ?);',
};

