import db from '../../../libs/db'

async function handler(req, res) {
    if (req.method !== 'POST') 
        return res.status(405).json({message: 'method not post'});
    
    const {title, content} = req.body;

    const create = await db('posts').insert({title, content});


    res.status(200);
    res.json({message: 'Post create successfully'})

}

export default handler