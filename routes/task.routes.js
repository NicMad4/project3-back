const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Food = require('../models/Foods.model')


//  POST /api/tasks  -  Creates a new task
router.post('/profile', (req, res, next) => {
	const { email, password, name, favorites } = req.params;

		Food
		.then((newFavorite) => {
			return Food.findByIdAndUpdate(foodId, {
				$push: { favorite: newFavorite._id }
			});
		})
		.then((response) => res.json(response))
		.catch((err) => res.json(err));
});

// PUT  /api/tasks/:taskId  - Updates a specific task by id
router.put('/tasks/:taskId', (req, res, next) => {
	const { taskId } = req.params;
	const { inputTitle, inputDescription } = req.body;
	const title = inputTitle;
	const description = inputDescription;
	

	if (!mongoose.Types.ObjectId.isValid(taskId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Task.findByIdAndUpdate(
		taskId,
		{ title, description },
		{ new: true }
	)
		.then(() => {
			res.send(req.body);
		})
		.catch((err) => res.json(err));
});

//  DELETE /api/tasks/:taskId  - Deletes a specific task by id
router.delete('/tasks/:taskId', (req, res, next) => {
	const { taskId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(taskId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Task.findByIdAndRemove(taskId)
		.then(() => res.json({ message: `Task with ${taskId} is removed successfully.` }))
		.catch((error) => res.json(error));
});

module.exports = router;
