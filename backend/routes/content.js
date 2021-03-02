import express from 'express';

const router = express.Router();

const makeid = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  return [...Array(length)].map((_) => characters.charAt(Math.floor(Math.random() * charactersLength))).join('');
}

router.get('/text', (req, res) => {
  setTimeout(() => res.json({ text: "Текст с сервера: " + makeid(20) }), 3000)
})

export default router;
