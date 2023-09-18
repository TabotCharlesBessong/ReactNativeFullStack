import { RequestHandler } from "express";
import PasswordResetToken from "#/models/passwordResetToken";

export const isValidPassResetToken: RequestHandler = async (req, res, next) => {
  const { token, userId } = req.body;

  const resetToken = await PasswordResetToken.findOne({ owner: userId });
  if (!resetToken)
    return res
      .status(403)
      .json({ error: "Unauthorized access, invalid token!" });

  const matched = await resetToken.compareToken(token);
  if (!matched)
    return res
      .status(403)
      .json({ error: "Unauthorized access, invalid token!" });

  next();
};
