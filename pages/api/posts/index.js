import db from '../../../libs/db'

async function handler(req,res) {
    if (req.method !== 'GET') 
    return res.status(405).json({message: 'method not get'});

    const data = await db('posts');

    res.status(200);
    res.json({
        message : 'success',
        data 
    })


}

export default handler