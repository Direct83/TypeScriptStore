export default (err: any, req: any, res: any) => {
  console.error(err);
  res.status(500).json({ message: 'server error status 500' });
};
