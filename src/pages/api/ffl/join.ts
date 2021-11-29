import type {NextApiRequest, NextApiResponse} from "next";
import cookie from "cookie";
import {API_URL} from "../../../../config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const cookies = cookie.parse(req.headers.cookie ?? "");
        const access: any = cookies.access ?? '';

        if (access === false || access === '') {
            return res.status(401).json({
              error: "User unauthorized to make this request",
            });
          }
        
        const {name, password} = req.body;
        const body = JSON.stringify({name, password});

        try {
            const apiRes = await fetch(`${API_URL}/api/ffl/league/join`, {
                method: "POST",
                headers: {
                   'Accept': 'application/json',
                   'Content-type': 'application/json',
                   'Authorization': `Bearer ${access}` 
                },
                body: body
            })

            const data = await apiRes.json();

            if (apiRes.status === 200) {
                return res.status(200).json({
                    league: data.league
                })
            } else {
                return res.status(apiRes.status).json({
                    error: data.error
                })
            }

        } catch (error) {
            return res.status(500).json({
                error: `Something went wrong on the server`
            })
        }
        
    } else {
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        })
    }
}