import type {NextApiRequest, NextApiResponse} from "next";
import cookie from "cookie";
import {API_URL} from "../../../../../config";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const {id} = req.query;
        const cookies = cookie.parse(req.headers.cookie ?? "");
        const access: any = cookies.access ?? '';

        if (access === false || access === '') {
            return res.status(401).json({
              error: "User unauthorized to make this request",
            });
          }
        
          try {
            const apiRes = await fetch(`${API_URL}/api/ffl/league/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${access}` 
                 }
            })
            const data = await apiRes.json()
            if (apiRes.status === 200) {
                return res.status(200).json({
                    league: data
                })
            } else {
                return res.status(apiRes.status).json({
                    error: "Something went wrong"
                })
            }
          } catch (error) {
            return res.status(500).json({
                error: "Something went wrong"
            })
          }
        
    } else {
        res.setHeader("Allow", ['GET']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        })
    }
}