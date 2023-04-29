import jwt from "jsonwebtoken";

export const getAuthToken = (user) => {
  const secretKey = process.env.secretKey;
  const accessToken = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      comfirmEmail : user.comfirmEmail , 
      email: user.email,
      profilImage : user.profilImage
    },
    secretKey,
    { expiresIn: 60 * 60 }
  );
  
  const refreshToken = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      comfirmEmail : user.comfirmEmail ,
      email: user.email,
    },
    secretKey
  );
  const verifyEmail = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      comfirmEmail : user.comfirmEmail ,
      email: user.email,
    },
    secretKey,
    { expiresIn: 60 * 2 }
  );

  return { accessToken  , refreshToken , verifyEmail }
};



