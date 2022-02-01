import type {NextApiRequest,NextApiResponse} from "next";
import {API_URL} from "../../../../config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const {body} = req;
            const apiRes = await fetch(`${API_URL}/api/password_reset/confirm/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            });
            const data = await apiRes.json();
           
            if (apiRes.status === 200) {
                return res.status(200).json({
                    success: 'Password changed sucessfully'
                })
            } else {
                return res.status(400).json({
                    error: 'Something went wrong'
                })
            }
        } catch (error) {
            return res.status(400).json({
                error: 'Something went wrong when setting password'
            })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        return res.status(400).json({
            error: `Method ${req.method} not allowed`
        })
    }

}