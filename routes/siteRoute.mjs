import express from 'express';
import Site from "../models/siteSchema.mjs";



const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newSite = new Site(req.body);
    const savedSite = await newSite.save();
    res.status(201).json(savedSite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//    GET route to search by zipcode

router.get('/', async (req, res) => {
  try {
    const { zip, page = 1, limit = 10 } = req.query;

    if (zip && !/^\d{5}$/.test(zip)) {
      return res.status(400).json({ error: 'Invalid ZIP code format' });
    }

    const query = zip ? { zip } : {};

    const sites = await Site.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Site.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      sites,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error while retrieving sites.' });
  }
});


// Gets site info by id

router.get('/:id', async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ error: 'Site not found' });
    res.json(site);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});


  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const updatedSite = await Site.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedSite) {
        return res.status(404).json({ error: 'Site not found' });
      }
  
      res.json(updatedSite);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const deletedSite = await Site.findByIdAndDelete(req.params.id);
      if (!deletedSite) {
        return res.status(404).json({ error: 'Site not found' });
      }
      res.json({ message: 'Site deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: 'Invalid ID format' });
    }
  });


  export default router

