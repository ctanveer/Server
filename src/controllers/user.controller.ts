import { Request, Response } from 'express';
import { createUser, findUserByEmail, isEmailExists } from '../models/user/query.js';
import { comparePassword, generateHash, generateToken, verifyToken } from '../utilities/auth.js';

// signup
const signupController = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await generateHash(req.body.password);

    const userObject = {
      ...req.body,
      password: hashedPassword
    };

    const user = await createUser(userObject);
    res.status(201).json({
      messeag: "added"
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
  });
  }
};


//login
const loginController = async (req: Request, res: Response) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (user) {
      const isMatch = await comparePassword(req.body.password, user.password);
      if (isMatch) {
        // generate token
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
        };
        const token = generateToken(payload);
        res.status(200).json({
          access_token: token,
          message: "Login Successful"
        })
      }
      else{
        res.status(401).json({
          error: "Authentication failed"
        })
      }
    }
    else{
      res.status(401).json({
        error: "Authentication failed"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
  });
  }
};


// check email
const checkEmailController = async (req: Request, res: Response) => {
  try {
      const { email } = req.body;
      
      const emailExists = await isEmailExists(email.email);

      res.status(200).json({
          exists: emailExists
      });
  } catch (error) {
      res.status(500).json({
          message: "Internal Server Error"
      });
  }
};

export { signupController, loginController, checkEmailController };