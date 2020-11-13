/**
 * GET home page.
 */

exports.index = (_req, res) => {
  res.render('index', {
    title: 'Project Management Dev Dice'
  });
};
