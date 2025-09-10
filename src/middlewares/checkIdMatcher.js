const checkIdMatcher = (req, res, next) => {
      try {
        if(req.user.id !== req.params.id && req.user.role !== 'admin'){
                    return res.status(400).json({
                        success:true,
                        message:`Forbidden you are not access this service`
                    })
                }
        next();
      } catch (error) {
        console.error("not match with the token:", error);
        return res.status(500).json({ message: "Internal server error during role authorization." });
      }
    };

  export default checkIdMatcher ;