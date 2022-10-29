const router = require('express').Router();
const { restart } = require('nodemon');
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({

      include: [{model: Product, Through: ProductTag, as: 'tag_product'}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, Through: ProductTag, as: 'tag_product'}]
    });

    if (!tagData) {
      res.status(404).json({message: 'No tag found with that id!' });
    return;
    }

    res.status(200).json(tagData);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  });

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
