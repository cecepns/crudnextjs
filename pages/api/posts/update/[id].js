import db from '../../../../libs/db'

export default async function handler(req, res) {
    if (req.method !== 'PUT') 
        return res.status(405).json({message: 'method not put'});
    
    const {id} = req.query;
    const {title, content} = req.body;

    const data = await db('posts')
        .where({id})
        .update({title, content})

    res.status(200);
    res.json({message: 'post updated successfully'})

}