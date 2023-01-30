const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) =>{
  try{
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id,{
      include: [{model: Category, through: Product, as: 'this_product'}]
    });
    if(!categoryData){
      res.status(404).json({message: 'No product found within this category'});
      return;
    }

    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try{
    const categoryData = await Category.creat(req.body);
    res.status(200).json(categoryData);
  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  try{
    const categoryData = await Category.update(req.body, {
      where:{
        id:req.params.id,
      },
    });
    if(!categoryData){
      res.status(404).json({message: 'no category with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
