const express = require("express");
const router = express.Router();

const pool = require("../database");

// go the the add form
router.get("/add", (req, res) => {
  res.render("links/add");
});

// add a new link
router.post("/add", async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
  };
  await pool.query("INSERT INTO links set ?", [newLink]);
  res.redirect("/links");
});

// get the list of the links
router.get("/", async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  res.render("links/list", { links });
});

// delete a link
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE ID = ?", [id]);
  res.redirect("/links");
});

// modify a link
router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const link = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  res.render("links/edit", { link: link[0] });
});

// modify a link saving the changes
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  const newLink = {
    title,
    description,
    url,
  };
  await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
  res.redirect("/links");
});

module.exports = router;
