import cookie from "cookie";
import type {NextApiRequest, NextApiResponse} from "next"
import {API_URL} from "../../../../../config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const cookies = cookie.parse(req.headers.cookie ?? "");
        const access: any = cookies.access ?? '';

        if (access === false) {
            return res.status(401).json({
              error: "User unauthorized to make this request",
            });
          }
        const {name, password} = req.body;
        const body = JSON.stringify({name, password});

        try {
            const apiRes = await fetch(`${API_URL}/api/ffl/league/`, {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${access}` 
                },
                body: body
            });
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
                error: "Something went Wrong?!?!?!?"
            })
        }
    } else if (req.method === "GET") {
        const cookies = cookie.parse(req.headers.cookie ?? "");
        const access: any = cookies.access ?? '';
        if (access === false) {
            return res.status(401).json({
              error: "User unauthorized to make this request",
            });
          }
        
        try {
            const apiRes = await fetch(`${API_URL}/api/ffl/league`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${access}` 
                    },
            });
            const data = await apiRes.json();

            if (apiRes.status === 200) {
                return res.status(200).json({
                    data: data
                })
            } else {
                return res.status(apiRes.status).json({
                    error: data.error
                })
            }

        } catch (error) {
            return res.status(500).json({
                error: "Something went Wrong?!?!?!?"
            })
        }

    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
}