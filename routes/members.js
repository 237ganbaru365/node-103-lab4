const router = require("express").Router();
const uuid = require("uuid");

const members = [
  { id: uuid.v4(), name: "Fumina", email: "fumina@mail.com" },
  { id: uuid.v4(), name: "Ayaka", email: "ayaka@mail.com" },
  { id: uuid.v4(), name: "Sho", email: "sho@mail.com" },
];

router.get("/", (req, res) => {
  res.render("home", { members: members, pageTitle: "Home Page" });
});

router.get("/:id", (req, res) => {
  const paramsId = req.params.id;

  const found = members.some((member) => member.id === paramsId);
  const member = members.filter((member) => member.id === paramsId)[0];

  if (found) {
    res.render("member", { member: member, pageTitle: "Member's page" });
  } else {
    res.status(400).json({ msg: `Member with id: ${paramsId} is not found` });
  }
});

router.post("/", (req, res) => {
  const newData = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };

  members.push(newData);
  res.render("home", { members: members, pageTitle: "Home" });
});

router.post("/update/:id", (req, res) => {
  const paramsId = req.params.id;
  const found = members.some((member) => member.id === paramsId);

  if (found) {
    const { name, email } = req.body;

    //mutate
    members.forEach((member) => {
      if (member.id === paramsId) {
        name && (member.name = name);
        email && (member.email = email);
      }
    });
    res.redirect("/");
  } else {
    res.status(400).json({ msg: `Member wirh id: ${paramsId} is not found` });
  }
});

router.post("/delete/:id", (req, res) => {
  const paramsId = req.params.id;
  const found = members.some((member) => member.id === paramsId);

  if (found) {
    members.splice(
      members.findIndex((member) => member.id === paramsId),
      1
    );
    res.redirect("/");
  } else {
    res.status(400).json({ msg: `Member wirh id: ${paramsId} is not found` });
  }
});

module.exports = router;
