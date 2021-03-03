export default (req: any, res: any, next: any) => {
  if (req.session.user) res.locals.username = req.session?.user?.name;
  next();
};
