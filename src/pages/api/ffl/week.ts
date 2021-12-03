import type {NextApiRequest, NextApiResponse} from "next";
import {API_URL} from "../../../../config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const apiRes = await fetch(`${API_URL}/api/ffl/week`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                   'Content-type': 'application/json'
                }
            })
            const data = await apiRes.json();
            if (apiRes.status === 200) {
                return res.status(200).json({
                    "week": data.week
                }) 
            } else {
                return res.status(500).json({
                    error: "sorry"
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: "oops"
            })
        }
    }
} 