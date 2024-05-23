const router = require("express").Router();
const {
  getAllArticles,
  getAArticle,
  createAArticle,
  createManyArticles,
  updateAArticle,
  deleteAArticle,
} = require("../controllers/articles.controller");

router.get("/articles-all", getAllArticles);
router.post("/article/new", createAArticle);
router.put("/article/:id", updateAArticle);
router.delete("/article/:id", deleteAArticle);
router.get("/article/:id", getAArticle);
router.post("/articles-many", createManyArticles);

module.exports = router;
