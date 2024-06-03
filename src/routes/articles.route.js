const router = require("express").Router();
const {
  getAllArticles,
  getAArticle,
  createAArticle,
  createManyArticles,
  updateAArticle,
  deleteAArticle,
} = require("../controllers/articles.controller");
const passport = require("passport");

const middleware = passport.authenticate("jwt", { session: false });

router.get("/articles-all", middleware, getAllArticles);
router.post("/article/new", middleware, createAArticle);
router.put("/article/:id", middleware, updateAArticle);
router.delete("/article/:id", middleware, deleteAArticle);
router.get("/article/:id", middleware, getAArticle);
router.post("/articles-many", middleware, createManyArticles);

module.exports = router;
