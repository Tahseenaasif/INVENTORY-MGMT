export const setLastVisit = (req, res, next) => {
   // 1. If a cookie is set, then add a local variable with visit time data.
   if (req.cookies.lastVisit) {
     res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
   }
 
   // Calculate the maximum age in milliseconds (2 days)
   const maxAgeMilliseconds = 2 * 24 * 60 * 60 * 1000;
 
   // Set the lastVisit cookie with the correct maxAge value
   res.cookie('lastVisit', new Date().toISOString(), { maxAge: maxAgeMilliseconds });
 
   next();
 };
 