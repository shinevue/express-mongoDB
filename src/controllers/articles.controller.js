// imports the article model
const Article = require("../models/articles.model");

// make a controller for get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    try {
      res.status(200).json({
        message: "Get all articles successfully.",
        articles: articles,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for get a article
exports.getAArticle = async (req, res) => {
  try {
    const { id: articleId } = req.params;
    const article = await Article.findOne({ _id: articleId });

    if (!article) {
      return res.status(404).json({ msg: `No task with id: ${articleId}` });
    } else {
      res.status(200).json({
        message: "Get a article successfully.",
        article: article,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for create a article
exports.createAArticle = async (req, res) => {
  console.log("post");
  const newArticle = new Article(req.body);
  await newArticle.save((err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(201).json({
        message: "Create a new article successfully.",
      });
    }
  });
};

// make a controller for create many articles
exports.createManyArticles = async (req, res) => {
  await Article.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(201).json({
        message: "Create many new articles successfully.",
      });
    }
  });
};

// make a controller for update a article
exports.updateAArticle = async (req, res) => {
  try {
    const { id: articleId } = req.params;
    const article = await Article.findByIdAndUpdate(articleId, req.body, { new: true, runValidators: true });

    if (!article) {
      return res.status(404).json({ msg: `No article with id: ${articleId}` });
    } else {
      res.status(200).json({
        msg: `article with id: ${articleId} updated successfully.`,
        article: article,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for delete a article
exports.deleteAArticle = async (req, res) => {
  try {
    const { id: articleId } = req.params;
    const article = await Article.findByIdAndDelete(articleId);

    if (!article) {
      return res.status(404).json({ msg: `No article with id: ${articleId}` });
    } else {
      res.status(200).json({
        message: `article with id: ${articleId} deleted successfully.`,
        article: article,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
