import type {NextApiRequest, NextApiResponse} from "next"
import {API_URL} from "../../../../config"
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'POST') {
        const {username, email, password} = req.body;
        const body = JSON.stringify({username, email, password});
        try {
            const apiRes = await fetch(`${API_URL}/api/accounts/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            })
            const data = await apiRes.json();

            if (apiRes.status === 201) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', data.access, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 30 * 1000,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    ),
                    cookie.serialize(
                        'refresh', data.refresh, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 60 * 24,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    )
                ]);
                return res.status(201).json({
                    success: 'Logged in successfully'
                });
            } else {
                return res.status(apiRes.status).json({
                    error: 'Authentication failed'
                });
            }

        } catch(error) {
            return res.status(500).json({
                error: "Something went wrong with authentication"
            })
        } 
    }
}