// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200
  res.json({ 
    name: 'Cecep Gans',
    kelas: 'XII RPL 2',
    istri : 4,
    anak : 12,
    message : 'makanlan disaat kamu lapar' 
  })
}
