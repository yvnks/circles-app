import User from "../model/user.model.js";
import CustomErrorHandlerAPI from "../helpers/customErrorHandlerApi.js";

const userById = async (req, res, next, id) => {
  let user = await User.findById(id);

  if (!user) {
    return next(new CustomErrorHandlerAPI("User not found", 400));
  }
  req.profile = user;
  next();
};

export default userById;
