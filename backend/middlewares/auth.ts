export default (req: any, res: any, next: any) => {
  if (!req.session.user) {
    res.json({ session: false, message: 'not authorize' })
  } else next();
};
