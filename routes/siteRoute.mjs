import express from 'express';
import Site from "../models/siteSchema.mjs";



const router = express.Router();

router.post('/', async (req, res) => {
    try {
      const newProject = new Project(req.body);
      const savedProject = await newProject.save();
      res.status(201).json(savedProject);
    } catch (err) {
      res.status(400).json({ error: 'Failed to create project', details: err });
    }
  });


//    GET route to search by zipcode



router.get('/', async (req, res) => {
  try {
    const { zip } = req.query;
    const query = zip ? { zip } : {};
    const projects = await Project.find(query);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error while retrieving projects.' });
  }
});

// Gets site info by id

router.get('/:id', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ error: 'Project not found' });
      res.json(project);
    } catch (err) {
      res.status(400).json({ error: 'Invalid ID format' });
    }
  });


  export default router

