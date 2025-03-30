import express from 'express';

const router = express.Router();

router.get('/forgot-password', async (req, res) => {
  res.render('forgot-password');
});

export default router;
