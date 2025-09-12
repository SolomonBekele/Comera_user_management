export const errorHandler = (err, req, res, next) => {
 
  return res.status(200).
    json({ statusCode:err.statusCode,name: err.name, message: err.message,timestamp:err.timestamp });
 
}