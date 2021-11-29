import type {NextApiRequest, NextApiResponse} from "next";
import cookie from "cookie";
import {API_URL} from "../../../../../config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') {
        const cookies = cookie.parse(req.headers.cookie || "");
        const access: any = cookies.access ?? '';

        if (access === false || access === '') {
            return res.status(401).json({
                error: "User unauthorized to make this request",
            })
        }
        
        const {id, qb, rb, wr, te, defense} = req.body;
        const body = JSON.stringify({qb, rb, wr, te, defense })

        try {
            const apiRes = await fetch(`${API_URL}/api/ffl/pick/${id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${access}` 
                 },
                 body: body
            })
            const data = await apiRes.json();
            return res.status(200).json({
                pick: data
            })
        } catch(error) {
            return res.status(500).json({
                error: "you mesed up?"
            })
        }
    }
}