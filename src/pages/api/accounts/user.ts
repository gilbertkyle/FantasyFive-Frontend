import cookie from "cookie";
import type {NextApiRequest, NextApiResponse} from "next";
import {API_URL} from "../../../../config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access: any = cookies.access ?? false;

    if (access === false) {
      return res.status(401).json({
        error: "User unauthorized to make this request",
      });
    }

    try {
      const apiRes = await fetch(`${API_URL}/api/accounts/user`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json({
          user: data.user,
        });
      } else {
        return res.status(apiRes.status).json({
          error: data.error,
        });
      }
    } catch (err) {
      
      return res.status(500).json({
        error: "Something went wrong when retrieving user",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
