const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id }) // este folosit asa pentru ca id are acelasi nume si in baza de date si in request.body, altfel ar fi aratat { id: id}
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
