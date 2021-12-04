import type {NextApiRequest, NextApiResponse} from "next";
import {API_URL} from "../../../../config";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch(`${API_URL}/api/ffl/player`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        const data = await response.json();
        return res.status(200).json({
            "players": data
        })
    } catch {
        return res.status(500).json({})
    }
}