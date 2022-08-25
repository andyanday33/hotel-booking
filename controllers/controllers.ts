import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  message: string;
};

const allRooms = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({
    success: true,
    message: "All Rooms",
  });
};

export { allRooms };
