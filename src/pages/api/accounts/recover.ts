import type {NextApiRequest, NextApiResponse} from "next";
import {API_URL} from "../../../../config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") { 
        try {
            const apiRes = await fetch(`${API_URL}/api/password_reset/`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: req.body
            });

            const data = await apiRes.json();

            if (apiRes.status === 200) {
                return res.status(200).json({
                    success: "Password recovery email sent"
                })
            } else {
                return res.status(apiRes.status).json({
                    error: "Password recovery failed"
                })
            }
        } catch (e) {
            return res.status(500).json({
                "error": "Something went wrong"
            })
        }
    }
}