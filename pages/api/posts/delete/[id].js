import db from '../../../../libs/db'

export default async function handler(req, res) {
    if (req.method !== 'DELETE') 
        return res.status(405).json({message: 'method not delete'});
    
    const {id} = req.query;

    const data = await db('posts')
        .where({id})
        .del()

    res.status(200);
    res.json({message: 'post deleted successfully'})

}