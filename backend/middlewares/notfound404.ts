export default function notFoundMiddleware(req: any, res: any, next: any) {
  res.status(404).json({ message: 'notfound' });
};
